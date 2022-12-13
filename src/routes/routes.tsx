import {
  createBrowserRouter,
} from "react-router-dom";
import { RequireAuth } from "../context/auth/RequireAuth";
import { Category } from "../pages/category/Category";
import { CategoryForm } from "../pages/category/CategoryForm";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { Material } from "../pages/material/Material";
import { MaterialForm } from "../pages/material/MaterialForm";
import { Details } from "../pages/request/Details";
import { FormRequest } from "../pages/request/FormRequest";
import { Request } from "../pages/request/Request";
import { User } from "../pages/user/User";
import { UserForm } from "../pages/user/UserForm";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RequireAuth><Home /></RequireAuth>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/category-form",
        element: <CategoryForm />,
      },
      {
        path: "/material",
        element: <Material />,
      },
      {
        path: "/material-form",
        element: <MaterialForm />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/user-form",
        element: <UserForm />,
      },
      {
        path: "/request",
        element: <Request />,
      },
      {
        path: "/form-request",
        element: <FormRequest />,
      },
      {
        path: "/form-request/:id",
        element: <FormRequest />,
      },
      {
        path: "/Details/:id",
        element: <Details />,
      },

    ]
  },
]);