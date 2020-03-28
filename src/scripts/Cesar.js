/**
 * Implementation du chiffrement de César
 */
import { splitExtASCIIstring, decale } from "./utils";

/**
 * Fonction permettant de crypter/décrypter un message grâce à l'algorithme de César
 * Entrée : Le message sous forme de chaine de caractères.
 *        : Le décallage sous forme d'entier (positif ou négatif)
 * Sortie : Le message crypté sous forme de chaine de caractères.
 */
function cesar(message, decallage) {
  const messageSplit = splitExtASCIIstring(message); // Retourne un tableau de caractères (traite les caractères en hexa)
  let encryptedMessage = messageSplit // Parcours du tableau de caractères
    .map(c => decale(c, decallage)) // On décale le caractère dans la table ASCII étendue
    .join(""); // On transforme le tableau de caractère retourné par map() en une chaine de caractères

  return encryptedMessage;
}

export { cesar };

// const decallage = 1;
// const message = "J'adore écouter la radio !";

// console.log("Message à cryprer : ", message);
// const encryptedMessage = cesar(message, decallage);
// console.log("Message crypté : ", encryptedMessage);

// console.log("Message à décryprer : ", encryptedMessage);
// console.log("Message décrypté : ", cesar(encryptedMessage, -decallage));
