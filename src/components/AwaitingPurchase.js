import React from "react";

import { Progress } from "./Progress";
import { Title } from "./Title";

export const AwaitingPurchase = () => {
  return (
    <>
      <div className="flex-1 flex flex-col items-center mt-7">
        <Title visible>Aguardando compra…</Title>
      </div>

      <div className="w-full">
        <Progress duration={10000} />
      </div>
    </>
  );
};
