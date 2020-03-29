import React from "react";
import CesarForm from "./CardForms/CesarForm";
import AtbashForm from "./CardForms/AtbashForm";
import VigenereForm from "./CardForms/VigenereForm";
import HomophoneForm from "./CardForms/HomophoneForm";
import PlayfairForm from "./CardForms/PlayfairForm";
import HillForm from "./CardForms/HillForm";

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
        return (
          <AtbashForm
            data={data}
            text={text}
            isDecrypting={isDecrypting}
            onTextChange={onTextChange}
            onIsDecryptingChange={onIsDecryptingChange}
            onResult={onResult}
          />
        );

      case 2:
        return (
          <VigenereForm
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
      case 3:
        return (
          <HomophoneForm
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
      case 4:
        return (
          <PlayfairForm
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
      case 5:
        return (
          <HillForm
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
      /*
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
