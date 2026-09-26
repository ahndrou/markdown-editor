import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import {
  initLocalStorage,
  isStorageInitialized,
} from "./utils/localStorageUtils";

// Side effect import
import "./twMergeConfig.js";

if (!isStorageInitialized()) {
  console.log("initializing");
  initLocalStorage();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
