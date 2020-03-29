/**
 * Implémentation de du cryptage AtBash
 */

import { splitExtASCIIstring, hexaToDecimal, getExtendedAsciiCodeOf, getExtendedAsciiCharOf } from "./utils";

/**
 * Fonction permettant de crypter/décrypter un message grâce à l'algorithme AtBash
 * Entrée : Le message sous forme de chaine de caractères
 * Sortie : Le message crypté sous forme de chaine de caractères.
 */
function atBash(message) {
  const alphaSize = 256; // Taille de la table ASCII étendue
  //const messageSplit = message.split(""); // Tranformation du message en tableau de caractères
  const messageSplit = splitExtASCIIstring(message);

  const result = messageSplit // Parcours des caractères
    .map(c => {
      const newCode =
        c.length > 1 // On test si c'est un nombre hexa ou non
          ? alphaSize - 1 - hexaToDecimal(c) // si c'est le cas, on retourne la valeur décimale
          : alphaSize - 1 - getExtendedAsciiCodeOf(c); // Sinon on calcul le charCode du caractère crypté
      return getExtendedAsciiCharOf(newCode); // Récupération du caractère correspondant au code dans la table ASCII étendue
    })
    .join(""); // Transformation du tableau de caractères en chaine de caractères

  return result;
}

export { atBash };

// const message = "²Sécurité {Informatique} !";

// console.log("Message à crypter : ", message);
// const encryptedMessage = atBash(message);
// console.log("message crypté : ", encryptedMessage);

// console.log("Message à décrypter : ", encryptedMessage);
// console.log("message décrypté : ", atBash(encryptedMessage));
