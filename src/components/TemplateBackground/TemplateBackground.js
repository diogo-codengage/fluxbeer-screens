import React from "react";

import { Logo } from "./Logo";

import { Title } from "../Title";
import { useMainContext } from "../Context";

const Loading = () => (
  <div className="flex flex-1 items-center justify-center">
    <Title visible>FLUX.BEER</Title>
  </div>
);

const Content = ({ children }) => (
  <>
    <div className="pt-12">
      <Logo />
    </div>
    {children}
  </>
);

export const TemplateBackground = ({ children, loading, onPrev, onNext }) => {
  const {
    config: { assets }
  } = useMainContext();
  return (
    <>
      <div className="flex">
        <button
          onClick={onPrev}
          className="bg-orange placeholder-black::placeholder p-2 rounded-lg mr-4 flex-1"
        >
          prev
        </button>
        <button
          onClick={onNext}
          className="bg-orange placeholder-black::placeholder p-2 rounded-lg flex-1"
        >
          next
        </button>
      </div>
      <div className="app-container w-screen h-screen flex flex-col items-center overflow-hidden">
        <div
          className="bg-image z-0"
          style={{ backgroundImage: `url(${assets.bgImage})` }}
        />
        <div className="flex-1 flex flex-col items-center justify-between w-full z-10">
          {loading ? <Loading /> : <Content children={children} />}
        </div>
      </div>
    </>
  );
};
