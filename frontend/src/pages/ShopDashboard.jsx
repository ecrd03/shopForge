import { useNavigate } from "react-router-dom"
import ToggleButton from "../components/ToggleButton"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Product from "../components/Product"


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
      <Header name="Shop Dashboard" />

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
              cursor: "pointer",
              marginTop: 70
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
              border: "none",
              marginTop: 70
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
          height: 1,
          backgroundColor: "#00000073",
          flexShrink: 0,
          position: "relative",
          
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        <SearchBar />


        {/* RIGHT SIDE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18
          }}
        >
          {/* delete Button*/}
          <button
            type="button"
            style={{
              width: 44,
              height: 44,
              borderRadius: 15,
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <img
              src="/delete.png"
              alt="Delete"
              style={{ width: 32, height: 32 }}
            />
          </button>


          <button
            type="button"
            style={{
              padding: "12px 35px",
              fontSize: 16,
              backgroundColor: "#1c85fd",
              color: "#ffffff",
              borderRadius: 50,
              fontWeight: 620,
              cursor: "pointer",
              border: "none",
              whiteSpace: "nowrap"

            }}
          >
            Add Product
          </button>
        </div>
      </div>

      {/* LEFT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20
        }}
      >
        {/* product list */}


        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>


      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18
        }}
      >

      </div>
    </div>

  )
}
