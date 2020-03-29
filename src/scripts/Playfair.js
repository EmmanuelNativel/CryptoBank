/**
 * PREREQUIS : Les caractères de la clé doivent être inclus dans l'alphabet.
 */

import { getAlphabet, getNumbers, listToMatrix, transposeMatrix } from "./utils";

const lettres = getAlphabet(); // liste des lettres de l'alphabet
const chiffres = getNumbers(); // liste des chiffres de 1 à 9
const ALPHABET = lettres.concat(chiffres); // Tableau contenant les lettres et les chiffres


/**
 * Fonction permettant d'obtenir la matrice du chiffre de Playfair
 * Entrée : La clé sous forme de chaine de caractères
 *        : L'alphabet considéré pour le chiffrement sous forme de tableau de caractères
 * Sortie : Un tableau à 2 dimensions représentant la matrice du chiffre de Playfair contruite à partir de la clé.
 */
function getPlayfairMatrix(key, alphabet) {
  const size = 6;
  // cette expression va transformer la clé en tableau de caractères avec la méthode split().
  // Les doublons seront ensuite retirés en créant un objet Set().
  // L'objet Set() sera ensuite converti en tableau grace au spread operator "[... ]".
  const keyTab = [...new Set(key.split(""))]; // La clée sans doublons sous forme de tableau de caractères
  const alphabetTab = alphabet.filter(e => !keyTab.includes(e)); // On enlève les caractères de la clé dans l'alphabet
  const fullTab = keyTab.concat(alphabetTab); // On concatène les deux tableaux vus plus haut (keyTab et alphabetTab)
  const matrix = listToMatrix(fullTab, size); // On transforme ce tableau en matrice de taille 6x6
  return transposeMatrix(matrix); // On retourne la transposée de cette matrice.
}

/**
 * Fonction permettant d'obtenir, pour chaque caractères, ses coordonnées dans la matrice de playfair.
 * Entrée : Un tableau à 2 dimensions représentant la matrice du chiffre de Playfair.
 * Sortie : Un dictionnaire (MAP en js), où la clé est le caractère et la valeur un tableau [N°ligne, N°colonne]
 */
function getCoords(matrix) {
  let result = new Map(); // Le dictionnaire qui va stocker le carré de polybe

  // Parcours de la matrice
  for(let l=0; l<matrix.length; l++){
    for(let c=0; c<matrix[l].length; c++){
      result.set(matrix[l][c], [l,c]); // On rempli le dictionnaire
    }
  }

  return result;
}

/**
 * Fonction permettant de préparer le message en faisant les traitements : 
 *  - Transformation du message en minuscules
 *  - Supression des caractères qui ne font pas partie de l'alphabet considéré pour le chiffrement
 *  - Insertion de la lettre "q" entre un couple de lettres lorsque ce couple contient 2 lettres identiques.
 *  - Si la taille finale du message n'est pas paire, on insère une lettre rare à la fin de celui-ci.
 * Entrée : Le message sous forme de chaine de caractères
 *        : L'alphabet considéré pour le chiffrement sous forme de tableau de caractères
 * Sortie : Le message traité sous forme de tableau de caractères
 */
function prepareMesageBeforeEncryption(message, alphabet) {
  let messageSplit = message.toLowerCase().split(""); // Transformation du message en minuscules

  // On garde uniquement les caractères qui font partie de l'alphabet considéré pour le chiffrement.
  messageSplit = messageSplit.filter(c => alphabet.includes(c));

  // Insertion de la lettre "q" entre un couple de lettres lorsque ce couple contient 2 lettres identiques.
  for (let i = 0; i < messageSplit.length; i += 2) {
    const a = messageSplit[i];
    const b = messageSplit[i + 1];
    if (a === b) {
      messageSplit.splice(i + 1, 0, "q"); // = Dans le tableau, on va insérer "q" à la position i+1 en supprimant 0 éléments.
    }
  }

  // On ajoute une lettre rare si la taille du tableau est impaire. De sorte à avoir des couples complets.
  if (messageSplit.length % 2 !== 0) messageSplit.push("q");

  return messageSplit;
}

