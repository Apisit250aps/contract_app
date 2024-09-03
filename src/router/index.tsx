import { createBrowserRouter } from "react-router-dom"
import Index from "../pages/Index"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import ProjectPage from "../pages/projects/ProjectPage"
import DrawerLayout from "../components/layouts/DrawerLayout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <DrawerLayout />, // ใช้ Layout
    children: [
      {
        path: "/",
        element: <Index />
      },
      {
        path: "/project",
        element: <ProjectPage />,
      }
    ]
  },
  {
    path: "/auth/login",
    element: <LoginPage />
  },
  {
    path: "/auth/register",
    element: <RegisterPage />
  }
])

export default router
