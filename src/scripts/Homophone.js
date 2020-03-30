/**
 * Implémentation de l'algorithme Homophone
 */
import { getAlphabet, getNumbers, getRandomInt, splitToNblocs } from "./utils";

const lettres = getAlphabet(); // liste des lettres de l'alphabet
const chiffres = getNumbers(); // liste des chiffres de 1 à 9
const ALPHABET = lettres.concat(chiffres); // Tableau contenant les lettres et les chiffres

/**
 * Fonction permettant de préparer le message
 * Entrée : Le message en Chaine de caractères
 * Sortie : Le message sous forme de tableau de caractères en minuscules
 */
function prepareMessage(msg) {
  return msg
    .toLowerCase() // Transformation en minuscule
    .split(""); // Split par caractère -> renvoi un tableau
}

/**
 * Fonction qui test si la clé est valide.
 * Entrée : La clé sous forme de chaine de caractères.
 * Sortie : True si la clé est valide, false sinon.
 */
function isKeyValid(key) {
  // Cette ligne va convertir la clé en tableau de caractères et va tester si chacune de ses valeurs
  // est dans l'alphabet. Si une seule des valeurs n'est pas inclues dans ALPHABET, every() renvoi false.
  return key.split("").every(c => ALPHABET.includes(c));
}

/**
 * Génération du carré de polybe.
 * Entrée : La clé sous forme de chaine de caractère et l'alphabet utilisé pour ce chiffrement.
 * Sortie : Un carré de polybe sous forme de dictionnaire construit à partir de la clé où la "key"
 *        : est le caractère et la "value" un tableau du type [x,y] où x est le numéro de ligne du
 *        : caractère dans le carré de polybe  et y sont numéro de colonne.
 */
function getCarrePolybe(key, alphabet) {
  const size = 6;
  // cette expression va transformer la clé en tableau de caractères avec la méthode split().
  // Les doublons seront ensuite retirés en créant un objet Set().
  // L'objet Set() sera ensuite converti en tableau grace au spread operator "[... ]".
  let keyTab = [...new Set(key.split(""))]; // La clée sans doublons sous forme de tableau de caractères
  let alphabetTab = alphabet.filter(e => !keyTab.includes(e)); // On enlève les caractères de la clé dans l'alphabet
  let carrePolybe = new Map(); // Le dictionnaire qui va stocker le carré de polybe
  for (let i = 0; i < size * size; i++) {
    const colonne = i % size; // colonnes -> répétitions de la suite : 0,1,2,3,4,5 en 6 fois
    const ligne = (i - (i % size)) / size; // lignes -> 0,0,0,0,0 puis 1,1,1,1,1 puis... jusqu'à 5,5,5,5,5
    const currentElementOfPolybe =
      keyTab.length !== 0 ? keyTab.shift() : alphabetTab.shift(); // On récupère d'abord les élements de la clé, puis ceux de l'alphabet.
    carrePolybe.set(currentElementOfPolybe, [ligne, colonne]); // On remplit le dictionnaire tel que décrit dans la description de la fonction
  }
  return carrePolybe;
}

/**
 * Cryptage d'un message grâce à l'algorithme Homophone.
 * Entrée : La clé sous forme de chaine de caractères
 *        : Le message à crypté sous forme de chaine de caractères
 *        : L'alphabet du cryptage
 * Sortie : Une chaine de caractère représentant le message crypté.
 */
function encrypt(msg, key, alphabet = ALPHABET) {
  const preparedMsg = prepareMessage(msg); // Mise en forme du message
  const polybe = getCarrePolybe(key, alphabet); // Création du carré de polybe
  return preparedMsg
    .map(c => {
      if (alphabet.includes(c)) {
        const [ligne, colonne] = polybe.get(c); // Récupération des coordonnées du caractère. ligne = N°ligne et colonne = N°colonne
        let ligneCandidats = []; // Les caractères candidats sur la même ligne que le caractère du message
        let colonneCandidats = []; // Les caractères candidats sur la même colonne que le caractère du message
        for (let [char, [lig, col]] of polybe) {
          if (lig === ligne && char !== c) ligneCandidats.push(char); // Récupération des candidats sur la même ligne
          if (col === colonne && char !== c) colonneCandidats.push(char); // Récupération des candidats sur la même colonne
        }
        const ligneIndiceRandom = getRandomInt(ligneCandidats.length); // Indice aléatoire dans la liste des candidats de ligne
        const colonneIndiceRandom = getRandomInt(colonneCandidats.length); // Indice aléatoire dans la liste des candidats de colonne
        const res1 = ligneCandidats[ligneIndiceRandom]; // Caractère 1
        const res2 = colonneCandidats[colonneIndiceRandom]; // Caractère 2
        return `${res1}${res2}`;
      } else return c;
    })
    .join(""); // On transforme le tableau en chaine de caractères car map() renvoi un tableau !
}

