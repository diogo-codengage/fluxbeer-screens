import React from "react";

import { TemplateProcess } from "./TemplateProcess";
import { LoadingSuccessFail } from "./Animations";

export const PaymentConfirmed = () => {
  return (
    <TemplateProcess
      title={
        <div className="flex flex-col items-center">
          Pronto!
          <div className="w-3/5">Seu pagamento foi confirmado.</div>
        </div>
      }
      stop
    >
      <LoadingSuccessFail range={[239, 388]} />
    </TemplateProcess>
  );
};
