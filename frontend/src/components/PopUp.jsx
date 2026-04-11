export default function PopUp({
  isOpen,
  onClose,
  children,
  productName,
  hideFooter = false
}) {
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

        {!hideFooter && (
          <div style={footerStyle}>
            <div style={productNameWrapStyle}>
              <div style={productNameTextStyle}>
                {productName
                  ? productName.length > 22
                    ? productName.slice(0, 22) + "..."
                    : productName
                  : "No product"}
              </div>
            </div>
          </div>
        )}
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
  zIndex: 1000,
  padding: 20,
  boxSizing: "border-box"
}

const popupStyle = {
  backgroundColor: "#f3f3f3",
  width: "900px",
  maxWidth: "calc(100vw - 40px)",
  minHeight: "560px",
  maxHeight: "calc(100vh - 40px)",
  border: "1px solid #7f8892",
  borderRadius: 25,
  position: "relative",
  boxSizing: "border-box",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden"
}

const contentWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  overflow: "hidden"
}

const contentStyle = {
  marginTop: 20,
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  paddingRight: 6
}

const footerStyle = {
  marginTop: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  flexShrink: 0
}

const productNameWrapStyle = {
  flex: 1,
  minWidth: 0
}

const productNameTextStyle = {
  fontSize: 25,
  fontWeight: 600,
  color: "#271311",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
}

const closeStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  border: "none",
  background: "transparent",
  fontSize: "20px",
  cursor: "pointer",
  color: "#111827",
  zIndex: 2
}