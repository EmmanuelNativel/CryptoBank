/* eslint-disable no-undef */
import PRIME_NUMBERS from "./PrimeNumbers"; // --> tableau de nombres premiers
import { splitToNblocs } from "./utils";

/**
 * Calcul de e
 * Entrée : phi(n) -> BigInt
 *        : p -> BigInt
 *        : q -> BigInt
 * Sortie : e (-> BigInt) tel que  max(p,q) < e < phi(n)  et  (phi(n) % e) !== 0
 * Erreur possible : Oui
 */
function getE(phiden, p, q) {
  // On cherche [max(p,q) < e < phi(n)] ET [phi(n) % e !== 0]
  const depart = PRIME_NUMBERS.indexOf(p > q ? p : q) + 1; // indice de max(p,q) dans la liste des nombres premiers
  for (let i = depart; i < PRIME_NUMBERS.length; i++) {
    const e = PRIME_NUMBERS[i];
    // Si on dépasse le tableau en dur de nombres premiers --> veuillez choisir p et q plus petits svp
    if (e >= phiden) throw new Error("Please choose p et q smaller");
    else if (phiden % e !== 0) return e;
  }
}

/**
 * Algorithme d'Euclide étendu, afin d'obtenir d
 * Entrée : a -> BigInt
 *        : b -> BigInt
 * Sortie : e -> BigInt, l'inverse modulaire de b%a.
 * Erreur possible : Oui
 */
function getD(a, b) {
  let r = a;
  let r1 = b;
  let u = 1n;
  let v = 0n;
  let u1 = 0n;
  let v1 = 1n;
  let q, rs, us, vs;
  while (r1 !== 0n) {
    q = r / r1;
    rs = r;
    us = u;
    vs = v;
    r = r1;
    u = u1;
    v = v1;
    r1 = rs - q * r1;
    u1 = us - q * u1;
    v1 = vs - q * v1;
  }

  return v < 0n ? v + a : v; // si on a un nombre négatif, on ajoute a car on travail en modulo a
}

/**
 * Fonction permettant de crypter un message grâce à l'algorithme RSA -> (ASCII uniquement)
 * Entrée : Le message à crypter sous forme de chaine de caractères
 *        : La clé publique du destinataire du message
 *        : -> la clé publique est un tableau de BigInt dont la première valeur est e et la deuxième est n
 * Sortie : Le message crypté sous forme de chaine de caractères.
 *        : Le message crypté est sépaprés en blocs de 4 chiffres séparés par un espace
 */
function encrypt(message, publicKey) {
  // 1- Récupération de e et de n dans la clé publique
  const e = publicKey[0];
  const n = publicKey[1];

  // 2 - On va récupérer le code ASCII de chaque char sur 3 chiffres. On rajoute des zéros avant si besoin.
  const asciiString = message
    .split("")
    .map((c) => {
      // c va contenir les caractères du message un par un
      let ascii = c.charCodeAt(0).toString(10); // Code ASCII sous forme de string en base 10
      while (ascii.length < 3) {
        // On va ajouter des 0 devant pour faire des groupes de 3
        ascii = "0" + ascii;
      }
      return ascii;
    })
    .join("");

  // 3 - On sépare asciiString en blocs de 4 chiffres. On rajoute des zéros avant si besoin.
  const splitAscii = splitToNblocs(asciiString, 4);

  // 4 - Chiffrage du code ASCII
  const result = splitAscii.map((c) => {
    return BigInt(c) ** e % n;
  });

  return result.join(" "); // On sépare les blocs cryptés par un espace
}

/**
 * Fonction permettant de décrypter un message grâce à l'algorithme RSA
 * Entrée : Le message à décrypter sous forme de chaine de caractères
 *        : La clé privée du destinataire du message
 *        : -> la clé privée est un tableau de BigInt dont la première valeur est d et la deuxième est n
 * Sortie : Le message décrypté sous forme de chaine de caractères.
 * Warning: Code bloquant potentiellement long ! (asynchrone non traité ici)
 */
function decrypt(message, privateKey) {
  // 1- Récupération de d et de n dans la clé privée
  let d = privateKey[0];
  const n = privateKey[1];

  // 2- On fait en sorte que chaque bloc décrypté soit exprimé par 4 chiffres. Puis on concatène le tout.
  const blocs = message.split(" ");
  const nbBlocs = blocs.length;
  const asciiString = blocs
    .map((c, i) => {
      const bloc = BigInt(c); // Transforme en "grand entier"
      console.log("Decryptage du bloc ", bloc);
      let ascii = bloc ** d % n; // On déchiffre
      console.log("Code ASCII du bloc ", ascii);
      ascii = ascii.toString(10); // On transforme en string
      while (ascii.length < 4 && i < nbBlocs - 1) {
        // On forme des blocs de 4
        ascii = "0" + ascii;
      }
      return ascii;
    })
    .join("");

  // 3- On sépare en blocs de 3
  const asciiCodes = splitToNblocs(asciiString, 3);

  console.log("Les codes ascii du message : ", asciiCodes);

  // 4- On retouve le caractère associé à chacun des codes. Et on concatène le tout.
  const result = asciiCodes
    .map((c) => {
      const ascii = parseInt(c, 10);
      return String.fromCharCode(ascii);
    })
    .join("");

  console.log("Message décrypté :", result);

  return result;
}

