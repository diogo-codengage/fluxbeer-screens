import React from "react";

import { Beer } from "./Beer";
import { Title } from "./Title";
import { BeerInfo } from "./BeerInfo";
import { BeerInfos } from "./BeerInfos";
import { Payment } from "./Payment";

import { useMainContext } from "./Context";

import beerIcon from "../assets/icons/beer.svg";
import flavorIcon from "../assets/icons/flavor.svg";
import abvIcon from "../assets/icons/abv.svg";
import ibuIcon from "../assets/icons/ibu.svg";
import lupuloIcon from "../assets/icons/lupulo.svg";
import placeIcon from "../assets/icons/place.svg";

const items = {
  BEER: {
    icon: beerIcon,
    title: "Estilo"
  },
  FLAVOR: { icon: flavorIcon, title: "Tipo de sabor" },
  ABV: { icon: abvIcon, title: "Abv (Teor alcoólico)" },
  IBU: { icon: ibuIcon, title: "Ibu's (Amargura)" },
  LUPULO: { icon: lupuloIcon, title: "Lupulo" },
  PLACE: { icon: placeIcon, title: "Origem" }
};

const renderDescription = (description, index) => (
  <BeerInfo
    key={index}
    icon={items[description.type].icon}
    title={items[description.type].title}
    description={description.title}
  />
);

export const UnauthenticatedScreen = ({ visible, picpay }) => {
  const {
    config: { product, footer, colors }
  } = useMainContext();

  return (
    <>
      <Title visible={visible}>{product.name}</Title>

      <div className="flex flex-1 items-end">
        <div className="flex flex-1 w-full items-start">
          <div className="flex flex-1 justify-end items-end">
            <Beer visible={visible} />
          </div>

          <div className="flex flex-1 flex-col ">
            <BeerInfos visible={visible}>
              {product.descriptions.map(renderDescription)}
            </BeerInfos>

            {picpay && <Payment visible={visible} paymentData={picpay} />}
          </div>
        </div>
      </div>

      <div
        className="px-4 py-2 text-white text-xs"
        style={{ backgroundColor: colors.secondary }}
        dangerouslySetInnerHTML={{ __html: footer }}
      />
    </>
  );
};
