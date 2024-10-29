import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardLayout from "./layouts/DashboardLayout"
import IndexPage from "./pages/IndexPage"
import EmployeePage from "./pages/EmployeePage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<>login</>} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="employee" element={<EmployeePage />} />
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
)
export default App