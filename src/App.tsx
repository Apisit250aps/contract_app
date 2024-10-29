import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardLayout from "./layouts/DashboardLayout"
import EmployeePage from "./pages/EmployeePage"
import IndexPage from "./pages/IndexPage"
import NotFound from "./pages/NotFound"
import AuthLayout from "./layouts/AuthLayout"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="employee" element={<EmployeePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)
export default App