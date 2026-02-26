import { useState } from "react"
import ToggleButton from "./ToggleButton"
import Cell from "./Cell"

const inputStyle = {
  width: "100%",
  border: "none",
  outline: "none",
  fontSize: 14,
  backgroundColor: "transparent",
  minWidth: 0
}

export default function ProductRow({ onChange }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    tags: "",
    imagesCount: ""
  })

  function update(key, value) {
    const next = { ...product, [key]: value }
    setProduct(next)
    if (onChange) onChange(next)
  }

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #d1d5db",
        borderRadius: 999,
        overflow: "hidden",
        display: "flex",
        alignItems: "stretch",
        backgroundColor: "#ffffff"
      }}
    >
      {/* Toggle */}
      <Cell divider style={{ width: 64, justifyContent: "center" }}>
        <ToggleButton />
      </Cell>

      {/* Name */}
      <Cell divider style={{ flex: 2 }}>
        <input
          value={product.name}
          onChange={(e) => update("name", e.target.value)}
          style={inputStyle}
          placeholder="Name"
        />
      </Cell>

      {/* Price */}
      <Cell divider style={{ flex: 1 }}>
        <input
          value={product.price}
          onChange={(e) => update("price", e.target.value)}
          style={inputStyle}
          placeholder="Price"
        />
      </Cell>

      {/* Stock */}
      <Cell divider style={{ flex: 1 }}>
        <input
          value={product.stock}
          onChange={(e) => update("stock", e.target.value)}
          style={inputStyle}
          placeholder="Stock"
        />
      </Cell>

      {/* Tags */}
      <Cell divider style={{ flex: 2 }}>
        <input
          value={product.tags}
          onChange={(e) => update("tags", e.target.value)}
          style={inputStyle}
          placeholder="Tags"
        />
      </Cell>

      {/* Images */}
      <Cell style={{ width: 110 }}>
        <input
          value={product.imagesCount}
          onChange={(e) => update("imagesCount", e.target.value)}
          style={inputStyle}
          placeholder="Images"
        />
      </Cell>
    </div>
  )
}