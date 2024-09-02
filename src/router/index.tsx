import { createBrowserRouter } from "react-router-dom"
import Index from "../pages/Index"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import ProjectListPage from "../pages/projects/ProjectListPage"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/auth/login",
    element: <LoginPage />
  },
  {
    path: "/auth/register",
    element: <RegisterPage />
  },
  {
    path: "/project",
    element: <ProjectListPage />
  }
])

export default router
