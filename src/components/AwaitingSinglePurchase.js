import React from "react";

import { TemplateProcess } from "./TemplateProcess";
import { LoadingSuccessFail } from "./Animations";

export const AwaitingSinglePurchase = ({ duration }) => {
  return (
    <TemplateProcess
      title={
        <span>
          Aguardando
          <br />
          compra…
        </span>
      }
      duration={duration}
    >
      <LoadingSuccessFail range={[0, 238]} />
    </TemplateProcess>
  );
};
