export default function ToggleButton({ value = false, onChange }) {
  function handleToggle() {
    onChange?.(!value)
  }

  return (
    <div
      onClick={handleToggle}
      style={{
        width: 80,
        height: 33,
        borderRadius: 40,
        backgroundColor: value ? "#6C63FF" : "#C7D1D8",
        display: "flex",
        alignItems: "center",
        padding: 4,
        cursor: "pointer",
        position: "relative",
        transition: "0.3s"
      }}
    >
      <span
        style={{
          position: "absolute",
          left: value ? 15 : 45,
          color: "#fff",
          fontWeight: 600,
          fontSize: 17,
          transition: "0.3s"
        }}
      >
        {value ? "On" : "Off"}
      </span>

      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "#fff",
          position: "absolute",
          left: value ? 52 : 4,
          transition: "0.3s"
        }}
      />
    </div>
  )
}