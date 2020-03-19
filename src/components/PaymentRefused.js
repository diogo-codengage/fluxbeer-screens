import React from "react";

import { TemplateProcess } from "./TemplateProcess";
import { LoadingSuccessFail } from "./Animations";

export const PaymentRefused = () => {
  return (
    <TemplateProcess
      title={
        <div className="flex flex-col items-center">
          Negativo!
          <div className="w-7/12">
            Seu pagamento foi recusado pela operadora.
          </div>
        </div>
      }
      stop
    >
      <LoadingSuccessFail range={[656, 824]} />
    </TemplateProcess>
  );
};
