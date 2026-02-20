import { useState } from "react"

export default function ToggleButton() {
  const [isOn, setIsOn] = useState(true)

  return (
    <div
      onClick={() => setIsOn(prev => !prev)}
      style={{
        width: 80,
        height: 33,
        borderRadius: 40,
        backgroundColor: isOn ? "#6C63FF" : "#C7D1D8",
        display: "flex",
        alignItems: "center",
        padding: 4,
        cursor: "pointer",
        position: "relative",
        transition: "0.3s"
      }}
    >
      {/* Text */}
      <span
        style={{
          position: "absolute",
          left: isOn ? 15 : 45,
          color: "#fff",
          fontWeight: 600,
          fontSize: 17,
          transition: "0.3s"
        }}
      >
        {isOn ? "On" : "Off"}
      </span>

      {/* Circle */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "#fff",
          position: "absolute",
          left: isOn ? 52 : 4,
          transition: "0.3s"
        }}
      />
    </div>
  )
}
