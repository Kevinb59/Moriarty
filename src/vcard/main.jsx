import React from "react";
import ReactDOM from "react-dom/client";
import VCardPage from "./VCardPage.jsx";
import "./vcard.css";

// ==========================================================================
// 1) VCARD ENTRYPOINT
// Purpose: Monter la page VCard dans sa propre entrée HTML.
// Key variables: VCardPage, root DOM node.
// Logic flow: createRoot -> render page unique.
// ==========================================================================
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VCardPage />
  </React.StrictMode>
);
