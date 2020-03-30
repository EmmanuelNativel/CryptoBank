/**
 * Implémentation du DES complet
 */
import { BIT_ROTATION, Sboxes, IP, FP, E, P, PC1, PC2 } from "./DESconst";
import {
  getExtendedAsciiCharOf,
  splitExtASCIIstring,
  getExtendedAsciiCodeOf,
  hexaToDecimal
} from "./utils";

const FINAL_S_BOXES = getFinalSBoxes(Sboxes); //tableau contenant les 8 S en valeur binaire

/**
 * Transforme la clé donnée sous forme hexadécimale en clé binaire de 64 bits.
 * Prérequis : la taille du paramètre doit être égale à 16 et contenir que des caractères de la base 16.
 * Entrée : La clé en hexadécimale sous forme de chaine de caractères
 * Sortie : La clé binaire de 64 bits sous forme de chaine de caractères
 */
function getKeyFromHexa(hexaKey) {
  return hexaKey
    .split("")
    .map(c => {
      // c correspond au caractère hexadécimal courant
      return toBinaryOnNbits(parseInt(c, 16), 4); // On converti le caractère en binaire sur 4 bits
    })
    .join("");
}

/**
 * Transforme les fonctions S en binaire
 * Entrée : Une matrice S en décimal
 * Sortie : Les éléments de S converti en binaire sur 4 bits
 */
function getFinalS(initalS) {
  let newS = [];

  initalS.forEach(tab => {
    newS.push(tab.map(e => toBinaryOnNbits(e, 4))); // e est une valeur de S. On convertit e en binaire sur 4 bits
  });

  return newS;
}

/**
 * Retourne l'ensemble des fonctions S en binaire dans un seul tableau.
 * Entrée : Un tableau contenant toutes les matrices S qui sont elles même des tableaux.
 * Sortie : Le même tableau, dont les valeurs ont été converties en binaire.
 */
function getFinalSBoxes(SBoxes) {
  let res = SBoxes.map(s => getFinalS(s)); // On convertit les valeurs de chaque matrice S en binaire
  return res;
}

/**
 * Fontion permettant de convertir x en binaire sur n bits
 * Entrées : x un entier, n le nombre de bits qu'on veut en sortie
 * Sortie : Une chaine de caractère représentant x en binaire sur n bits
 */
function toBinaryOnNbits(x, n) {
  let b = x.toString(2);
  while (b.length < n) {
    // Si on a pas atteint le nombre de bits voulu,
    b = "0" + b; // On ajoute des zéro à droite
  }
  return b;
}

/**
 * Fonction permettant de générer les 16 sous clés à partir de la clé de 64 bits.
 * Entrée : La clé de 64 bits sous forme de chaine de caractères
 * Sortie : Un tableau contenant les 16 sous-clés.
 */

function getKeys(key) {
  //Les 64 bits d'entrée passent dans PC1 qui va supprimer les bits de controles --> 56 bits en sortie
  const pc1Result = permutation(PC1, key); // Retourne les 56 bits utils de la clé

  //Ces 56 vont être découpés en 2 parties de 28bits
  const pc1Split = splitToNbits(pc1Result, 28); // Retourne deux groupes de 28 bits dans un tableau

  let keyToDerive = pc1Split; // La clé à traiter
  let finalKeys = []; // Stockage des sous-clé générées

  for (let i = 0; i < 16; i++) {
    // On a 2 groupes de 28 bits qui vont tous les 2 subir un décalage à gauche, Pour savoir de combien de bit on décale, il faut regarder le tableau 'BitRotation'
    const decalageKey = keyToDerive.map(d =>
      decalageRotationGauche(d, BIT_ROTATION[i])
    );
    const concatKey = decalageKey.join(""); // On concataine les 2 blocs de 28 --> 56 bits
    // Ces 56 bits vont entrer dans PC2 et on obtient la première sous-clef (48bits)
    const pc2Result = permutation(PC2, concatKey); // La clé est le résultat de PC2 (48bits)
    finalKeys.push(pc2Result); // On stock la clé résultante dans le tableau finalKeys
    keyToDerive = decalageKey; // On change la clé de la prochaine boucle par le résultat du décalage de la boucle courante
  }
  return finalKeys;
}

