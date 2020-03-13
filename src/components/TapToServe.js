import React, { useMemo } from "react";

import { useSpring, animated } from "react-spring";

import { TemplateProcess } from "./TemplateProcess";
import { useMainContext } from "./Context";

import { formatCurrency } from "./UnauthenticatedScreen/Payment";

const AnimatedNumber = ({ value, suffix, ...props }) => {
  const springProps = useSpring({ number: 0, from: { number: value } });
  return (
    <div {...props}>
      <animated.span>{springProps.number}</animated.span>
      {suffix}
    </div>
  );
};

const Consumer = ({ currentMl, textSecondary, textPrimary }) => {
  const { styles } = useMainContext();
  return (
    <div className="flex flex-col items-center mb-16 leading-none">
      <AnimatedNumber
        value={currentMl}
        style={styles.textSecondary}
        className="font-medium font-94"
      />
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
  currentMl = 0,
  balance = 0,
  value = 0,
  percentage = 0,
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

  const footer = useMemo(
    () =>
      !!name ? (
        <Consumer
          currentMl={currentMl}
          textPrimary={formatCurrency(value, true)}
          textSecondary={
            <>
              <div>Saldo: </div>
              <div className="font-bold">{formatCurrency(balance, true)}</div>
            </>
          }
        />
      ) : (
        <Consumer
          currentMl={currentMl}
          textPrimary={`${percentage}%`}
          textSecondary={`de ${currentMl}ml`}
        />
      ),
    [name, balance, currentMl, percentage, value, styles]
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
