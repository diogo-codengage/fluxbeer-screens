import React from "react";

import { animated, useTransition } from "react-spring";

import { useMainContext } from "./Context";

const format = value => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    currencyDisplay: "symbol"
  });
  return formatter
    .format(value)
    .replace("R$", "")
    .trim();
};

export const Payment = ({ visible }) => {
  const transitions = useTransition(visible, null, {
    from: {
      opacity: 0,
      transform: "scale(1.2) translateX(-50px)"
    },

    enter: {
      opacity: 1,
      transform: "scale(1) translateX(0)"
    },

    leave: {
      opacity: 0,
      transform: "scale(0.8) translateX(100px)"
    }
  });
  const {
    config: { product },
    styles
  } = useMainContext();

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div key={key} style={props}>
          <div
            className="py-4 px-7 font-bold text-white text-2xl rounded-tl-2xl rounded-bl-2xl"
            style={styles.bgSecondary}
          >
            {product.title}
          </div>

          <div className="flex bg-white p-7 rounded-tl-2xl shadow-payment justify-between">
            <div className="flex flex-col flex-1 items-center mr-5">
              <div
                className="font-bold text-lg text-center leading-none"
                style={styles.textPrimary}
              >
                A cada ({product.single.value}ml)
              </div>

              <div className="flex">
                <div className="text-2xl" style={styles.textSecondary}>
                  R$
                </div>
                <div
                  className="text-6xl font-bold leading-none"
                  style={styles.textSecondary}
                >
                  {format(product.single.price)}
                </div>
              </div>

              <div
                className="separator text-base w-full"
                style={styles.textSecondary}
              >
                ou
              </div>

              <div className="flex flex-col flex-1">
                <div
                  className="font-bold text-sm text-center leading-tight mb-3"
                  style={styles.textPrimary}
                >
                  Compre copos avulsos:
                </div>
                <div className="flex items-center justify-between">
                  {product.items.map((item, index) => (
                    <div
                      key={`${index}-item`}
                      className="flex flex-col items-center"
                      style={styles.textSecondary}
                    >
                      <div className="text-xs">{item.title}</div>
                      <div className="text-3xl font-bold leading-tight">
                        {format(item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-1 items-center justify-between">
              <img
                src="https://prixel.files.wordpress.com/2015/09/robalinhopescados-qr-code.png?w=256"
                alt="QRCode"
                style={{ maxWidth: "none" }}
                width={164}
                height={164}
              />
              <div className="text-xs" style={styles.textSecondary}>
                Faça a leitura pelo seu celular.
              </div>
            </div>
          </div>
        </animated.div>
      )
  );
};
