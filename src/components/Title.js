import React, { useMemo } from "react";

import { animated, useTransition } from "react-spring";

import { useMainContext } from "./Context";

export const Title = ({ visible, main, children }) => {
  const transitions = useTransition(visible, null, {
    from: {
      opacity: 0,
      transform: "scale(1.1)"
    },

    enter: {
      opacity: 1,
      transform: "scale(1)"
    },

    leave: {
      opacity: 0,
      transform: "scale(0.9)"
    }
  });
  const { styles } = useMainContext();

  const classes = useMemo(() => {
    return "text-center ".concat(
      main ? "font-bold w-full leading-tight" : "font-medium leading-none"
    );
  }, [main]);

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          style={{
            ...props,
            ...styles.textSecondary,
            fontSize: main ? "4.75rem" : "4rem"
          }}
          className={classes}
        >
          {children}
        </animated.div>
      )
  );
};
