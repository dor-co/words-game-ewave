import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Welcome from "./Welcome";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/game",
    element: <App />,
  },
]);
