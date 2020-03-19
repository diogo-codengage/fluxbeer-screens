import React, { useRef, useEffect } from "react";

import lottie from "lottie-web";

import animationData from "../../assets/animations/maintenance.json";

export const Maintenance = () => {
  const ref = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      animationData: animationData
    });
    anim.play()
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full">
      <div className="w-4/5" ref={ref} />
    </div>
  );
};
