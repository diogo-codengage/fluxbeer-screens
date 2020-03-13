import React from "react";

import { animated, useTransition } from "react-spring";

import { useMainContext } from "../Context";

export const Footer = ({ visible, footer }) => {
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
      transform: "scale(1.1)"
    }
  });
  const { styles } = useMainContext();

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div key={key} style={props}>
          <div
            className="px-4 py-2 text-white text-xs"
            style={styles.bgSecondary}
            dangerouslySetInnerHTML={{ __html: footer }}
          />
        </animated.div>
      )
  );
};
