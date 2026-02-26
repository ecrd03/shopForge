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
        borderRadius: 999,
        border: `1.2px solid ${borderColor}`,
        padding: 0,
        overflow: "hidden",
        cursor: "pointer",
        flexShrink: 0,
        background: `linear-gradient(135deg, ${colorA} 0 50%, ${colorB} 50% 100%)`
      }}
    />
  )
}