/**
 * Fonction permettant de faire un décalage de n bits à gauche en réinsérant les bit perdus à droite.
 * Entrée : Un mot binaire sous forme de chaine de caractères
 *        : n -> le nombre de décallage à gauche
 * Sortie : Le mot binaire décallé de n bits à gauche avec remise des bits perdus à droite
 */
function decalageRotationGauche(number, n) {
  const p1 = number.substring(0, n); // On récupère les n premiers bits
  const p2 = number.replace(p1, ""); // On récupère le reste du mot binaire
  return p2 + p1; // On inverse les 2 parties
}

/**
 * Fonction qui vérifie si la clé est correcte en utilisant les bits de controle
 * Entrée : la clé binaire sous forme de chaine de caractères
 * Sortie : Un booléeen -> Vrai si la clé est valide, Faux sinon.
 */
function isKeyCorrect(key) {
  if (key.length === 64) {
    const bytes = splitToNbits(key, 8); // On récupère tous les octets de la clé

    return bytes.every(currentByte => {
      // every() va tester si tous les éléments du tableau bytes valide la condition donnée
      const nbOf1 = currentByte.split("1").length - 1; // On compte le nombre de 1
      return nbOf1 % 2 !== 0; // Si le nombre de 1 est impaire l'octet est valide
    });
  } else return false;
}

/**
 * Convertit le texte en binaire (chaque caractère est codé sur 1 octet)
 * Entrée : Une chaine de caractères
 * Sortie : Le texte converti en binaire
 */
function text2Binary(string) {
  const splitedString = splitExtASCIIstring(string); // Split le text en prenant en compte les caractère hexa
  const toDecimal = splitedString.map(c => {
    // Pour chaque éléments du message split
    if (c.length > 1) return hexaToDecimal(c);
    // Si y a plus d'un caractère, alors c'est de l'hexa -> On converti en décimal
    else return getExtendedAsciiCodeOf(c); // sinon on retourne le code du caractère en ASCII étendu
  });
  const binaryArray = toDecimal.map(code => toBinaryOnNbits(code, 8)); // On convertit chaque élément en binaire sous 8 bits
  return binaryArray.join(""); // On concatène le tout
}

/**
 * Sépare la chaine de caractères en blocs de taille n. Le dernier bloc peut avoir une taille différente
 * Entrée : Une chaine de caractères
 *        : Un entier n représentant la taille d'un bloc
 * Sortie : Un tableau de chaine de charactères contenant les différents blocs.
 */
function splitToNbits(string, n) {
  let result = [];

  // On sépare le msg en blocs de taille n
  while (string.length >= n) {
    const subString = string.substr(0, n); // On récupère les n premiers caractères -> un bloc
    result.push(subString); // On ajoute ce bloc au résultat
    string = string.replace(subString, ""); // On supprime le bloc de la string initiale
  }

  // On ajoute le dernier bloc si il y en a
  if (string !== "") result.push(string);
  return result;
}

/**
 * Effectue la permutation de la chaine de caractères en fonction de la matrice donnée
 * Entrée : La matrice sous forme de tableau d'entiers
 *        : Une chaine de caractères représentant une suite binaire
 * Sortie : Une chaine de caractères représentant la string permutée.
 */
function permutation(matrice, string) {
  const stringArray = string.split(""); // On transforme la string en tableau de caractères
  const result = matrice.map(i => stringArray[i - 1]); // On effectue la permutation et on stock le résultat dans result
  return result.join(""); // On transforme le tableau de caractères en chaine de caractères.
}

/**
 * Préparation du texte ->  Convertion en binaire + Découpage en groupe de 64 bits.
 * Entrée : Le texte sous forme de chaine de caractères
 * Sortie : Le texte en binaire et découpé en blocs de 64 bits.
 */
function prepareText(text) {
  const binaryText = text2Binary(text); // Convertion du texte en binaire
  const split64 = splitToNbits(binaryText, 64); // Séparation en blocs de 64 bits

  // Traitement du dernier bloc (on l'enlève du tableau et on le récupère dans une variable)
  let lastBloc = split64.pop();

  while (lastBloc.length !== 64) {
    lastBloc += "0"; // On ajoute des 0 pour qu'il fasse aussi 64bits
  }
  split64.push(lastBloc); // On le rajoute à la fin du tableau

  return split64;
}

