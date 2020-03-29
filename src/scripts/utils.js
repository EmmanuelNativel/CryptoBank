/**
 * Génération de l'alphabet sous forme de tableau
 */
function getAlphabet() {
    const alphaStart = "a".charCodeAt(0);
    let alphabet = [];
    for (let i = 0; i < 26; i++) {
      const currentCode = alphaStart + i;
      alphabet.push(String.fromCharCode(currentCode));
    }
    return alphabet;
  }
  
  /* ====================================================================================== */
  
  /**
   * Génération de l'alphabet sous forme de tableau
   */
  function getNumbers() {
    const zeroCode = "0".charCodeAt(0);
    let chiffres = [];
    for (let i = 0; i < 10; i++) {
      const currentCode = zeroCode + i;
      chiffres.push(String.fromCharCode(currentCode));
    }
    return chiffres;
  }
  
  /* ====================================================================================== */
  
  /**
   * Retrouver l'indice d'une lettre dans l'alphabet
   */
  
  function indexOf(lettre) {
    lettre = lettre.toLowerCase();
    return lettre.charCodeAt(0) - "a".charCodeAt(0);
  }
  
  //console.log(indexOf("L"));
  
  /* ====================================================================================== */
  
  /**
   * Retourne la lettre de l'alphabet correspondant à l'indice donné (indice(a) = 0)
   */
  
  function getLetter(indice) {
    return String.fromCharCode("a".charCodeAt(0) + indice);
  }
  
  //console.log("lettre ", getLetter(21));
  
  /* ====================================================================================== */
  
  /**
   * Calcul de l'inverse du déterminant module 256 d'une matrice
   * Utilisé pour déchiffrer un message coder avec le chiffrement de Hill
   * Entrée : le déterminant d'une matrice
   * Sortie : l'inverse du déterminant modulo 256
   */
  function inverseMod256(a) {
    let b = 256;
    let x = 1;
    let t = 1;
    let y = 0;
    let s = 0;
    let q, r, tmp;
  
    while (b > 0) {
      q = Math.trunc(a / b);
      r = a % b;
      a = b;
      b = r;
      tmp = s;
      s = x - q * s;
      x = tmp;
      tmp = t;
      t = y - q * t;
      y = tmp;
    }
  
    return x + 256;
  }
  
  //console.log("inverse du déterminant -> ", inverseMod26(11));
  
  /* ====================================================================================== */
  
  /**
   * Décalage d'une lettre dans l'alphabet. Si le décalage dépasse le Z alors on recommence au début de l'alphabet
   */
  /*
  function decale(lettre, n) {
    const alphaSize = 26;
    const alphaStart = "a".charCodeAt(0);
  
    const code = lettre.charCodeAt(0) - alphaStart + n;
    const resultCode = alphaStart + (code % alphaSize);
  
    return String.fromCharCode(resultCode);
  }
  */
  
  /* ====================================================================================== */
  
  /**
   * Renvoie un entier aléatoire compris entre 0 et max-1
   */
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  /* ====================================================================================== */
  /**
   * Découpe la string en entrée en blocs de taille n
   */
  function splitToNblocs(string, n) {
    let result = [];
  
    // On sépare le msg en blocs de taille n
    while (string.length >= n) {
      const subString = string.substr(0, n);
      result.push(subString);
      string = string.replace(subString, "");
    }
  
    // On ajoute le dernier bloc si il y en a
    if (string !== "") result.push(string);
    return result;
  }
  
  /* ====================================================================================== */
  /**
   * Obtenir le code du caractère en ASCII étendu
   */
  const EXT_ASCII_CODEKEY = [
    [128, "Ç"],
    [129, "ü"],
    [130, "é"],
    [131, "â"],
    [132, "ä"],
    [133, "à"],
    [134, "å"],
    [135, "ç"],
    [136, "ê"],
    [137, "ë"],
    [138, "è"],
    [139, "ï"],
    [140, "î"],
    [141, "ì"],
    [142, "Ä"],
    [143, "Å"],
    [144, "É"],
    [145, "æ"],
    [146, "Æ"],
    [147, "ô"],
    [148, "ö"],
    [149, "ò"],
    [150, "û"],
    [151, "ù"],
    [152, "ÿ"],
    [153, "Ö"],
    [154, "Ü"],
    [155, "¢"],
    [156, "£"],
    [157, "¥"],
    [158, "₧"],
    [159, "ƒ"],
    [160, "á"],
    [161, "í"],
    [162, "ó"],
    [163, "ú"],
    [164, "ñ"],
    [165, "Ñ"],
    [166, "ª"],
    [167, "º"],
    [168, "¿"],
    [169, "⌐"],
    [170, "¬"],
    [171, "½"],
    [172, "¼"],
    [173, "¡"],
    [174, "«"],
    [175, "»"],
    [176, "░"],
    [177, "▒"],
    [178, "▓"],
    [179, "│"],
    [180, "┤"],
    [181, "╡"],
    [182, "╢"],
    [183, "╖"],
    [184, "╕"],
    [185, "╣"],
    [186, "║"],
    [187, "╗"],
    [188, "╝"],
    [189, "╜"],
    [190, "╛"],
    [191, "┐"],
    [192, "└"],
    [193, "┴"],
    [194, "┬"],
    [195, "├"],
    [196, "─"],
    [197, "┼"],
    [198, "╞"],
    [199, "╟"],
    [200, "╚"],
    [201, "╔"],
    [202, "╩"],
    [203, "╦"],
    [204, "╠"],
    [205, "═"],
    [206, "╬"],
    [207, "╧"],
    [208, "╨"],
    [209, "╤"],
    [210, "╥"],
    [211, "╙"],
    [212, "╘"],
    [213, "╒"],
    [214, "╓"],
    [215, "╫"],
    [216, "╪"],
    [217, "┘"],
    [218, "┌"],
    [219, "█"],
    [220, "▄"],
    [221, "▌"],
    [222, "▐"],
    [223, "▀"],
    [224, "α"],
    [225, "ß"],
    [226, "Γ"],
    [227, "π"],
    [228, "Σ"],
    [229, "σ"],
    [230, "µ"],
    [231, "τ"],
    [232, "Φ"],
    [233, "Θ"],
    [234, "Ω"],
    [235, "δ"],
    [236, "∞"],
    [237, "φ"],
    [238, "ε"],
    [239, "∩"],
    [240, "≡"],
    [241, "±"],
    [242, "≥"],
    [243, "≤"],
    [244, "⌠"],
    [245, "⌡"],
    [246, "÷"],
    [247, "≈"],
    [248, "°"],
    [249, "∙"],
    [250, "·"],
    [251, "√"],
    [252, "ⁿ"],
    [253, "²"],
    [254, "■"],
    [255, " "]
  ];
  
  const EXT_ASCII_CHARKEY = [
    ["Ç", 128],
    ["ü", 129],
    ["é", 130],
    ["â", 131],
    ["ä", 132],
    ["à", 133],
    ["å", 134],
    ["ç", 135],
    ["ê", 136],
    ["ë", 137],
    ["è", 138],
    ["ï", 139],
    ["î", 140],
    ["ì", 141],
    ["Ä", 142],
    ["Å", 143],
    ["É", 144],
    ["æ", 145],
    ["Æ", 146],
    ["ô", 147],
    ["ö", 148],
    ["ò", 149],
    ["û", 150],
    ["ù", 151],
    ["ÿ", 152],
    ["Ö", 153],
    ["Ü", 154],
    ["¢", 155],
    ["£", 156],
    ["¥", 157],
    ["₧", 158],
    ["ƒ", 159],
    ["á", 160],
    ["í", 161],
    ["ó", 162],
    ["ú", 163],
    ["ñ", 164],
    ["Ñ", 165],
    ["ª", 166],
    ["º", 167],
    ["¿", 168],
    ["⌐", 169],
    ["¬", 170],
    ["½", 171],
    ["¼", 172],
    ["¡", 173],
    ["«", 174],
    ["»", 175],
    ["░", 176],
    ["▒", 177],
    ["▓", 178],
    ["│", 179],
    ["┤", 180],
    ["╡", 181],
    ["╢", 182],
    ["╖", 183],
    ["╕", 184],
    ["╣", 185],
    ["║", 186],
    ["╗", 187],
    ["╝", 188],
    ["╜", 189],
    ["╛", 190],
    ["┐", 191],
    ["└", 192],
    ["┴", 193],
    ["┬", 194],
    ["├", 195],
    ["─", 196],
    ["┼", 197],
    ["╞", 198],
    ["╟", 199],
    ["╚", 200],
    ["╔", 201],
    ["╩", 202],
    ["╦", 203],
    ["╠", 204],
    ["═", 205],
    ["╬", 206],
    ["╧", 207],
    ["╨", 208],
    ["╤", 209],
    ["╥", 210],
    ["╙", 211],
    ["╘", 212],
    ["╒", 213],
    ["╓", 214],
    ["╫", 215],
    ["╪", 216],
    ["┘", 217],
    ["┌", 218],
    ["█", 219],
    ["▄", 220],
    ["▌", 221],
    ["▐", 222],
    ["▀", 223],
    ["α", 224],
    ["ß", 225],
    ["Γ", 226],
    ["π", 227],
    ["Σ", 228],
    ["σ", 229],
    ["µ", 230],
    ["τ", 231],
    ["Φ", 232],
    ["Θ", 233],
    ["Ω", 234],
    ["δ", 235],
    ["∞", 236],
    ["φ", 237],
    ["ε", 238],
    ["∩", 239],
    ["≡", 240],
    ["±", 241],
    ["≥", 242],
    ["≤", 243],
    ["⌠", 244],
    ["⌡", 245],
    ["÷", 246],
    ["≈", 247],
    ["°", 248],
    ["∙", 249],
    ["·", 250],
    ["√", 251],
    ["ⁿ", 252],
    ["²", 253],
    ["■", 254],
    [" ", 255]
  ];
  
  const MAP_EXT_ASCII_CHARKEY = new Map(EXT_ASCII_CHARKEY);
  const MAP_EXT_ASCII_CODEKEY = new Map(EXT_ASCII_CODEKEY);
  
  /**
   * Renvoi le code du caractère en ASCII étendu
   */
  function getExtendedAsciiCodeOf(char) {
    const charCode = char.charCodeAt(0);
    if ((charCode >= 0 && charCode < 32) || charCode === 127) return charCode;
    //`\\x${charCode.toString(16)}`; // To hexa
    else if (charCode >= 32 && charCode < 127) return charCode;
    //return `\\x${charCode.toString(16)}`; // Caractères visibles
    else if (MAP_EXT_ASCII_CHARKEY.has(char))
      return MAP_EXT_ASCII_CHARKEY.get(char);
    // ASCII étendu
    else return null; // Sinon on retourne null
  }
  
  /**
   * Renvoi le charactère correspondant au code en ASCII étendu
   */
  function getExtendedAsciiCharOf(code) {
    code = code % 256;
    if ((code >= 0 && code < 32) || code === 127) {
      let hexaCode = code.toString(16);
      hexaCode = hexaCode.length < 2 ? ( 0 + hexaCode) : hexaCode;
      return `\\x${hexaCode}`;
    } else if (code >= 32 && code < 127) return String.fromCharCode(code);
    else if (MAP_EXT_ASCII_CODEKEY.has(code))
      return MAP_EXT_ASCII_CODEKEY.get(code);
    else return null; // Sinon on retourne null
  }
  
  /**
   * Fonction permettant de traiter les caractères non-visibles d'un message.
   * Exemple : le cryptage de la lettre "o" avec un décalage de 16 est un caractère non-visible.
   * Entrée : Le message sous forme de chaine de caractères.
   * Sortie : Le message sous forme de tableau de caractères avec traitement des caractères héxadécimaux.
   */
  function splitExtASCIIstring(msg) {
    if (msg.includes("\\x")) {
      // Si il y a un caractère non visible dans msg (écrit en hexadécimal donc)
      let tmp = ""; // Stockage temporaire de la valeur hexadécimale (type "\xFF" par exemple)
      let tmpCount = 0; // Compteur pour mémoriser la valeur hexa
      let isTmp = false; // Booléen pour savoir si le caractère courant fait parti d'une expression hexa ou non
  
      let result = []; // Contient le message final sous forme de tableau de caractères
      for (let i = 0; i < msg.length; i++) {
        const c = msg[i]; // caractère courant
        if (c === "\\") {
          // On détecte le début de l'expression régulière
          isTmp = true; // On indique que les prochains caractères sont des caractères hexa
          tmpCount++; // On incrémente le compteur pour l'expression hexa (elle a une taille max de 3 de la forme "xFF" par exemple)
        } else if (isTmp) {
          // Si on est entrain de traiter une expression hexa
          if (tmpCount < 4) {
            // Si on est pas arrivé à la fin de l'expression régulière
            tmp += c; // on mémorise le caractère
            tmpCount++; // On incrémente la taille de l'expression hexa
            if (i === msg.length - 1) result.push(tmp); // Si on arrive à la fin de l'expression, on ajoute tmp au résultat
          } else {
            // Si on est arrivé à la fin de l'expression hexa
            tmpCount = 0; // On reset le compteur
            isTmp = false; // On est plus entrain de traiter une expression hexa
            result.push(tmp); // On ajoute l'expression hexa au résultat
            tmp = ""; // On reset l'expression hexa temporaire
            result.push(c); // On ajoute le caractère courant au résultat
          }
        } else result.push(c); // Si on est pas entrain de traiter une expression hexa, on ajoute le caractère courant au résultat
      }
      return result;
    } else {
      // Si le msg ne contient aucun caractère non visible, on renvoi un tableau de caractères représentant le message
      return msg.split("");
    }
  }
  
  /**
   * Décallage d'un charactère dans la table ASCII étendue
   * Entrée : Le caractère à décaller
   *        : Le décallage (entier positif ou négatif)
   * Sortie : Le nouveau caractère
   */
  function decale(c, decallage) {
    if (c.length > 1) {
      // Si on doit décrypter un caractère hexadécimal
      const hexa = c.substring(1, c.length); // On récupère le code hexa (on enlève le premier caractère)
      const dec = parseInt(hexa, 16); // On converti en décimal
      const newCode = (dec + decallage) % 256; // On récupère le code du caractère décodé
      return getExtendedAsciiCharOf(newCode); // On retourne le caractère décodé
    } else {
      const charCode = getExtendedAsciiCodeOf(c); // On récupère le code du caractère en ASCII étendu
      const newCode = (charCode + decallage) % 256; // On calcul le décalage modulo 256 (taille du ASCII étendu)
      return getExtendedAsciiCharOf(newCode); // On récupère le caractère associé
    }
  }
  
  /**
   * Fonction qui retourne la valeur décimale d'un caractère non-visible exprimé en hexa.
   * Entrée : La chaine de caractère de type xFF représentant la valeur héxadécimale d'un caractère non visible de l'ASCII étendue
   * Sortie : Le code décimal de ce cractère dans la table de l'ASCII étendue
   */
  function hexaToDecimal(nbHexa) {
    const codeHexa = nbHexa.substring(1, nbHexa.length);
    const codeDecimal = parseInt(codeHexa, 16);
    return codeDecimal;
  }
  
  /**
   * Transforme un tableau simple en tableau à 2 dimensions
   */
  function listToMatrix(arr, size) {
    var res = [];
    for (var i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
    return res;
  }
  
  /**
   * Transposition d'une matrice
   * Entrée : Une matrice représentée sous un tableau à 2 dimensions
   * Sortie : La transposée de la matrice donnée représentée sous un tableau à 2 dimensions
   */
  function transposeMatrix(matrix) {
    return matrix[0].map((c, i) => matrix.map(row => row[i]));
  }
  
  export { splitExtASCIIstring, decale, hexaToDecimal, getExtendedAsciiCodeOf, getExtendedAsciiCharOf, indexOf, getAlphabet, getNumbers, getRandomInt, splitToNblocs, listToMatrix, transposeMatrix };