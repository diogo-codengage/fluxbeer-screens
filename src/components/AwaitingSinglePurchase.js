import React from "react";

import { TemplateProcess } from "./TemplateProcess";

export const AwaitingSinglePurchase = ({ duration }) => {
  return <TemplateProcess title="Aguardando compra…" duration={duration} />;
};
