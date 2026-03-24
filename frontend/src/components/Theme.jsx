export default function Theme({
  colorA,
  colorB,
  size = 50,
  borderColor = "#0d4bbf9e",
  onClick
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `3px solid ${borderColor}`,
        padding: 0,
        overflow: "hidden",
        cursor: "pointer",
        flexShrink: 0,
        appearance: "none",
        WebkitAppearance: "none",
        outline: "none",
        boxShadow: "none",
        backgroundColor: "transparent"
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${colorA} 0 50%, ${colorB} 50% 100%)`
        }}
      />
    </button>
  )
}