import { AppRoutes } from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";

function OnionApp() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default OnionApp;
