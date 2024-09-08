import { createBrowserRouter, RouteObject } from "react-router-dom"
import Index from "../pages/Index"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import { ReactNode } from "react"
import DrawerLayout from "../components/layouts/DrawerLayout"
import JobPage from "../pages/job/JobPage"
import AddJobPage from "../pages/job/AddJobPage"

declare module "react-router-dom" {
  interface NonIndexRouteObject {
    name?: string
    icon?: ReactNode | null
  }
  interface IndexRouteObject {
    name?: string
    icon?: ReactNode | null
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
            path: "/jobs",
            name: "Job list",
            element: <JobPage />,
            icon: <i className="bx bx-book"></i>
          },
          {
            path: "/jobs/create",
            name: "New Job",
            element: <AddJobPage />,
            icon: <i className="bx bx-book-add"></i>
          }
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