/**
 * Fonction permettant de garder les caractèresne faisant pas partie  dans le message final
 * Entrée : Le message original (crypté ou non en fonction de si on est entrain de crypter ou de décrypter) -> String
 *        : Le message crypté/décrypté sans les caractères ne faisant pas partie de l'alphabet (processedMsg) -> Array
 *        : L'alphabet considéré pour le chiffrement sous forme de tableau de caractères
 * Sortie : Le message crypté/décrypté dans lequel les caractères ne faisant pas partie de l'alphabet considéré
 *        : ont été ajoutés au bon endroit. (une chaine de caractères)
 */
function insertSpecialCharacters(message, processedMsg, alphabet){
  let counter = 0; // L'indice de parcourt dans le processedMsg

  // On va rendre le message crypté/décrypté en y insérant les caractères non-cryptés du message original
  let result =  message.toLowerCase().split("").map( c => {
    if(alphabet.includes(c)) return processedMsg[counter++];
    else return c;
  });

  // Si il reste encore des lettres dans le processedMsg qui n'ont pas été insérées 
  // (car insertion d'une lettre rare en cas de doublons)
  // Alors on ajoute ces lettres à la fin du message
  while (counter < processedMsg.length) {
    result.push(processedMsg[counter++]);
  }

  return result.join("");
}

/**
 * Fonction permettant de crypter un message avec l'algorithme de Playfair
 * Entrée : Le message à crypté sous forme de chaine de caractères
 *        : La clé sous forme de chaine de caractères
 *        : L'alphabet considéré pour le chiffrement sous forme de tableau de caractères
 * Sortie : Le message crypté sous forme de chaine de caractères.
 */
function encrypt(message, key, alphabet=ALPHABET) {
  const preparedMessage = prepareMesageBeforeEncryption(message, alphabet); // Le message préparé -> Array
  const matrix = getPlayfairMatrix(key, alphabet); // La matrice de Playfair construite à partir de la clé -> Array 2 dimensions
  const coords = getCoords(matrix); // Les coordonnées de chaque caractères dans la matrice -> Dictionnaire

  let result = []; // Stockage du résultat

  // Parcours du message par paire de caractères
  for (let i = 0; i < preparedMessage.length; i += 2) {
    const a = preparedMessage[i]; // Premier caractère
    const b = preparedMessage[i + 1]; // Second caractère

    const aPos = coords.get(a); // Positions du premier caractère
    const bPos = coords.get(b); // Positions du second caractère

    const aLigne = aPos[0]; // N° de ligne du premier caractère
    const aColonne = aPos[1]; // N° de colonne du premier caractère

    const bLigne = bPos[0]; // N° de ligne du second caractère
    const bColonne = bPos[1]; // N° de colonne du second caractère

    // Si les deux lettres sont sur la même ligne
    // on remplace chaque caractère par le caractère à sa droite dans la matrice
    if(aLigne === bLigne) {
      const line = matrix[aLigne];
      const aNew = line[(aColonne+1)%line.length];
      const bNew = line[(bColonne+1)%line.length];
      result.push(aNew);
      result.push(bNew);
    } 
    // Si les deux lettres sont sur la même colonne
    // on remplace chaque caractère par le caractère en dessous dans la matrice
    else if(aColonne === bColonne){
      const newALigne = (aLigne+1) % matrix[aLigne].length;
      const newBLigne = (bLigne+1) % matrix[bLigne].length;
      const aNew = matrix[newALigne][aColonne];
      const bNew = matrix[newBLigne][bColonne];
      result.push(aNew);
      result.push(bNew);
    }
    // Si les deux lettres sont sur des lignes et des colonnes différentes
    // chaque lettre est remplacée par la lettre située sur la même ligne qu'elle, mais sur la colonne de l'autre caractère.
    else {
      const aNew = matrix[aLigne][bColonne];
      const bNew = matrix[bLigne][aColonne];
      result.push(aNew);
      result.push(bNew);
    }

  }

  // On insère les caractères tel que les espaces, ponctuation... à la bonne position dans le message crypté.
  return insertSpecialCharacters(message, result, alphabet);
}


