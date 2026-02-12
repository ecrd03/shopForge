import { useNavigate } from "react-router-dom"

export default function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        height: "calc(100vh - 60px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 24,
        gap: 24,
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
        <h1 style={{ margin: 0 }}>Admin Dashboard</h1>

        {/* Profile button*/}
        <button
          type="button"
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
          marginTop: -10
        }}
      />

    </div>
  )
}
