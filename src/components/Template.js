import React from "react";

import { Logo } from "./Logo";
import { Title } from "./Title";
import { useMainContext } from "./Context";

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

export const Template = ({ children, loading }) => {
  const {
    config: { assets }
  } = useMainContext();
  return (
    <div className="app-container w-screen h-screen flex flex-col items-center overflow-hidden">
      <div
        className="bg-image z-0"
        style={{ backgroundImage: `url(${assets.bgImage})` }}
      />
      <div className="flex-1 flex flex-col items-center justify-between w-full z-10">
        {loading ? <Loading /> : <Content children={children} />}
      </div>
    </div>
  );
};
