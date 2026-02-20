import { useNavigate } from "react-router-dom"

export default function Header({ name }) {
  const navigate = useNavigate()

  return (
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
          onClick={() => navigate("/shopSettings")}
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
  )
}
