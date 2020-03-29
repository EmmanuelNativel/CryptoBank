/**
 * Implémentation du chiffrement de Vigenere
 */

import { splitExtASCIIstring, decale, indexOf } from "./utils";

/**
 * Fonction permettant de récupérer le pattern de la clé en fonction du mesage
 * Prérequis : La clée ne doit contenir que des lettres (majuscules ou minuscules).
 * Entrée : Le message
 *        : La clé
 * Sortie : Le pattern du message (= l'association d'un caractère de la clé à un caractère du message) -> tableau de char
 */
function getKeyPattern(msg, key) {
  const msgSplit = splitExtASCIIstring(msg); // Transformation du msg en tableau de char avec traitement des valeurs hexa
  //Parcours du msg sous forme de tableau de caractères. c -> caractère courant / i -> indice du caractère courant
  return msgSplit.map((c, i) => key.charAt(i % key.length));
}

/**
 * Crypte le message chiffré par l'algorithme de Vigenère
 * Entrée : Le message à coder sous forme de chaine de caractères
 *        : La clée sous forme de chaine de caractères
 * Sortie : Le message crypté sous forme de chaine de caractères
 */
function encrypt(msg, key) {
  const pattern = getKeyPattern(msg, key); // Le pattern de la clé en fonction du message
  const messageSplit = msg.split(""); // Le message sous forme de tableau de caractères

  const encryptedMsg = messageSplit // parcours du message
    .map((c, i) => {
      // c-> caractère courant, i-> indice courrant
      return decale(c, indexOf(pattern[i])); // on décale le caractère courant de l'indice du pattern courrant dans l'alphabet
    })
    .join(""); // On tranforme le tableau de caractères en chaine de caractères

  return encryptedMsg;
}

/**
 * Décrypte le message chiffré par l'algorithme de Vigenère
 * Entrée : Le message à décoder sous forme de chaine de caractères
 *        : La clée sous forme de chaine de caractères
 * Sortie : Le message décrypté sous forme de chaine de caractères
 */
function decrypt(msg, key) {
  const parsedMessage = splitExtASCIIstring(msg); // Transformation du msg en tableau de char avec traitement des valeurs hexa
  const pattern = getKeyPattern(msg, key); // pattern de la clé sous forme de tableau de caractères

  const decryptedMsg = parsedMessage // parcours du message, c-> caractère courant, i-> indice courrant
    .map((c, i) => decale(c, -indexOf(pattern[i]))) // on décale le caractère courant de l'indice du pattern courrant dans l'alphabet
    .join(""); // On tranforme le tableau en chaine de caractères

  return decryptedMsg;
}

export { encrypt, decrypt };

// const MESSAGE = "J'adore écouter la radio !";
// const KEY = "musique";

// console.log("Message à cryprer : ", MESSAGE);
// const encryptedMessage = encrypt(MESSAGE, KEY);
// console.log("Message crypté : ", encryptedMessage);

// console.log("Message à décryprer : ", encryptedMessage);
// console.log("Message décrypté : ", decrypt(encryptedMessage, KEY));
