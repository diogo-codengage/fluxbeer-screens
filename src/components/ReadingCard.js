import React from "react";

import { TemplateProcess } from "./TemplateProcess";

export const ReadingCard = () => {
  return (
    <TemplateProcess
      title={
        <span>
          Fazendo a leitura <br /> do identificador…
        </span>
      }
      duration={10000}
    />
  );
};
