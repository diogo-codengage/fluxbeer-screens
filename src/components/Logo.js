import React from "react";

import { useSpring, animated } from "react-spring";

import { useMainContext } from "./Context";

export const Logo = () => {
  const props = useSpring({
    opacity: 1,
    transform: "scale(1)",

    from: {
      opacity: 0,
      transform: "scale(1.1)"
    },

    config: {
      duration: 600
    }
  });

  const {
    config: { assets }
  } = useMainContext();

  return <animated.img style={props} src={assets.logo} alt="ROWN" />;
};
