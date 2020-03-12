import React from "react";

import { TemplateProcess } from "./TemplateProcess";

export const ReadingCard = () => {
  return (
    <TemplateProcess
      title={
        <span>
          Aguarde...
          <div className="font-regular text-4xl mt-5">
            Fazendo a leitura do cartão.
          </div>
        </span>
      }
      duration={10000}
    />
  );
};
