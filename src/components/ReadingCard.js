import React from "react";

import { TemplateProcess } from "./TemplateProcess";
import { LoadingSuccessFail } from "./Animations";

export const ReadingCard = () => {
  return (
    <TemplateProcess
      title={
        <span>
          Fazendo a leitura <br /> do identificador…
        </span>
      }
      duration={10000}
    >
      <LoadingSuccessFail range={[0, 238]} />
    </TemplateProcess>
  );
};
