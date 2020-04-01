import {
  listToMatrix,
  transposeMatrix,
  splitExtASCIIstring,
} from "./utils";

/**
 * Pour chaque caractère de la clé, cette fonction retourne un tableau contenant
 * son rang dans l'ordre des lettres de la clé, et le caractère lui même.
 * Exemple : Considérons la clé "BAC" et r le tableau résultant de rankKey("BAC").
 *         : Alors r[0] renvoi un tableau [1, B].
 *         : On sait donc que l'indice intiale du caractère B dans la clé est 0, car r[O].
 *         : On sait aussi que les lettres de colonne de B devra être lu en 2ième position car r[0][0] = 1 et on commence à compter à 0.
 * Entrée : La clé sous forme de chaine de caractères
 * Sortie : Un tableau permettant de retrouver le rang d'un caractère pour la lecture de la matrice.
 */
function rankKey(key) {
  const keyA = key.split(""); // La clé sous forme de tableau de caractères
  const sortedKeyA = key.split("").sort(); // Le tableau trié dans l'ordre alphabétique
  let res = []; // Stockage du résultat

  for (let i = 0; i < keyA.length; i++) {
    // Parcours de la clé
    const char = keyA[i]; // Le caractère courant
    const newIndex = sortedKeyA.indexOf(char); // Le nouvel indice. indexOf() retourne la position dans l'alphabet
    sortedKeyA[newIndex] = "xxxx";
    res.push([newIndex, char]);
  }
  return res;
}

/**
 * Fonction permettant de crypter un message grâce à la transposition rectangulaire.
 * Entrée : Le message sous forme de chaine de caractères
 *        : La clé sous forme de chaine de caractères
 * Sortie : Le message codé sous forme de chaine de caractères.
 */
function encrypt(msg, key) {
  let split = splitExtASCIIstring(msg); // Split du msg en prenant en compte les caractères hexa
  split = split.map(c => (c.length > 1 ? "\\" + c : c)); // On rajoute le '\' pour la présentation des nbres hexa

  const matrix = listToMatrix(split, key.length); // On insère le message dans une matrice
  const reversedMatrix = transposeMatrix(matrix); // On transpose la matrice pour avoir les colonnes
  const ranking = rankKey(key); // On obtient les rang des colonnes

  console.log("matrix", matrix);
  console.log("reversedMatrix", reversedMatrix);
  console.log("ranking", ranking);

  // On ajoute la bonne colonne à chacun des rang
  for (let i = 0; i < ranking.length; i++) {
    ranking[i].push(reversedMatrix[i]);
  }

  console.log("ranking after adding col", ranking);

  let res = "";

  // On trie les colonnes par le rang et on tranforme les colonnes en chaine de caractères pour obtenir le msg codé
  for (let i of ranking.sort()) {
    if(i[2]) res += i[2].join("");
  }
  return res;
}

/**
 * Fonction permettant de décrypter un message codé grâce à la transposition rectangulaire.
 * Entrée : Le message crypté sous forme de chaine de caractères
 *        : La clé sous forme de chaine de caractères
 * Sortie : Le message décrypté sous forme de chaine de caractères.
 */
function decrypt(msg, key) {
  let messageSplited = splitExtASCIIstring(msg); // Split du msg en prenant en compte les caractères hexa
  messageSplited = messageSplited.map(c => (c.length > 1 ? "\\" + c : c)); // On rajoute le '\' pour la présentation des nbres hexa
  let matrix = listToMatrix(messageSplited, key.length); // Le message sous forme de matrice de la taille de la clé
  let matrixT = transposeMatrix(matrix); // La transoposée de cette matrice pour obtenir les colonnes
  const ranks = rankKey(key); // Le classement de chaque caractères de la clé dans l'ordre

  // On va supprimer les valeurs undefined de la matrice transposée
  matrix = []; // Va contenir la matrice sans les caractères undifined (= caractères vides)
  for (let i = 0; i < matrixT.length; i++) {
    // Pour chaque colonne de la matrice
    const tmpArray = []; // Stockage temporaire d'une ligne de la matrice
    for (let j = 0; j < matrixT.length; j++) {
      // Pour chaque ligne de la matrice
      if (matrixT[i][j] !== undefined) tmpArray.push(matrixT[i][j]); // On ne retient que les caractères différent de undefined
    }
    matrix.push(tmpArray); // On ajoute la ligne dans la matrice finale
  }

  // On va remplir la nouvelle matrice dans le bon ordre avec les caractères codés
  let currentRank = 0; // L'ordre de remplissage des colonnes
  while (currentRank < ranks.length) {
    for (let i = 0; i < ranks.length; i++) {
      if (ranks[i][0] === currentRank) {
        // On recherche le numéro de colonne qui doit être rempli au rang courant
       if(matrix[i]) matrix[i] = messageSplited.splice(0, matrix[i].length); // On remplie la ligne avec les premiers caractères du message codé
        currentRank++; // On passe au rang suivant
        break; // On stop la boucle for
      } else continue;
    }
  }

  // On retourne la transposée de la matrice sous forme concaténée sous forme de chaine de caractères
  return transposeMatrix(matrix) // On transpose la matrice,
    .flat() // On passe du tableau à 2 dimension à un tableau à 1 dimension
    .join(""); // On concatène les caractères
}

export { encrypt, decrypt };

// const MESSAGE = "Je suis en italie avec maria !";
// const KEY = "BIBMATH";

// console.log("Message à cryprer : ", MESSAGE);
// const encryptedMessage = encrypt(MESSAGE, KEY);
// console.log("Message crypté : ", encryptedMessage);

// console.log("Message à décryprer : ", encryptedMessage);
// console.log("Message décrypté : ", decrypt(encryptedMessage, KEY));
