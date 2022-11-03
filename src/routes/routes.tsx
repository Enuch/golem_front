import {
  createBrowserRouter,
} from "react-router-dom";
import { Category } from "../pages/category/Category";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/category",
        element: <Category />,
      },
    ]
  },

]);