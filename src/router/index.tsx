import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoadComponent } from "@/components/utils";
import { AuthLayout } from "@/layouts";

/**
 * Error Pages
 */
const ErrorPage = LoadComponent(React.lazy(() => import("@/views/ErrorPage")));

/**
 * Auth Pages
 */
const SigninPage = LoadComponent(React.lazy(() => import("@/views/auth/SigninPage")));

const router = createBrowserRouter([
  {
    path: "*",
    element: ErrorPage,
  },
  {
    path: "/",
    element: <Navigate to="/auth/login" />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/signin",
        element: SigninPage,
      },
    ],
  },
]);

export default router;
