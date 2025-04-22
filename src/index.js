import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CalculContextProvider } from "./hooks/useCalcul";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CalculContextProvider>
      <App />
    </CalculContextProvider>
  </React.StrictMode>
);
