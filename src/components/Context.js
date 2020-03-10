import React, { createContext, useContext, useState, useMemo } from "react";

import logo from "../assets/images/logo.svg";
import bgImage from "../assets/images/bg-2.png";
import beer from "../assets/images/beer.png";

const Context = createContext();

export const useMainContext = () => useContext(Context);

export const defaultConfig = {
  colors: {
    primary: "#FF8500",
    secondary: "#14172C"
  },
  assets: {
    logo,
    bgImage,
    beer
  },
  product: {
    name: "Wee Heavy",
    title: "Que tal provar a nossa Strong Scotch Ale?",
    single: {
      value: 100,
      price: 1.25
    },
    items: [
      {
        title: "Copo 300ml",
        price: 4.5
      },

      {
        title: "Copo 500ml",
        price: 6.5
      }
    ],
    descriptions: [
      {
        type: "BEER",
        title: "Strong Scotch Ale"
      },
      {
        type: "FLAVOR",
        title: "Cítrico leve com notas de sementes de coentro."
      },
      {
        type: "ABV",
        title: "8%"
      },
      {
        type: "IBU",
        title: "0"
      },
      {
        type: "LUPULO"
      },
      {
        type: "PLACE",
        title: "Curitiba, PR"
      }
    ]
  },
  footer:
    "Proibido a venda de bebidas alcoólicas para menores de 18 anos conforme lei 13.106 sancionada em 2015. Se você é menor de 18 anos não tente comprar este produto, pois este estabelecimento está autorizado a recolhe-lo, caso seja constato a infração."
};

export const MainContext = ({ children }) => {
  const [config, setConfig] = useState(defaultConfig);

  const styles = useMemo(
    () => ({
      textPrimary: { color: config.colors.primary },
      textSecondary: { color: config.colors.secondary },
      bgPrimary: { backgroundColor: config.colors.primary },
      bgSecondary: { backgroundColor: config.colors.secondary }
    }),
    [config]
  );

  const value = {
    config,
    setConfig,
    styles
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