/**
 * Fonction permettant de crypter un message avec l'algorithme de Playfair
 * Entrée : Le message crypté sous forme de chaine de caractères
 *        : La clé sous forme de chaine de caractères
 *        : L'alphabet considéré pour le chiffrement sous forme de tableau de caractères
 * Sortie : Le message décrypté sous forme de chaine de caractères.
 */
function decrypt(message, key, alphabet=ALPHABET) {
  const preparedMessage = message.split("").filter(c => alphabet.includes(c)); // Le message préparé -> Array
  const matrix = getPlayfairMatrix(key, alphabet); // La matrice de Playfair construite à partir de la clé -> Array 2 dimensions
  const coords = getCoords(matrix); // Les coordonnées de chaque caractères dans la matrice -> Dictionnaire

  let res = []; // Stockage du résultat

  // Parcours du message par paire de caractères
  for (let i = 0; i < preparedMessage.length; i += 2) {
    const a = preparedMessage[i]; // Premier caractère
    const b = preparedMessage[i + 1]; // Second caractère

    const aPos = coords.get(a); // Positions du premier caractère
    const bPos = coords.get(b); // Positions du second caractère

    const aLigne = aPos[0]; // N° de ligne du premier caractère
    const aColonne = aPos[1]; // N° de colonne du premier caractère

    const bLigne = bPos[0]; // N° de ligne du second caractère
    const bColonne = bPos[1]; // N° de colonne du second caractère

    // Si les deux lettres sont sur la même ligne
    // on remplace chaque caractère par le caractère à sa gauche dans la matrice
    if(aLigne === bLigne) {
      const line = matrix[aLigne];
      const aNew = line[(aColonne-1)%line.length];
      const bNew = line[(bColonne-1)%line.length];
      res.push(aNew);
      res.push(bNew);
    } 
    // Si les deux lettres sont sur la même colonne
    // on remplace chaque caractère par le caractère au dessus dans la matrice
    else if(aColonne === bColonne){
      const newALigne = (aLigne-1) < 0 ? (aLigne-1) + matrix[aLigne].length : (aLigne-1);
      const newBLigne = (bLigne-1) < 0 ? (bLigne-1) + matrix[bLigne].length : (bLigne-1);

      const aNew = matrix[newALigne][aColonne];
      const bNew = matrix[newBLigne][bColonne];
      res.push(aNew);
      res.push(bNew);
    }
    // Si les deux lettres sont sur des lignes et des colonnes différentes
    // chaque lettre est remplacée par la lettre située sur la même ligne qu'elle, mais sur la colonne de l'autre caractère.
    else {
      const aNew = matrix[aLigne][bColonne];
      const bNew = matrix[bLigne][aColonne];
      res.push(aNew);
      res.push(bNew);
    }

  }

  // On enlève la lettre "q" dans le message, car c'est la lettre rare insérée
  const res1 =  res.filter(c => c!== "q").join("");

  // On insère les caractères tels que les espaces, ponctuation... à la bonne position dans le message crypté.
  return insertSpecialCharacters(message, res1, alphabet);
}

export { encrypt, decrypt }


// const MESSAGE = "Bonjour, bienvenue dans le 974 ! :)";
// const KEY = "galois";

// console.log("Message à crypter : ", MESSAGE);
// const encryptedMessage = encrypt(MESSAGE, KEY, ALPHABET);
// console.log("message crypté : ", encryptedMessage);

// console.log("Message à décrypter : ", encryptedMessage);
// console.log("message décrypté : ", decrypt(encryptedMessage, KEY, ALPHABET));

