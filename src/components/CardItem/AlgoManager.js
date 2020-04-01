import React from "react";
import CesarForm from "./CardForms/CesarForm";
import AtbashForm from "./CardForms/AtbashForm";
import VigenereForm from "./CardForms/VigenereForm";
import HomophoneForm from "./CardForms/HomophoneForm";
import PlayfairForm from "./CardForms/PlayfairForm";
import HillForm from "./CardForms/HillForm";
import TranspoRectForm from "./CardForms/TranspoRectForm";
import DESForm from "./CardForms/DESForm";
import RSAForm from "./CardForms/RSAForm";

export default function AlgoManager({ data, text, onTextChange, onResult }) {
  const getAlgo = id => {
    switch (id) {
      case 0:
        return (
          <CesarForm
            data={data}
            text={text}
            onTextChange={onTextChange}
            onResult={onResult}
          />
        );

      case 1:
        return (
          <AtbashForm
            data={data}
            text={text}
            onTextChange={onTextChange}
            onResult={onResult}
          />
        );

      case 2:
        return (
          <VigenereForm
            data={data}
            text={text}
            onTextChange={onTextChange}
            onResult={onResult}
          />
        );
      case 3:
        return (
          <HomophoneForm
            data={data}
            text={text}
            onTextChange={onTextChange}
            onResult={onResult}
          />
        );
      case 4:
        return (
          <PlayfairForm
            data={data}
            text={text}
            onTextChange={onTextChange}
            onResult={onResult}
          />
        );
      case 5:
        return (
          <HillForm
            data={data}
            text={text}
            onTextChange={onTextChange}
            onResult={onResult}
          />
        );
      case 6:
        return (
          <TranspoRectForm
            data={data}
            text={text}
            onTextChange={onTextChange}
            onResult={onResult}
          />
        );
      case 7:
        return (
          <DESForm
            data={data}
            text={text}
            onTextChange={onTextChange}
            onResult={onResult}
          />
        );
      case 8:
        return (
          <RSAForm
            data={data}
            text={text}
            onTextChange={onTextChange}
            onResult={onResult}
          />
        );
      default:
        break;
    }
  };

  return getAlgo(data.id);
}
