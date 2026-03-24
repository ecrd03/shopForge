export default function PopUp({ isOpen, onClose, children, productName }) {
  if (!isOpen) return null

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <button onClick={onClose} style={closeStyle}>
          ✕
        </button>

        <div style={contentWrapperStyle}>
          <div style={contentStyle}>
            {children}
          </div>
        </div>

        <div style={footerStyle}>
          <div style={productNameWrapStyle}>
            <div style={productNameTextStyle}>
              {productName
                ? (productName.length > 22
                  ? productName.slice(0, 22) + "..."
                  : productName)
                : "No product"}
            </div>
          </div>

          <button style={saveButtonStyle}>Save</button>
        </div>
      </div>
    </div>
  )
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
}

const popupStyle = {
  backgroundColor: "#f3f3f3",
  width: "780px",
  minHeight: "560px",
  border: "1px solid #7f8892",
  borderRadius: 4,
  position: "relative",
  boxSizing: "border-box",
  padding: "24px",
  display: "flex",
  flexDirection: "column"
}

const contentStyle = {
  marginTop: 20
}

const footerStyle = {
  marginTop: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16
}

const productNameWrapStyle = {
  flex: 1,
  minWidth: 0
}

const closeStyle = {
  position: "absolute",
  top: "12px",
  right: "14px",
  border: "none",
  background: "transparent",
  fontSize: "22px",
  cursor: "pointer",
  color: "#111827"
}

const saveButtonStyle = {
  padding: "12px 24px",
  borderRadius: 10,
  border: "none",
  backgroundColor: "#d9d9d9",
  color: "#000000",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer"
}

const contentWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%"
}

const productNameTextStyle = {
  fontSize: 25,
  fontWeight: 600,
  color: "#271311",

  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
}