/**
 * XOR entre a et b si a et b ssi de taille identique.
 * Entrée : Deux String a et b de même taille représentant des suite binaires
 * Sortie: le résultat de a XOR b sous forme de string
 */
function XOR(a, b) {
  if (a.length !== b.length) return;
  let xor = "";
  for (let i = 0; i < a.length; i++) {
    xor += parseInt(a[i]) ^ parseInt(b[i]); // Opérateur ^ = XOR
  }

  return xor;
}

/**
 * Execute la fonction S sur le bloc de 6 bits donné
 * Permet de récupérer la bonne valeur dans les substitution S
 * Entrée : Un bloc sous forme de chaine de caractères, la matrice s associée
 * Sortie : Une chaine de caractères de 4 bits représentant le résultat de la fonction s donnée
 */
function executeS(bloc, s) {
  const firstBit = bloc[0]; // Premier bit
  const lastBit = bloc[5]; // Second bit
  const middleBits = bloc.substring(1, 5); // Les 4 bits du milieu

  let indiceL, indiceC;

  if (firstBit === "0" && lastBit === "0") indiceL = 0;
  else if (firstBit === "0" && lastBit === "1") indiceL = 1;
  else if (firstBit === "1" && lastBit === "0") indiceL = 2;
  else if (firstBit === "1" && lastBit === "1") indiceL = 3;

  switch (middleBits) {
    case "0000":
      indiceC = 0;
      break;
    case "0001":
      indiceC = 1;
      break;
    case "0010":
      indiceC = 2;
      break;
    case "0011":
      indiceC = 3;
      break;
    case "0100":
      indiceC = 4;
      break;
    case "0101":
      indiceC = 5;
      break;
    case "0110":
      indiceC = 6;
      break;
    case "0111":
      indiceC = 7;
      break;
    case "1000":
      indiceC = 8;
      break;
    case "1001":
      indiceC = 9;
      break;
    case "1010":
      indiceC = 10;
      break;
    case "1011":
      indiceC = 11;
      break;
    case "1100":
      indiceC = 12;
      break;
    case "1101":
      indiceC = 13;
      break;
    case "1110":
      indiceC = 14;
      break;
    case "1111":
      indiceC = 15;
      break;
    default:
      console.log("Erreur switch fonctions S");
  }
  return s[indiceL][indiceC];
}

/**
 * La fonction F du DES
 * Entrée : Le semi-bloc de 32 bits et la sous-clef de 48 bits sous forme de chaine de caractères
 * Sortie : Une chaine de caractères de 32 bits représentant le résultat de la fonction F du DES
 */
function F(halfBloc, subkey) {
  // 1- half bloc passe dans la fonction d'extension pour devenir 48 bits
  const Eresult = permutation(E, halfBloc);
  console.log(`E(R) = ${Eresult}`);

  // 2- On fait un XOR entre le résultat de E et la sous-clé
  const XORresult = XOR(Eresult, subkey);
  console.log(` A = E(R) + K = ${XORresult}`);

  // 3- Le résultat du XOR est découpé en 8 blocs de 6 bits
  const splitedXorResult = splitToNbits(XORresult, 6);

  // 4- Chaque bloc passe dans la subsitution qui lui est assignée.
  const Sresults = splitedXorResult.map((bloc, i) => {
    // bloc -> bloc courant, i -> indice courant
    const res = executeS(bloc, FINAL_S_BOXES[i]); // On exécute la fonction S du DES
    console.log(` S${i + 1} = ${res}`);
    return res;
  }); // On a 8 blocs de 4 bits

  // 5- On concatène le tout pour avoir un bloc de 32 bits
  const Sresult32bits = Sresults.join("");
  console.log(`B = ${Sresult32bits}`);

  // 6- Ce résultat passe dans la permutation P (32 bits en sortie)
  const resultatFinal = permutation(P, Sresult32bits);
  console.log(`P(B) = ${resultatFinal}`);

  return resultatFinal;
}

