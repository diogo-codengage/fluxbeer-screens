import "../assets/css/App.css";
import React from "react";

import { UnauthenticatedScreen } from "./UnauthenticatedScreen";
import { AwaitingPurchase } from "./AwaitingPurchase";

import { Template } from "./Template";

function App() {
  return (
    <Template>
      {/* <UnauthenticatedScreen visible /> */}
      <AwaitingPurchase />
    </Template>
  );
}

export default App;
