import ToggleButton from "../components/ToggleButton"
import { useState } from "react"

export default function Product() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [tags, setTags] = useState("")
  const [imagesCount, setImagesCount] = useState("")

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 16
      }}
    >
      {/* LEFT: toggle (outside) */}
      <div
        style={{
          width: 92,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <ToggleButton />
      </div>

      {/* RIGHT: pill row */}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            placeholder="Name"
          />
        </Cell>

        <Cell divider style={{ flex: 1 }}>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
            placeholder="Price"
          />
        </Cell>

        <Cell divider style={{ flex: 1 }}>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            style={inputStyle}
            placeholder="Stock"
          />
        </Cell>

        <Cell divider style={{ flex: 2 }}>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={inputStyle}
            placeholder="Tags"
          />
        </Cell>

        <Cell divider style={{ flex: 1.2, justifyContent: "center" }}>
          <input
            value={imagesCount}
            onChange={(e) => setImagesCount(e.target.value)}
            style={{ ...inputStyle, textAlign: "center" }}
            placeholder="Images"
          />
        </Cell>
      </div>
    </div>
  )
}

function Cell({ children, divider = false, style = {} }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        minWidth: 0,
        height: "100%",
        ...(divider ? { borderLeft: "1px solid #e5e7eb" } : {}),
        ...style
      }}
    >
      {children}
    </div>
  )
}

const inputStyle = {
  width: "100%",
  border: "none",
  outline: "none",
  fontSize: 14,
  backgroundColor: "transparent",
  minWidth: 0
}
