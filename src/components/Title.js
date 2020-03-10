import React from "react";

import { animated, useTransition } from "react-spring";

import { useMainContext } from "./Context";

export const Title = ({ visible, children }) => {
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

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          style={{ ...props, ...styles.textSecondary, fontSize: "4.75rem" }}
          className="font-bold text-7xl w-full text-center leading-tight"
        >
          {children}
        </animated.div>
      )
  );
};
