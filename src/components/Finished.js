import React from "react";

import finishedImage from "../assets/images/finished.svg";

import { TemplateProcess } from "./TemplateProcess";

export const Finished = () => {
  return (
    <TemplateProcess
      title={
        <span>
          Obrigado por consumir conosco.
          <br /> Volte sempre!
        </span>
      }
      stop
    >
      <div className="flex flex-col justify-center mt-40">
        <img src={finishedImage} alt="Operação concluída" />
      </div>
    </TemplateProcess>
  );
};
