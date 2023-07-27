import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
// wrapping our entire App with the AuthContextProvider to get access to the store values
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
