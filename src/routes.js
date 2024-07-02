import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Welcome from "./Welcome";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/words-game-ewave" />,
  },
  {
    path: "/words-game-ewave",
    element: <Welcome />,
  },
  {
    path: "/game",
    element: <App />,
  },
]);
