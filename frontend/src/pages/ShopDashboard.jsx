import { useNavigate } from "react-router-dom"

export default function ShopDashboard() {
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
        <h1 style={{ margin: 0 }}>Shop Dashboard</h1>

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
      {/* line dividor*/}
      <div
        style={{
          width: "100%",
          height: 2,
          backgroundColor: "#0000002e"
        }}
      />

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            minWidth: 0
          }}
        >
          {/* icon image*/}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "#8c5ddd",
              flexShrink: 0
            }}
          />
          {/* Shop Name*/}
          <span
            style={{
              fontSize: 37,
              fontWeight: 800,
              whiteSpace: "nowrap"
            }}
          >
            RedLine Apparels
          </span>
        </div>


        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12
          }}
        >
          {/* External Link Button*/}
          <button
            type="button"
            onClick={() =>
              window.open("https://www.etsy.com/shop/RedLineApparels", "_blank")
            }
            style={{
              width: 44,
              height: 44,
              borderRadius: 6,
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <img
              src="/Link.png"
              alt="Open link"
              style={{ width: 28, height: 28 }}
            />
          </button>

          {/* Edit shop Profile Button*/}
          <button
            type="button" onClick={() => navigate("/editShopProfile")}
            style={{
              padding: "12px 20px",
              fontSize: 16,
              backgroundColor: "#28b8fb",
              color: "#ffffff",
              borderRadius: 5,
              fontWeight: 500,
              cursor: "pointer",
              border: "none"
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
      {/* line dividor*/}
      <div
        style={{
          width: "100%",
          height: 2,
          backgroundColor: "#373535"
        }}
      />
    </div>
  )
}
