export default function ShopCard({ shop, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        width: 220
      }}
    >
      <div
        style={{
          width: 220,
          height: 220,
          border: "1px solid #d1d5db",
          borderRadius: 20,
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }}
      >
        {shop.logoUrl ? (
          <img
            src={shop.logoUrl}
            alt={shop.name}
            style={{
              width: "70%",
              height: "70%",
              objectFit: "contain"
            }}
          />
        ) : (
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              backgroundColor: "#e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 600,
              color: "#6b7280"
            }}
          >
            {shop.name?.slice(0, 1)?.toUpperCase() || "S"}
          </div>
        )}
      </div>

      <div style={{ marginTop: 10 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 4
          }}
        >
          {shop.name || "No Name"}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#6b7280"
            }}
          >
            {shop.username || "no username"}
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#374151"
            }}
          >
            {shop.productCount ?? 0} products
          </div>
        </div>
      </div>
    </div>
  )
}