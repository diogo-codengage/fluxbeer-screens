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
        <span>Olá {name}, puxe a torneira para servir.</span>
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
        <div className="flex flex-col items-center mb-16 leading-none">
          <AnimatedNumber
            value={currentMl}
            style={styles.textSecondary}
            className="font-medium font-94"
          />
          <div
            style={styles.textSecondary}
            className="flex items-center text-5xl"
          >
            <div>Saldo: </div>
            <div className="font-bold">{formatCurrency(balance, true)}</div>
          </div>
          <div style={styles.textPrimary} className="font-medium font-54">
            {formatCurrency(value, true)}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-16 leading-none">
          <AnimatedNumber
            suffix="ml"
            value={currentMl}
            style={styles.textSecondary}
            className="font-medium font-94"
          />
          <div
            style={styles.textSecondary}
            className="flex items-center text-5xl"
          >
            de {currentMl}ml
          </div>
          <div style={styles.textPrimary} className="font-medium font-54">
            {percentage}%
          </div>
        </div>
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
