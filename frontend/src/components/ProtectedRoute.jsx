import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children, allowedRole }) {
    const token = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")

    if (!token || !savedUser) {
        return <Navigate to="/" replace />
    }

    const user = JSON.parse(savedUser)

    if (allowedRole && user.role !== allowedRole) {
        if (user.role === "ADMIN") {
            return <Navigate to="/admin" replace />
        } else {
            return <Navigate to="/shop" replace />
        }
    }

    return children
}