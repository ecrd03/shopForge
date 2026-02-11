export default function ShopDashboard() {
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
      <h1 style={{ margin: 0 }}>Shop Dashboard</h1>

      <div
        style={{
          width: "100%",
          height: 2,
          backgroundColor: "#0000002e",
          marginTop: -10
        }}
      />

      {/* header row */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        {/* left side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: 40,
            gap: 40,
            minWidth: 0
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "#8c5ddd",
              flexShrink: 0
            }}
          />

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

        {/* right side buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginRight: 20,
            marginTop: 60
          }}
        >
          {/* link icon button */}
          <button
            type="button"
            onClick={() => window.open("https://www.etsy.com/shop/RedLineApparels", "_blank")}
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
              src="/external-link.png"
              alt="Open link"
              style={{ width: 20, height: 20 }}
            />
          </button>

          {/* edit profile button */}
          <button
            type="button"
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

      <div
        style={{
          width: "100%",
          height: 2,
          backgroundColor: "#373535",
          marginTop: -20
        }}
      />
    </div>
  )
}
