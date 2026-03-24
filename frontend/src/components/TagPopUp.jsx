export default function TagPopUp({
  allShopTags,
  activeTagSection,
  setActiveTagSection,
  activeTagLines,
  tagInput,
  setTagInput,
  onAddTag,
  onRemoveTag,
  onTagInputKeyDown
}) {
  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18
          }}
        >
          <h1 style={{ margin: 0 }}>Tags</h1>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "flex-start"
        }}
      >
        {/* left side */}
        <div style={{ width: 220, flexShrink: 0}}>
          <h3 style={{ marginTop: 16, marginLeft: 19, fontSize: 16, marginBottom: 12 }}>
            Click to add
          </h3>

          <div style={leftTagOuterStyle}>
            <div style={leftTagInnerScrollStyle}>
              {allShopTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onAddTag(tag)}
                  style={tagBubbleStyle}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* right side */}
        <div style={{ width: 480, flexShrink: 0 }}>
          <div style={softTabsRowStyle}>
            <span
              onClick={() => setActiveTagSection("category")}
              style={{
                ...softTabTextStyle,
                ...(activeTagSection === "category"
                  ? softTabActiveStyle
                  : softTabInactiveStyle)
              }}
            >
              Category
            </span>

            <span
              onClick={() => setActiveTagSection("search")}
              style={{
                ...softTabTextStyle,
                ...(activeTagSection === "search"
                  ? softTabActiveStyle
                  : softTabInactiveStyle)
              }}
            >
              Search
            </span>
          </div>

          <div style={rightTagBoxStyle}>
            {activeTagLines.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onRemoveTag(tag)}
                style={selectedTagBubbleStyle}
              >
                #{tag}
              </button>
            ))}

            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={onTagInputKeyDown}
              placeholder="#is300"
              style={tagInlineInputStyle}
            />
          </div>
        </div>
      </div>
      
    </div>
  )
}

const leftTagBoxStyle = {
  width: 160,
  height: 340,
  border: "1px solid #d1d5db",
  borderRadius: 18,
  backgroundColor: "#ffffff",
  overflowY: "auto",
  boxSizing: "border-box",
  padding: 14,
  gap: 0
}

const leftTagOuterStyle = {
  width: 165,
  height: 310,
  border: "1px solid #d1d5db",
  borderRadius: 18,
  overflow: "hidden",
  backgroundColor: "#ffffff",
  padding: 14,
}

const leftTagInnerScrollStyle = {
  height: "100%",
  overflowY: "auto",
  padding: 10,
  display: "flex",
  flexDirection: "column",
  gap: 10
}


const rightTagBoxStyle = {
  border: "1px solid #d1d5db",
  borderRadius: 18,
  backgroundColor: "#ffffff",
  minHeight: 340,
  padding: 14,
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  alignContent: "flex-start",
  boxSizing: "border-box"
}

const tagBubbleStyle = {
  padding: "10px 18px",
  borderRadius: 999,
  border: "1px solid #d1d5db",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500
}

const selectedTagBubbleStyle = {
  padding: "10px 18px",
  borderRadius: 999,
  border: "1px solid #d1d5db",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500
}

const softTabsRowStyle = {
  display: "flex",
  gap: 16,
  marginBottom: 12,
  paddingLeft: 12
}

const softTabTextStyle = {
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  padding: "8px 14px",
  borderRadius: 999,
  border: "1px solid transparent"
}

const softTabInactiveStyle = {
  color: "#6b7280",
  backgroundColor: "transparent"
}

const softTabActiveStyle = {
  color: "#111827",
  backgroundColor: "#ffffff",
  border: "1px solid #d1d5db"
}

const tagInlineInputStyle = {
  border: "none",
  outline: "none",
  fontSize: 14,
  minWidth: 120,
  padding: "10px 4px",
  backgroundColor: "transparent"
}