/**
 * Convertion d'un texte binaire en Unicode (A REVOIR !!!)
 * Entrée : Le texte binaire sous forme de chaine de caractères
 * Sortie : Le texte encodé en ASCII étendu. Les caractères hecadécimaux sont écrits sous la forme \xFF
 */
function readBinaryText(txt) {
  const split = splitToNbits(txt, 8); // On récupère les octets
  return split
    .map(b => {
      // b -> l'octet courant
      const decimalCode = parseInt(b, 2); // On convertit en décimal
      return getExtendedAsciiCharOf(decimalCode); // On retourne sa valeur en ASCII étendue
    })
    .join("");
}

/**
 * Fonction permettant de crypter/décrypter un message avec l'algorithme du DES
 * Entrée : Le message sous forme de chaine de caractères. Peut contenir des caractères hexadécimaux
 *        : Un tableau contenant les 16 sous clés
 * Sortie : Le message crypté en binaire sous forme de chaine de caractères.
 */
function DES(messageDES, KEYS) {
  // 1- Préparation du texte
  const textSplitted = prepareText(messageDES); // Text découpé en blocs de 64 bits

  let finalBlocs = []; // Stockage des différents blocs cryptés

  // On boucle sur les blocs
  for (let i = 0; i < textSplitted.length; i++) {
    const bloc = textSplitted[i]; // le bloc courrant

    // 2- Permutation initiale
    const IPresult = permutation(IP, bloc);

    // 3- On découpe en 2 sous-blocs de 32 bits
    const sepration = splitToNbits(IPresult, 32);
    let left = sepration[0];
    let right = sepration[1];

    console.log(`L0 = ${left}`);
    console.log(`R0= ${right}`);

    for (let boucle = 0; boucle < 16; boucle++) {
      console.log("", "====================================");
      console.log("", `Iteration ${boucle + 1}`);
      console.log(`K = ${KEYS[boucle]}`);
      // 4- La partie droite passe dans la fonction F
      const Fresult = F(right, KEYS[boucle]);

      // 5- On fait un XOR avec la sortie de la fonction F et la partie gauche (sortie 32 bits)
      const XORres = XOR(left, Fresult);

      // 6- La nouvelle partie gauche devient l'ancienne partie droite
      left = right;

      // 7- La nouvelle partie droite devient le résultat du XOR
      right = XORres;
      console.log(`L${boucle + 1} = ${left}`);
      console.log(`R${boucle + 1} = ${right}`);
    }

    // 8- On execute la permutation finale sur la concaténation des deux parties sans inverser les parties droite et gauche
    const blocFinal = permutation(FP, right + left); // On obtient le cryptage de ce bloc

    // 9- On stock ce bloc crypté dans le tableau finalBlocs
    finalBlocs.push(blocFinal);
  }

  // 10- On concatène tous les blocs cryptés pour obtenir le message final.
  const finalMessage = finalBlocs.join("");
  console.log("RESULT : ", finalMessage);
  console.log("RESULT HEXA : ", readBinaryText(finalMessage));
  return finalMessage;
}

export { isKeyCorrect, getKeyFromHexa, DES, getKeys, readBinaryText };

//const messageToCryptHex = "23456789abcdef01";
//const messageToCrypt = getKeyFromHexa(messageToCryptHex);

// const KEY = "0101010001010100010101000101010001010100010101000101010001010100";
// const KEY_HEX = "0123456789abcdef"; // clé du TP au format hexadécimal

// const messageToCrypt = "²Sécurité {Informatique} !";
// const k = getKeyFromHexa(KEY_HEX);
// const isValid = isKeyCorrect(k);

// if (isValid) {
//   const keysArray = getKeys(k);
//   const cryptedMessage = DES(messageToCrypt, keysArray);

//   const decryptKeysArray = keysArray.reverse();
//   const decryptedMessage = DES(
//     readBinaryText(cryptedMessage),
//     decryptKeysArray
//   );

//   console.log(" ");
//   console.log(" ");

//   console.log("res DES crypté : ", cryptedMessage);
//   console.log(readBinaryText(cryptedMessage));

//   console.log(" ");
//   console.log(" ");

//   console.log("res DES décrypté : ", decryptedMessage);
//   console.log(readBinaryText(decryptedMessage));
// }
