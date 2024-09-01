import { createBrowserRouter } from "react-router-dom"
import Index from "../pages/Index"
import LoginPage from "../pages/auth/LoginPage"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/auth/login",
    element: <LoginPage />
  }
])

export default router
