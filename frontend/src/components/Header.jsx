import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SideBar from "./SideBar"

export default function Header({ name, user }) {
  const navigate = useNavigate()
  const [sideOpen, setSideOpen] = useState(false)

  const safeUser = user ?? { name: "Name", avatarUrl: "" }

  function signOut() {
    localStorage.removeItem("token")
    setSideOpen(false)
    navigate("/")
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <h1 style={{ margin: 0 }}>{name}</h1>

          <button
            type="button"
            onClick={() => setSideOpen(true)}
            style={{
              width: 52,
              height: 52,
              borderRadius: 60,
              border: "1.2px solid #0d4bbf9e",
              backgroundColor: "#ffffff3b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <img
              src="/ProfileButton.png"
              alt="Profile"
              style={{ width: 67, height: 63 }}
            />
          </button>
        </div>

        <div
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#0000002e",
            marginTop: 10
          }}
        />
      </div>

      <SideBar
        open={sideOpen}
        onClose={() => setSideOpen(false)}
        user={safeUser}
        onSignOut={signOut}
      />
    </>
  )
}