import React, { useMemo } from "react";

import { TemplateProcess } from "./TemplateProcess";
import { useMainContext } from "./Context";

import { formatCurrency } from "./UnauthenticatedScreen/Payment";


const Consumer = ({ currentConsumption, textSecondary, textPrimary }) => {
  const { styles } = useMainContext();
  return (
    <div className="flex flex-col items-center mb-16 leading-none">
      <div className="font-medium font-94" style={styles.textSecondary}>
        <span>{currentConsumption}ml</span>
      </div>
      <div style={styles.textSecondary} className="flex items-center text-5xl">
        {textSecondary}
      </div>
      <div style={styles.textPrimary} className="font-medium font-54">
        {textPrimary}
      </div>
    </div>
  );
};

export const TapToServe = ({
  name,
  currentConsumption = 0,
  totalConsumption = 0,
  totalValue = 0,
  currentValue = 0,
  ...props
}) => {
  const { styles } = useMainContext();

  const title = useMemo(
    () =>
      !!name ? (
        <div>
          Olá {name}, puxe a <br />
          torneira para servir.
        </div>
      ) : (
        <span>
          Puxe a torneira <br />
          para servir.
        </span>
      ),
    [name]
  );

  const percentageConsumption = useMemo(
    () => (currentConsumption * 100) / totalConsumption,
    [currentConsumption, totalConsumption]
  );

  const footer = useMemo(
    () =>
      !!name ? (
        <Consumer
          currentConsumption={currentConsumption}
          textPrimary={formatCurrency(currentValue, true)}
          textSecondary={
            <>
              <div>Saldo: </div>
              <div className="font-bold">{formatCurrency(totalValue, true)}</div>
            </>
          }
        />
      ) : (
        <Consumer
          currentConsumption={currentConsumption}
          textSecondary={`de ${totalConsumption}ml`}
          textPrimary={`${percentageConsumption}%`}
        />
      ),
    [name, totalValue, currentValue, currentConsumption, percentageConsumption, styles]
  );

  return (
    <TemplateProcess title={title} {...props}>
      <div className="flex flex-col flex-1 items-center mt-32">
        <div className="flex-1" style={{ color: "#000" }}>
          animation
        </div>
        {footer}
      </div>
    </TemplateProcess>
  );
};
