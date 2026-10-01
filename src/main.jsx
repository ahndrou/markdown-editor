import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { DocumentSetProvider } from "./contexts/DocumentSetProvider.jsx";
import * as database from "./database";

// Side effect import
import "./twMergeConfig.js";

if (database.isEmpty()) {
  database.initialize();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DocumentSetProvider>
      <App />
    </DocumentSetProvider>
  </StrictMode>,
);
