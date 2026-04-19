import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import ShopDashboard from "./pages/ShopDashboard"
import CreateAccount from "./pages/CreateAccount"
import EditShop from "./pages/EditShop"
import ShopProfileCard from "./pages/ShopProfileCard"
import ProtectedRoute from "./components/ProtectedRoute"
import Settings from "./pages/Settings"
import ShopForge from "./pages/shopforge"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profilecard"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <ShopProfileCard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shop"
          element={
            <ProtectedRoute allowedRole="SHOP_OWNER">
              <ShopDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editShopProfile"
          element={
            <ProtectedRoute allowedRole="SHOP_OWNER">
              <EditShop />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route path="/shop/:shopName" element={<ShopForge />} />
        
        <Route path="*" element={<div style={{ padding: 24 }}>not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}