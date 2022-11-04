import {
  createBrowserRouter,
} from "react-router-dom";
import { Category } from "../pages/category/Category";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { Material } from "../pages/material/Material";
import { User } from "../pages/user/User";

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
      {
        path: "/material",
        element: <Material />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ]
  },
]);