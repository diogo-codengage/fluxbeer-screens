import "../assets/css/App.css";
import React from "react";

import { UnauthenticatedScreen } from "./UnauthenticatedScreen";

import { Template } from "./Template";

function App() {
  return (
    <Template>
      <UnauthenticatedScreen visible />
    </Template>
  );
}

export default App;
