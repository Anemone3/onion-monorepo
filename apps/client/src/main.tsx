import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import OnionApp from "./OnionApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OnionApp />
  </StrictMode>,
);
