import React from "react";

import { animated, useTransition } from "react-spring";

import { useMainContext } from "../Context";

export const Beer = ({ visible }) => {
  const transitions = useTransition(visible, null, {
    from: {
      opacity: 0,
      transform: "scale(1.2) translateX(50px)"
    },

    enter: {
      opacity: 1,
      transform: "scale(1) translateX(0)"
    },

    leave: {
      opacity: 0,
      transform: "scale(1) translateX(-100px)"
    }
  });
  const {
    config: { assets, product }
  } = useMainContext();

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.img
          key={key}
          style={props}
          src={assets.beer}
          alt={product.name}
        />
      )
  );
};