/**
 * Génération d'une clé publique et d'une clé privée en fonction de p et de q.
 * Entrée : p et q -> BigInt
 * Sortie : Un tableau contenant la clé publique en indice 0 et la clé privée en indice 1.
 *        : Chaque clé est elle même un tableau de BigInt.
 *        : Clé publique : [e, n]
 *        : Clé privée : [d, n]
 */
function generateKey(p, q) {
  // 0- Convertion de p et q en BigInt pour pouvoir gérer les grands nombres
  p = BigInt(p);
  q = BigInt(q);

  // 1- Vérifications de p et de q
  if (p > 49999n || q > 49999n)
    throw new Error("Please, select p and q < 49999");
  if (!PRIME_NUMBERS.includes(p)) throw new Error("p is not a prime number !");
  if (!PRIME_NUMBERS.includes(q)) throw new Error("q is not a prime number !");

  // 2- Calcul de n
  const n = p * q;

  // 3- Calcul de phi(n)
  const phiden = (p - 1n) * (q - 1n);
  console.log("n = ", n, " / phi(n) = ", phiden);

  // 4- Calcul de e
  const e = getE(phiden, p, q);
  console.log("e = ", e);

  // 5- Calcul de d
  let d = getD(phiden, e);
  console.log("d = ", d);

  // 6- Obtention de la clé publique et de la clé privée
  const publicKey = [e, n];
  const privateKey = [d, n];
  console.log(`Clef publique = (${e},${n})`);
  console.log(`Clef privée = (${d},${n})`);

  return [publicKey, privateKey];
}

/**
 * Renvoie un entier aléatoire entre une valeur min (incluse) et une valeur max (exclue).
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Fonction permettant d'obtenir un nombre premier aléatoire parmis les entiers répertoriés dans PRIME_NUMBERS
 * Sortie : Un nombre premier < 3581 sous forme de BigInt
 *        : On choisit en dessous de 3581 afin de pouvoir générer des nombres qui permettent de décrypter le message dans un temps raisonnable.
 */
function getRandomPrimeNumber() {
  const indice = getRandomInt(0, 500);
  return PRIME_NUMBERS[indice];
}

/**
 * Petite fonction de test
 */
function test() {
  // BOB a besoin d'une clé.
  console.log("===**  BOB A BESOIN D'UNE CLÉ  **===");

  // Il choisit p et q, 2 nombres premiers
  const pBob = "503";
  const qBob = "563";
  console.log("p = ", pBob, " / q = ", qBob);

  // Génération de la clé publique et de la clé privée
  const [publicKeyBob, privateKeyBob] = generateKey(pBob, qBob);
  console.log("Clef publique de Bob =", publicKeyBob);
  console.log("Clef privée de Bob =", privateKeyBob);
  console.log("");

  // ALICE a besoin d'une clé.
  console.log("===**  ALICE A BESOIN D'UNE CLÉ  **===");

  // Elle choisit p et q, 2 nombres premiers
  const pAlice = "48989";
  const qAlice = "42853";
  console.log("p = ", pAlice, " / q = ", qAlice);

  // Génération de la clé publique et de la clé privée
  const [publicKeyAlice, privateKeyAlice] = generateKey(pAlice, qAlice);
  console.log("Clef publique de Alice =", publicKeyAlice);
  console.log("Clef privée de Alice =", privateKeyAlice);
  console.log("");

  console.log("===**  ALICE VEUT ENVOYER UN MESSAGE A BOB  **===");
  // Alice veut envoyer le message "J'ai besoin d'aide !" à BOB
  // Alice utilise donc la clé publique de Bob pour crypter le message
  const message = "J'ai besoin d'aide !";
  console.log("ALICE - Cryptage de : ", message);
  const encryptedMsg = encrypt(message, publicKeyBob);
  console.log("Message crypté => ", encryptedMsg);
  console.log("");

  console.log("===**  BOB VEUT LIRE LE MESSAGE DE ALICE  **===");
  // Bob utilise sa clé privée pour décrypter le message d'Alice
  console.log("BOB - Décryptage de : ", encryptedMsg);
  const decryptedMsg = decrypt(encryptedMsg, privateKeyBob);
  console.log("Message décrypté => ", decryptedMsg);
  console.log("");
}

export { test, generateKey, encrypt, decrypt, getRandomPrimeNumber };
