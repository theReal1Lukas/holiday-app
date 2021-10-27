import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { CountriesContextProvider } from "./Context/Countries_context";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./ErrorBoundary";

ReactDOM.render(
  <ErrorBoundary>
    <CountriesContextProvider>
      <App />
    </CountriesContextProvider>
  </ErrorBoundary>,
  document.getElementById("root")
);
