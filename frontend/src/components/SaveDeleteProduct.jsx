export default function SaveDeleteProduct({
  isSaved = false,
  showDelete = false,
  onSave,
  onDelete
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10
      }}
    >
      <button
        type="button"
        onClick={onDelete}
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          border: showDelete ? "1px solid #d1d5db" : "1px solid transparent",
          backgroundColor: showDelete ? "#ffffff" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          opacity: showDelete ? 1 : 0,
          pointerEvents: showDelete ? "auto" : "none",
          transition: "0.2s ease"
        }}
      >
        <img
          src="/delete.png"
          alt="Delete"
          style={{ width: 24, height: 24 }}
        />
      </button>

      <button
        type="button"
        onClick={onSave}
        style={{
          height: 44,
          padding: "0 22px",
          borderRadius: 12,
          border: "none",
          backgroundColor: isSaved ? "#2de26f" : "#14dcf2",
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 700,
          cursor: "pointer",
          transition: "0.2s ease"
        }}
      >
        Save
      </button>
    </div>
  )
}