import { useEffect } from "react"

export default function SideBar({
  open,
  onClose,
  user = { name: "Name", avatarUrl: "" },
  onSignOut
}) {
  // close on ESC
  useEffect(() => {
    if (!open) return
    function onKeyDown(e) {
      if (e.key === "Escape") onClose?.()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.35)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 200ms ease",
          zIndex: 999
        }}
      />

      {/* sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: 320,
          backgroundColor: "#fff",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.15)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 220ms ease",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* top */}
        <div
          style={{
            padding: 20,
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            gap: 12
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ fontSize: 35, color: "#6b7280" }}>
                {user.name?.slice(0, 1)?.toUpperCase() || "U"}
              </div>
            )}
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 600, lineHeight: "20px" }}>
              {user.name || "Name"}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              Account
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              marginLeft: "auto",
              border: "none",
              background: "transparent",
              fontSize: 20,
              cursor: "pointer",
              lineHeight: 1
            }}
            aria-label="Close sidebar"
            title="Close"
          >
            ×
          </button>
        </div>

        {/* middle (empty space for future items) */}
        <div style={{ padding: 20, flex: 1 }} />

        {/* bottom */}
        <div style={{ padding: 20, borderTop: "1px solid #eee" }}>
          <button
            onClick={onSignOut}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 999,
              border: "1px solid #e5e7eb",
              backgroundColor: "#fff",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}