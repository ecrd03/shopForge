export default function Cell({ children, divider = false, style = {} }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        display: "flex",
        alignItems: "center",
        minWidth: 0,
        borderLeft: divider ? "1px solid #e5e7eb" : "none",
        ...style
      }}
    >
      {children}
    </div>
  )
}