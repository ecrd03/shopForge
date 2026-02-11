import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import ShopDashboard from "./pages/ShopDashboard"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/shop" element={<ShopDashboard />} />
        <Route path="*" element={<div style={{ padding: 24 }}>not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}
