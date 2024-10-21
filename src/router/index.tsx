import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoadComponent } from "@/components";
import { AuthLayout, DashboardLayout } from "@/layouts";

/**
 * Error Pages
 */
const ErrorPage = LoadComponent(React.lazy(() => import("@/views/ErrorPage")));

/**
 * Auth Pages
 */
const SigninPage = LoadComponent(React.lazy(() => import("@/views/auth/SigninPage")));
const SignupPage = LoadComponent(React.lazy(() => import("@/views/auth/SignupPage")));

/**
 * Dashboard Pages
 */
const OverviewPage = LoadComponent(React.lazy(() => import("@/views/dashboard/OverviewPage")));

const ManageSectionsPage = LoadComponent(React.lazy(() => import("@/views/dashboard/sections/ManageSectionsPage")));
const SectionFormPage = LoadComponent(React.lazy(() => import("@/views/dashboard/sections/SectionFormPage")));

const ManageLecturesPage = LoadComponent(React.lazy(() => import("@/views/dashboard/lectures/ManageLecturesPage")));
const LectureFormPage = LoadComponent(React.lazy(() => import("@/views/dashboard/lectures/LectureFormPage")));

const ManageStudentsPage = LoadComponent(React.lazy(() => import("@/views/dashboard/students/ManageStudentsPage")));


const router = createBrowserRouter([
  {
    path: "*",
    element: ErrorPage,
  },
  {
    path: "/",
    element: <Navigate to="/auth/signin" />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/signin",
        element: SigninPage,
      },
      {
        path: "/auth/signup",
        element: SignupPage,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/",
        element: OverviewPage,
      },
      {
        path: "/dashboard/manage/sections",
        element: ManageSectionsPage,
      },
      {
        path: "/dashboard/manage/sections/add",
        element: SectionFormPage,
      },
      {
        path: "/dashboard/manage/sections/:id/edit",
        element: SectionFormPage,
      },
      {
        path: "/dashboard/manage/students",
        element: ManageStudentsPage,
      },
      {
        path: "/dashboard/manage/laboratories",
        element: ManageLecturesPage,
      },
      {
        path: "/dashboard/manage/laboratories/add",
        element: LectureFormPage,
      },
      {
        path: "/dashboard/manage/laboratories/:id/edit",
        element: LectureFormPage,
      },
    ],
  },
]);

export default router;
