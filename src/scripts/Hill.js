/**
 * Implémentation du chiffrement de Hill en séparant en blocs de 2 uniquement
 */

import { getExtendedAsciiCharOf, inverseMod256, getExtendedAsciiCodeOf, splitExtASCIIstring, hexaToDecimal } from "./utils";

const M = 2;

/**
 * Fonction qui retourne le déterminant d'une matrice 2x2
 * Entrée : Les élements de la matrice
 * Sortie : Le déterminant sous forme d'entier
 */
function getDeterminant(a, b, c, d) {
  return a * d - b * c;
}

/**
 * Fonction permettant de vérifier si la matrice données est valide.
 * Entrée : Le déterminant de la matrice
 * Sortie : Un booléen : Vrai si la matrice est valide, faux sinon.
 */
function isMAtrixValid(determinant) {
  return !(determinant % 2 === 0 || determinant % 13 === 0);
}

/**
 * Fonction permettant de coder un message grâce à l'algorithme de Hill
 * Entrée : M -> Le découpage du message
 *        : a, b, c, d -> Les éléments de la matrice clée
 *        : msg -> Le message à crypter
 * Sortie : Le message crypté sous forme de chaine de caractères
 */
function encrypt(a, b, c, d, msg, m=M) {
  // On ajoute un espace si un groupe est incomplet -> Il sera retiré au déchiffrement
  if (msg.length % m !== 0) msg = msg + " ";

  const msgArray = splitExtASCIIstring(msg); // On split le message en prenant en compte les caractères non-visibles

  // On va ensuite récupéré le code ASCII étendu de chacun des éléments
  const msgIndex = msgArray.map(c => {
    const code = c.length > 1 ? hexaToDecimal(c) : getExtendedAsciiCodeOf(c); // si c.length > 1 alors on est entrain de traiter un caractère hexadécimal
    return code;
  });
  let codedMsg = ""; // Va contenir le message crypté

  for (let i = 0; i < msgIndex.length; i += m) {
    const x1 = msgIndex[i]; // Le premier caractère
    const x2 = msgIndex[i + 1]; // Le second caractère

    const y1 = a * x1 + b * x2;
    const y2 = c * x1 + d * x2;

    let z1 = y1 % 256;
    let z2 = y2 % 256;

    if (z1 < 0) z1 += 256;
    if (z2 < 0) z2 += 256;

    codedMsg += getExtendedAsciiCharOf(z1); // On récupère le caractère associé au code du nouveau caractère crypté
    codedMsg += getExtendedAsciiCharOf(z2); // On récupère le caractère associé au code du nouveau caractère crypté
  }
  return codedMsg;
}

/**
 * Fonction permettant de décoder un message grâce à l'algorithme de Hill
 * Entrée : M -> Le découpage du message
 *        : det -> Le déterminant de la matrice clée
 *        : a, b, c, d -> Les éléments de la matrice clée
 *        : msg -> Le message à crypter
 * Sortie : Le message décrypté sous forme de chaine de caractères
 */
function decrypt(det, a, b, c, d, msg, m=M) {
  const inverseDet = inverseMod256(det); // Calcul de l'inverse % 256 du déterminant
  const msgArray = splitExtASCIIstring(msg); // On split le message en prenant en compte les caractères non-visibles

  // On va ensuite récupéré le code ASCII étendu de chacun des éléments
  const msgIndex = msgArray.map(c => {
    const code = c.length > 1 ? hexaToDecimal(c) : getExtendedAsciiCodeOf(c); // si c.length > 1 alors on est entrain de traiter un caractère hexadécimal
    return code;
  });
  let decodedMsg = ""; // Va contenir le message décrypté

  for (let i = 0; i < msgIndex.length; i += m) {
    const x1 = msgIndex[i]; // Le premier caractère
    const x2 = msgIndex[i + 1]; // Le second caractère

    const y1 = inverseDet * (d * x1 - b * x2);
    const y2 = inverseDet * (-c * x1 + a * x2);

    let z1 = y1 % 256;
    let z2 = y2 % 256;

    if (z1 < 0) z1 += 256;
    if (z2 < 0) z2 += 256;

    decodedMsg += getExtendedAsciiCharOf(z1); // On récupère le caractère associé au code du nouveau caractère décrypté
    decodedMsg += getExtendedAsciiCharOf(z2); // On récupère le caractère associé au code du nouveau caractère décrypté
  }
  return decodedMsg.trim(); // On enlève l'espace supplémentaire ajouté si le nombre de caractère n'est pas paire (ici m vaut tjs 2)
}

export { encrypt, decrypt, getDeterminant, isMAtrixValid };


// const MESSAGE = "Sécurité {Informatique}!";
// const A = 3;
// const B = 5;
// const C = 2;
// const D = 7;

// const determinant = getDeterminant(A, B, C, D);
// const isValid = isMAtrixValid(determinant);

// if (isValid) {
//   console.log("Message à crypter : ", MESSAGE);
//   const encryptedMessage = encrypt(A, B, C, D, MESSAGE, M);
//   console.log("message crypté : ", encryptedMessage);

//   console.log("Message à décrypter : ", encryptedMessage);
//   console.log(
//     "message décrypté : ",
//     decrypt(determinant, A, B, C, D, encryptedMessage, M)
//   );
// } else console.log("Le déterminant n'est pas valide !");
