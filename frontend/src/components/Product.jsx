import ToggleButton from "../components/ToggleButton"
import Cell from "../components/Cell"

const inputStyle = {
  width: "100%",
  border: "none",
  outline: "none",
  fontSize: 14,
  backgroundColor: "transparent",
  minWidth: 0
}

export default function Product({ product, onChange }) {
  const safeProduct = product ?? {
    name: "",
    price: "",
    stock: "",
    tags: "",
    imagesCount: ""
  }

  function update(field, value) {
    const updated = { ...safeProduct, [field]: value }
    if (onChange) onChange(updated)
  }

  return (
    <div style={{ width: "116%", display: "flex", alignItems: "center", gap: 16 }}>
      {/* LEFT: toggle */}
      <div style={{ width: 92, display: "flex", justifyContent: "center" }}>
        <ToggleButton />
      </div>

      {/* RIGHT: pill */}
      <div
        style={{
          flex: 1,
          border: "1px solid #d1d5db",
          borderRadius: 999,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffffff",
          height: 56
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

        <Cell divider style={{ flex: 1 }}>
          <input
            value={safeProduct.price}
            onChange={(e) => update("price", e.target.value)}
            style={inputStyle}
            placeholder="Price"
          />
        </Cell>

        <Cell divider style={{ flex: 1 }}>
          <input
            value={safeProduct.stock}
            onChange={(e) => update("stock", e.target.value)}
            style={inputStyle}
            placeholder="Stock"
          />
        </Cell>

        <Cell divider style={{ flex: 2 }}>
          <input
            value={safeProduct.tags}
            onChange={(e) => update("tags", e.target.value)}
            style={inputStyle}
            placeholder="Tags"
          />
        </Cell>

        <Cell divider style={{ flex: 1.2, justifyContent: "center" }}>
          <input
            value={safeProduct.imagesCount}
            onChange={(e) => update("imagesCount", e.target.value)}
            style={{ ...inputStyle, textAlign: "center" }}
            placeholder="Images"
          />
        </Cell>
      </div>
    </div>
  )
}