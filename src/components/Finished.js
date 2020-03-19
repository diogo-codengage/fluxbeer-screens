import React from "react";

import finishedImage from "../assets/images/finished.svg";

import { TemplateProcess } from "./TemplateProcess";

export const Finished = () => {
  return (
    <TemplateProcess
      title={
        <div className="w-3/5 mx-auto">
          Obrigado por consumir conosco. Volte sempre!
        </div>
      }
      stop
    >
      <div className="flex flex-col justify-center mt-40">
        <img src={finishedImage} alt="Operação concluída" />
      </div>
    </TemplateProcess>
  );
};
