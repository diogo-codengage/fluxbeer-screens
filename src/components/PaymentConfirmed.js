import React from "react";

import { TemplateProcess } from "./TemplateProcess";
import {Success} from './Success'

export const PaymentConfirmed = () => {
  return (
    <TemplateProcess
      title={
        <span>
          Pronto!
          <br /> Seu pagamento foi confirmado.
        </span>
      }
      stop
    >
      <Success />
    </TemplateProcess>
  );
};
