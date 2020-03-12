import React from "react";

import { Progress } from "./Progress";

import { Title } from "../Title";

export const TemplateProcess = ({ title, duration, stop, children }) => {
  return (
    <>
      <div className="flex-1 flex flex-col items-center mt-7">
        <Title visible>{title}</Title>
        {children}
      </div>
      <div className="w-full">
        <Progress duration={duration} stop={stop} />
      </div>
    </>
  );
};
