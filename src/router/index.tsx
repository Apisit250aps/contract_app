import { createBrowserRouter, RouteObject } from "react-router-dom"
import Index from "../pages/Index"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import ProjectPage from "../pages/projects/ProjectPage"
// import EmployeePage from "../pages/employee/EmployeePage"
import DrawerLayout from "../components/layouts/DrawerLayout"
import { ReactNode } from "react"
import EmployeePage from "../pages/employee/EmployeePage"

// Extend NonIndexRouteObject and IndexRouteObject to include 'name' property
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

export const IndexRouter: RouteObject[] = [
  {
    path: "/",
    name: "index",
    element: <DrawerLayout />,
    children: [
      {
        path: "/",
        element: <Index />,
        name: "Home",
        icon: <i className="bx bx-home-alt" />
      },
      {
        path: "/project",
        element: <ProjectPage />,
        name: "Project",
        icon: <i className="bx bx-briefcase"></i>
      },
      {
        path: "/employee",
        element: <EmployeePage />,
        name: "Employee",
        icon: <i className="bx bx-hard-hat"></i>,
        children: [
          {
            path: "/employee/all",
            element: <EmployeePage />,
            name: "Employee",
            icon: <i className="bx bx-hard-hat"></i>
          }
        ]
      }
    ]
  }
]

export const routerObjects: RouteObject[] = [
  ...IndexRouter,
  {
    path: "auth/login",
    element: <LoginPage />,
    name: "login"
  },
  {
    path: "auth/register",
    element: <RegisterPage />,
    name: "register"
  }
]

const router = createBrowserRouter(routerObjects)

export default router
