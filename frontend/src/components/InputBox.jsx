import ToggleButton from "./ToggleButton"

export default function InputBox({
  label,
  toggle = false,
  height = 20,
  multiline = false,
  value = "",
  onChange,
  enabled = true,
  onToggleChange
}) {
  const commonStyle = {
    width: "75%",
    height: height,
    padding: "10px 12px",
    borderRadius: 4,
    border: "1px solid #d1d5db",
    outline: "1px solid #c44cf374",
    fontSize: 14,
    opacity: toggle && !enabled ? 0.5 : 1
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%" }}>
      {toggle && (
        <div
          style={{
            width: 90,
            display: "flex",
            justifyContent: "center",
            marginTop: 32
          }}
        >
          <ToggleButton
            value={enabled}
            onChange={() => onToggleChange?.(!enabled)}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          flex: 1
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>
          {label}
        </span>

        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={toggle ? !enabled : false}
            style={commonStyle}
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={toggle ? !enabled : false}
            style={commonStyle}
          />
        )}
      </div>
    </div>
  )
}