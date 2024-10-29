import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardLayout from "./layouts/dashboard.layout"
import IndexPage from "./pages/index.page"

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<>login</>} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<IndexPage />} /> {/* หน้า Dashboard หลัก */}
        {/* <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} /> */}
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
)

export default App