/**
 * Décryptage d'un mot crypté par l'algorithme Homophone.
 * Entrée : La clé sous forme de chaine de caractères
 *        : Le message crypté sous forme de chaine de caractères
 *        : L'alphabet du cryptage
 * Sortie : Une chaine de caractère représentant le mot décrypté.
 */
function decryptWord(key, word, alphabet) {
  const preparedMsg = splitToNblocs(word.toLowerCase(), 2); // Le message séparé en blocs de 2 caractères
  const polybe = getCarrePolybe(key, alphabet); // Création du carré de polybe
  return preparedMsg
    .map(c => {
      const char1 = c[0]; // Le premier caractère crypté du couple
      const char2 = c[1]; // Le second caractère crypté du couple
      if (alphabet.includes(char1) && alphabet.includes(char2)) {
        const coord1 = polybe.get(char1); // Coordonnées du premier caractère dans le carré de polybe
        const coord2 = polybe.get(char2); // Coordonnées du second caractère dans le carré de polybe
        const ligne = coord1[0]; // Ligne du caractère décrypté dans le carré de polybe
        const colonne = coord2[1]; // Colonne du caractère décrypté dans le carré de polybe
        let decryptedChar = ""; // Variable qui va contenir le caractère décrypté
        for (const [char, [lig, col]] of polybe) {
          if (lig === ligne && col === colonne) decryptedChar = char; // On récupère le caractère décrypté dans le carré de polybe
        }
        return decryptedChar;
      } else return c;
    })
    .join(""); // On transforme le tableau en chaine de caractères car map() renvoi un tableau !
}

/**
 * Décryptage du message crypté par l'algorithme Homophone.
 * Entrée : La clé sous forme de chaine de caractères
 *        : Le message crypté sous forme de chaine de caractères
 *        : L'alphabet du cryptage
 * Sortie : Une chaine de caractère représentant le mot décrypté.
 */
function decrypt(msg, key, alphabet = ALPHABET) {
  let currentWord = ""; // Un mot à décrypter
  let result = ""; // Le message décrypté
  for (let i = 0; i < msg.length; i++) {
    const char = msg[i];
    // Si c'est un caratère de l'alphabet, on l'ajoute au mot courant
    if (alphabet.includes(char)) {
      currentWord += char;
      if(i === msg.length -1 ) result += decryptWord(key, currentWord, alphabet);
    }
    // Sinon,
    else {
      result += decryptWord(key, currentWord, alphabet); // On décrypte le mot courant et on l'ajoute au résultat final
      currentWord = ""; // On clear le mot courant
      result += char; // On ajoute le caractère "spéciale" au résultat final
    }
  }

  return result;
}

export { isKeyValid, encrypt, decrypt };

// const KEY = "thisismykey"; // la clé
// const MESSAGE = "moi manu, j'adore coder."; // le message à crypter
// const MESSAGE_ENCRYPTED = "h8gws6 hceij2qb, fi'k6k3fywicz emg9bwdgw0.";
// const crypt = false;

// const validKey = isKeyValid(KEY);
// if (validKey) {
//   if (crypt) {
//     const encryptedMessage = encrypt(MESSAGE, KEY);
//     console.log("ENCRYPT " + MESSAGE);
//     console.log(encryptedMessage);
//   } else {
//     const decryptedMessage = decrypt(MESSAGE_ENCRYPTED, KEY);
//     console.log("DECRYPT " + MESSAGE_ENCRYPTED);
//     console.log(decryptedMessage);
//   }
// } else {
//   console.log("La clé n'est pas valide.");
// }

/**
 * TODO : Vérifier si la clé en majuscule fonctionne ?
 */
