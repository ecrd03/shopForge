import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import ShopDashboard from "./pages/ShopDashboard"
import CreateAccount from "./pages/CreateAccount"
import EditShop from "./pages/EditShop"
import ShopProfileCard from "./pages/ShopProfileCard"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/admin" element={<AdminDashboard />} /> 
        <Route path="/ShopProfileCard" element={<ShopProfileCard />} />
        <Route path="/shop" element={<ShopDashboard />} />
        <Route path="/editShopProfile" element={<EditShop />} />
        <Route path="*" element={<div style={{ padding: 24 }}>not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}
