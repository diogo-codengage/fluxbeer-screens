import React from "react";

import errorImage from "../assets/images/err.svg";

import { TemplateProcess } from "./TemplateProcess";
import { useMainContext } from "./Context";

export const Error = () => {
  const { styles } = useMainContext(0);
  return (
    <TemplateProcess
      title={
        <span>
          Torneira desligada
          <div className="font-regular text-4xl mt-5">
            Estamos em manutenção.
          </div>
        </span>
      }
      stop
    >
      <div className="flex flex-col justify-center mt-40">
        <img src={errorImage} alt="Torneira desligada" />
        <div
          className="text-4xl text-center mt-32"
          style={styles.textSecondary}
        >
          Não fique triste, estamos melhorando <br />
          para melhor atendê-lo.
        </div>
      </div>
    </TemplateProcess>
  );
};
