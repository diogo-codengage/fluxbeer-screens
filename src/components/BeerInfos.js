import React, { Children } from "react";

import { animated, useTransition } from "react-spring";

const getNumberFromKey = key => parseInt(key.slice(1));

export const BeerInfos = ({ visible, children }) => {
  const infos = Children.toArray(children);

  const transitions = useTransition(visible ? infos : [], item => item.key, {
    from: {
      opacity: 0,
      transform: "translateX(100px)"
    },
    enter: item => async next => {
      await new Promise(resolve =>
        setTimeout(resolve, getNumberFromKey(item.key) * 100)
      );
      await next({
        opacity: 1,
        transform: "translateX(0)"
      });
    },
    leave: item => async next => {
      await new Promise(resolve =>
        setTimeout(resolve, getNumberFromKey(item.key) * 100)
      );
      await next({
        opacity: 0,
        transform: "translateX(100px)"
      });
    }
  });

  return (
    <div className="pl-10">
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          {item}
        </animated.div>
      ))}
    </div>
  );
};
