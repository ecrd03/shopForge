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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <h1 style={{ margin: 0 }}>Edit Shop Profile</h1>

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
            flex: 6,
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

            {/* Shop Name Input*/}
            <input
              type="Enter Shop Name"
              placeholder="Enter Shop Name"
              style={{
                width: 260,
                padding: "12px 16px",
                borderRadius: 999,
                border: "1px solid #ccc",
                fontSize: 16,
                outline: "none"
              }}
            />
          </div>



          Left
        </div>

        {/* right = 40% */}
        <div
          style={{
            flex: 4,
            minWidth: 0
          }}
        >

          <span
            style={{
              fontSize: 37,
              fontWeight: 700,
              whiteSpace: "nowrap"
            }}
          >
            Theme
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 25,
              minWidth: 0
            }}
          >
            {/* Theme #1 */}
            <button
              type="button"
              style={{
                width: 50,
                height: 50,
                borderRadius: 60,
                border: "1.2px solid #0d4bbf9e",
                backgroundColor: "#755ddd",
                flexShrink: 0,
                cursor: "pointer"
              }}
            >
            </button>

            {/* Theme #2 */}
            <button
              type="button"
              style={{
                width: 50,
                height: 50,
                borderRadius: 60,
                border: "1.2px solid #0d4bbf9e",
                backgroundColor: "#5ddd8c",
                flexShrink: 0,
                cursor: "pointer"
              }}
            >
            </button>

            {/* Theme #3 */}
            <button
              type="button"
              style={{
                width: 50,
                height: 50,
                borderRadius: 60,
                border: "1.2px solid #0d4bbf9e",
                backgroundColor: "#efed7a",
                flexShrink: 0,
                cursor: "pointer"
              }}
            >
            </button>

            {/* Theme #4 */}
            <button
              type="button"
              style={{
                width: 50,
                height: 50,
                borderRadius: 60,
                border: "1.2px solid #0d4bbf9e",
                backgroundColor: "#ee3131",
                flexShrink: 0,
                cursor: "pointer"
              }}
            >
            </button>

            {/* Theme #5 */}
            <button
              type="button"
              style={{
                width: 50,
                height: 50,
                borderRadius: 60,
                border: "1.2px solid #0d4bbf9e",
                backgroundColor: "#f58dee",
                flexShrink: 0,
                cursor: "pointer"
              }}
            >
            </button>






            Right
          </div>
        </div>

      </div>
    </div>
  )
}
