import React from "react";

import beerIcon from "../../assets/icons/beer.svg";
import flavorIcon from "../../assets/icons/flavor.svg";
import abvIcon from "../../assets/icons/abv.svg";
import ibuIcon from "../../assets/icons/ibu.svg";
import lupuloIcon from "../../assets/icons/lupulo.svg";
import placeIcon from "../../assets/icons/place.svg";

import { useMainContext } from "../Context";
import { Title } from "../Title";

import { Beer } from "./Beer";
import { BeerInfo } from "./BeerInfo";
import { BeerInfos } from "./BeerInfos";
import { Payment } from "./Payment";
import { Footer } from "./Footer";

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
    config: { product, footer }
  } = useMainContext();

  return (
    <div className="flex flex-col justify-between">
      <Title main visible={visible}>
        {product.name}
      </Title>

      <div className="mt-12">
        <div className="flex flex-1 items-start">
          <div className="flex flex-1 justify-end items-end">
            <Beer visible={visible} />
          </div>

          <div className="flex flex-1 flex-col justify-between self-stretch">
            <BeerInfos visible={visible}>
              {product.descriptions.map(renderDescription)}
            </BeerInfos>
            <Payment visible={visible} paymentData={picpay} />
          </div>
        </div>

        <Footer footer={footer} visible={visible} />
      </div>
    </div>
  );
};
