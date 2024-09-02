import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
//
import router from "./router/index.tsx"
import "./index.css"
import "./style.css"
import "boxicons/css/boxicons.min.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
