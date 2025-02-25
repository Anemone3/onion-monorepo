import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import OnionApp from "./OnionApp.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <OnionApp />
    </Provider>
  </StrictMode>,
);
