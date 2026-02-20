export default function SearchBar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20
        }}
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Search"
          style={{
            width: 800,
            padding: "12px 16px",
            borderRadius: 999,
            border: "1px solid #ccc",
            fontSize: 16,
            outline: "none"
          }}
        />

        {/* Filter */}
        <button
          type="button"
          style={{
            padding: "12px 35px",
            fontSize: 16,
            backgroundColor: "#1c85fd",
            color: "#ffffff",
            borderRadius: 50,
            fontWeight: 620,
            cursor: "pointer",
            border: "none"
          }}
        >
          Filter
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18
        }}
      >
        {/* put right-side stuff here */}
      </div>
    </div>
  )
}
