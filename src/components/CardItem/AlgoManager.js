import React from "react";
import CesarForm from "./CardForms/CesarForm";
import AtbashForm from "./CardForms/AtbashForm";

export default function AlgoManager({
  data,
  keyValue,
  text,
  isDecrypting,
  onKeyChange,
  onTextChange,
  onIsDecryptingChange,
  onResult
}) {
  const getAlgo = id => {
    switch (id) {
      case 0:
        return (
          <CesarForm
            data={data}
            keyValue={keyValue}
            text={text}
            isDecrypting={isDecrypting}
            onKeyChange={onKeyChange}
            onTextChange={onTextChange}
            onIsDecryptingChange={onIsDecryptingChange}
            onResult={onResult}
          />
        );

      case 1:
        return (<AtbashForm
          data={data}
          text={text}
          isDecrypting={isDecrypting}
          onTextChange={onTextChange}
          onIsDecryptingChange={onIsDecryptingChange}
          onResult={onResult}
        />);
      /*
            case 2:
              return "Vigenere.js";
            case 3:
              return "Homophone.js";
            case 4:
              return "Playfair.js";
            case 5:
              return "Hill.js";
            case 6:
              return "TranspoRect.js";
            case 7:
              return "DES.js";
              */
      default:
        break;
    }
  };

  return getAlgo(data.id);
}
