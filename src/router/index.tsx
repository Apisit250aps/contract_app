import { createBrowserRouter, RouteObject } from "react-router-dom"
import Index from "../pages/Index"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import { ReactNode } from "react"
import DrawerLayout from "../components/layouts/DrawerLayout"
import JobListPage from "../pages/job/JobListPage"
import JobCreatePage from "../pages/job/JobCreatePage"
import WorkerListPage from "../pages/worker/WorkerListPage"
import JobDetailPage from "../pages/job/JobDetailPage"
import { jobDetailLoader } from "./loaders/job.loader"

declare module "react-router-dom" {
  interface NonIndexRouteObject {
    name?: string
    icon?: ReactNode | null
    visible?: boolean
  }
  interface IndexRouteObject {
    name?: string
    icon?: ReactNode | null
    visible?: boolean
  }
}

export const contentRouter: RouteObject[] = [
  {
    path: "/",
    element: <DrawerLayout />,
    children: [
      {
        path: "/",
        name: "Home",
        element: <Index />,
        icon: <i className="bx bx-home-alt"></i>
      },
      {
        path: "/jobs",
        name: "Jobs",
        icon: <i className="bx bx-briefcase"></i>,
        children: [
          {
            path: "/jobs/all",
            name: "Job list",
            element: <JobListPage />,
            icon: <i className="bx bx-book"></i>
          },
          {
            path: "/jobs/create",
            name: "New Job",
            element: <JobCreatePage />,
            icon: <i className="bx bx-book-add"></i>
          },
          {
            path: "/jobs/:jobId",
            element: <JobDetailPage />,
            visible: true,
            loader: jobDetailLoader
          }
        ]
      },
      {
        path: "/workers",
        name: "Workers",
        icon: <i className="bx bx-hard-hat"></i>,
        children: [
          {
            path: "/workers",
            name: "Worker List",
            element: <WorkerListPage />,
            icon: <i className="bx bx-book-content"></i>
          },
          
        ]
      }
    ]
  }
]

const router = createBrowserRouter([
  ...contentRouter,
  {
    path: "/auth/login",
    element: <LoginPage />
  },
  {
    path: "auth/register",
    element: <RegisterPage />,
    name: "register"
  }
])
export default router
