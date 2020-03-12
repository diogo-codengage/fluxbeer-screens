import React from "react";

import { animated, useSpring } from "react-spring";

import { useMainContext } from "../Context";

export const Progress = ({ duration = 10000, stop }) => {
  const { styles } = useMainContext();
  const props = useSpring({
    width: "0%",

    from: {
      width: "100%"
    },

    config: {
      duration
    }
  });

  if (stop) return <div style={styles.bgPrimary} className="h-4 w-full" />;

  return (
    <animated.div style={{ ...props, ...styles.bgPrimary }} className="h-4" />
  );
};
