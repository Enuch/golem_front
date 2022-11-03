import {
  createBrowserRouter,
} from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);