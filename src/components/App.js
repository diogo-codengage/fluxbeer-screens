import "../assets/css/App.css";
import React, { useEffect } from "react";

import { Logo } from "./Logo";
import { Title } from "./Title";
import { Success } from "./Success";
import { BeerPour } from "./BeerPour";
import { UnauthenticatedScreen } from "./UnauthenticatedScreen";

import { useMainContext } from "./Context";

function App() {
  const {
    config: { assets }
  } = useMainContext();
  return (
    <div
      className="app-container w-screen h-screen flex flex-col items-center overflow-hidden"
      style={{ backgroundImage: `url(${assets.bgImage})` }}
    >
      <div className="flex-1 flex flex-col items-center w-full">
        {/* <div className="flex flex-1 items-center justify-center">
          <Title visible>FLUX.BEER</Title>
        </div> */}

        <div className="pt-12">
          <Logo />
        </div>

        <UnauthenticatedScreen visible />

        {/* <BeerPour volume={volume} /> */}
      </div>

      {/* <div className="w-11/12 h-4 bg-orange rounded-tl-full rounded-tr-full"></div> */}
    </div>
  );
}

export default App;
