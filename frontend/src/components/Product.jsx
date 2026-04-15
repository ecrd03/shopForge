import ToggleButton from "../components/ToggleButton"
import Cell from "../components/Cell"
import SaveDeleteProduct from "../components/SaveDeleteProduct"

const inputStyle = {
  width: "100%",
  border: "none",
  outline: "none",
  fontSize: 14,
  backgroundColor: "transparent",
  minWidth: 0
}

const popupButtonStyle = {
  padding: "8px 55px",
  borderRadius: 20,
  border: "1px solid #d1d5db",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500
}

export default function Product({
  product,
  onChange,
  isSaved,
  showDelete,
  onSave,
  onDelete,
  onOpenTags,
  onOpenImages,
  onRemoveCategoryTag,
  onRemoveSearchTag
}) {
  const safeProduct = product ?? {
    name: "",
    price: "",
    stock: "",
    categoryTags: [],
    searchTags: [],
    images: [],
    buyingLink: "",
    isActive: true
  }

  const isInactive = safeProduct.isActive === false

  function update(field, value) {
    const updated = { ...safeProduct, [field]: value }
    if (onChange) onChange(updated)
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        opacity: isInactive ? 0.55 : 1,
        transition: "opacity 0.2s ease"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <div style={{ width: 92, display: "flex", justifyContent: "center" }}>
          <ToggleButton
            value={safeProduct.isActive ?? true}
            onChange={(newValue) => update("isActive", newValue)}
          />
        </div>

        <div
          style={{
            flex: 1,
            border: "1px solid #d1d5db",
            borderRadius: 999,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            height: 44
          }}
        >
          <Cell style={{ flex: 2 }}>
            <input
              value={safeProduct.name}
              onChange={(e) => update("name", e.target.value)}
              style={inputStyle}
              placeholder="Name"
            />
          </Cell>

          <Cell divider style={{ flex: 0.7 }}>
            <input
              value={safeProduct.price}
              onChange={(e) => update("price", e.target.value)}
              style={inputStyle}
              placeholder="Price"
            />
          </Cell>

          <Cell divider style={{ flex: 0.7 }}>
            <input
              value={safeProduct.stock}
              onChange={(e) => update("stock", e.target.value)}
              style={inputStyle}
              placeholder="Stock"
            />
          </Cell>
          
          <Cell divider style={{ flex: 1.8 }}>
            <input
              value={safeProduct.buyingLink}
              onChange={(e) => update("buyingLink", e.target.value)}
              style={inputStyle}
              placeholder="Buying Link"
            />
          </Cell>

          <Cell divider style={{ flex: 1.5, justifyContent: "center" }}>
            <button
              type="button"
              onClick={onOpenTags}
              style={popupButtonStyle}
            >
              Tags
            </button>
          </Cell>

          <Cell divider style={{ flex: 1.5, justifyContent: "center" }}>
            <button
              type="button"
              onClick={onOpenImages}
              style={popupButtonStyle}
            >
              Images
            </button>
          </Cell>
        </div>

        <SaveDeleteProduct
          isSaved={isSaved}
          showDelete={showDelete}
          onSave={onSave}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}