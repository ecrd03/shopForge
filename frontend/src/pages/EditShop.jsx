import Divider from "../components/divider"
import Header from "../components/Header"
import InputBox from "../components/InputBox"
import Theme from "../components/Theme"



export default function EditShop() {
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
      <Header name="Edit Shop Profile" />

      {/* split area */}
      <div
        style={{
          display: "flex",
          width: "100%",
          flex: 1,
          gap: 24
        }}
      >
        {/* left = 60% */}
        <div
          style={{
            flex: 5.4,
            borderRight: "1px solid #ddd",
            paddingRight: 16,
            boxSizing: "border-box"
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
            {/* Icon image*/}
            <button
              type="button"
              style={{
                width: 100,
                height: 100,
                borderRadius: 60,
                border: "1.2px solid #0d4bbf9e",
                backgroundColor: "#755ddd",
                flexShrink: 0,
                cursor: "pointer"
              }}
            >
            </button>
            {/* Edit Shop Name */}
            <InputBox label="Enter Shop Name" />

          </div>
          <div style={{ marginTop: 25, display: "flex", flexDirection: "column", width: "106%", gap: 14 }}>

            <InputBox label="Description" multiline height={120} />

          </div>


          <div style={{ marginTop: 30 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>
              Theme
            </span>

            <div
              style={{
                marginTop: 12,
                display: "flex",
                alignItems: "center",
                gap: 22
              }}
            >
              <Theme colorA="#ffffff" colorB="#2d2c2c" />
              <Theme colorA="#000000" colorB="#ffffff" />
              <Theme colorA="#061a9a" colorB="#17b6bc" />
              <Theme colorA="#000000" colorB="#ee4c4c" />
              <Theme colorA="#ffffff" colorB="#f3a0ed" />
              <Theme colorA="#ffffff" colorB="#5162ea" />
              <Theme colorA="#ffffff" colorB="#9e65ef" />
            </div>
          </div>

        </div>

        {/* right = 40% */}
        <div
          style={{
            flex: 4,
            minWidth: 0
          }}
        > <span style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>
            External Links
          </span>

          <div style={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            gap: 5,
            maxHeight: "62vh",
            overflowY: "auto"
          }}>
            <InputBox label="Instagram" toggle />
            <InputBox label="Facebook" toggle />
            <InputBox label="Twitter" toggle />
            <InputBox label="TikTok" toggle />
            <InputBox label="Etsy" toggle />
            <InputBox label="Shopify" toggle />
            <InputBox label="Depop" toggle />
            <InputBox label="Ebay" toggle />
          </div>
        </div>
      </div>

      {/* line dividor*/}
      <Divider />
      
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
          whiteSpace: "nowrap",
          marginTop: -8,
          alignSelf: "flex-end"
        }}
      >
        Save Changes
      </button>




    </div>
  )
}
