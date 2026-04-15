import { useState, useEffect } from "react"
import ToggleButton from "./ToggleButton"

const chipStyle = {
    padding: "8px 16px",
    borderRadius: 999,
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40
}

export default function CategoryPopUp({
    allCategoryTags = [],
    initialEnabled = false,
    initialLines = [],
    onSave
}) {
    const [isSaved, setIsSaved] = useState(true)
    const [enabled, setEnabled] = useState(initialEnabled)
    const [showDelete, setShowDelete] = useState(false)
    const [selectedLineIndex, setSelectedLineIndex] = useState(0)
    const [lines, setLines] = useState(
        initialLines.length > 0 ? initialLines : [[]]
    )

    useEffect(() => {
        setEnabled(initialEnabled)
    }, [initialEnabled])

    useEffect(() => {
        setLines(initialLines.length > 0 ? initialLines : [[]])
    }, [initialLines])

    useEffect(() => {
        if (selectedLineIndex > lines.length - 1) {
            setSelectedLineIndex(Math.max(lines.length - 1, 0))
        }
    }, [lines, selectedLineIndex])

    function handleAddLine() {
        setLines((prev) => [...prev, []])
        setSelectedLineIndex(lines.length)
        setIsSaved(false)
    }

    function handleDeleteLine(lineIndexToDelete) {
        setLines((prev) => {
            if (prev.length === 1) return [[]]
            return prev.filter((_, index) => index !== lineIndexToDelete)
        })
        setIsSaved(false)
    }

    function handleAddTagToLine(tag) {
        if (!enabled) return

        setLines((prev) =>
            prev.map((line, index) => {
                if (index !== selectedLineIndex) return line
                if (line.includes(tag)) return line
                return [...line, tag]
            })
        )

        setIsSaved(false)
    }

    function handleRemoveTagFromLine(lineIndex, tagIndex) {
        setLines((prev) =>
            prev.map((line, index) => {
                if (index !== lineIndex) return line
                return line.filter((_, i) => i !== tagIndex)
            })
        )

        setIsSaved(false)
    }

    function handleSave() {
        onSave?.({
            enabled,
            lines
        })
    }

    return (
        <div style={rootStyle}>
            {/* TOP ROW */}
            <div style={topRowStyle}>
                <div style={titleStyle}>Custom Category</div>

                <div style={topControlsStyle}>
                    <button
                        type="button"
                        onClick={() => setShowDelete((prev) => !prev)}
                        style={{
                            ...iconButtonStyle,
                            backgroundColor: showDelete ? "#eef2ff" : "#ffffff"
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
                        onClick={handleAddLine}
                        disabled={!enabled}
                        style={{
                            ...addButtonStyle,
                            backgroundColor: enabled ? "#ffffff" : "#f3f4f6",
                            color: enabled ? "#111111" : "#9ca3af",
                            cursor: enabled ? "pointer" : "not-allowed"
                        }}
                    >
                        Add
                    </button>

                    <ToggleButton
                        value={enabled}
                        onChange={(value) => {
                            setEnabled(value)
                            setIsSaved(false)
                        }}
                    />
                </div>
            </div>

            {/* MAIN AREA */}
            <div style={mainAreaStyle}>
                {/* LEFT SIDE */}
                <div style={leftColumnStyle}>
                    <h3 style={leftHeadingStyle}>Click to add</h3>

                    <div style={leftTagOuterStyle}>
                        <div style={leftTagInnerScrollStyle}>
                            {allCategoryTags.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => handleAddTagToLine(tag)}
                                    disabled={!enabled}
                                    style={{
                                        ...tagBubbleStyle,
                                        cursor: enabled ? "pointer" : "not-allowed",
                                        opacity: enabled ? 1 : 0.6
                                    }}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* MIDDLE + RIGHT SIDE */}
                <div style={rightPanelStyle}>
                    <div style={rightPanelInnerScrollStyle}>
                        {lines.map((line, lineIndex) => (
                            <div key={lineIndex} style={lineWrapStyle}>
                                <div style={lineDeleteSlotStyle}>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteLine(lineIndex)}
                                        style={{
                                            ...lineDeleteButtonStyle,
                                            opacity: showDelete ? 1 : 0,
                                            pointerEvents: showDelete ? "auto" : "none"
                                        }}
                                    >
                                        <img
                                            src="/delete.png"
                                            alt="Delete line"
                                            style={{ width: 20, height: 20 }}
                                        />
                                    </button>
                                </div>

                                <div
                                    onClick={() => setSelectedLineIndex(lineIndex)}
                                    style={{
                                        ...lineRowStyle,
                                        backgroundColor:
                                            selectedLineIndex === lineIndex ? "#f1f5f9" : "transparent"
                                    }}
                                >
                                    <div style={lineNumberStyle}>{lineIndex + 1}</div>

                                    {line.map((tag, tagIndex) => (
                                        <button
                                            key={`${tag}-${tagIndex}`}
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleRemoveTagFromLine(lineIndex, tagIndex)
                                            }}
                                            style={chipStyle}
                                        >
                                            {tag}
                                        </button>
                                    ))}

                                    {line.length === 0 && (
                                        <div style={emptyLineStyle}>empty line</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SAVE */}
            <div style={saveRowStyle}>
                <button
                    type="button"
                    onClick={() => {
                        handleSave()
                        setIsSaved(true)
                    }}
                    style={{
                        padding: "12px 28px",
                        borderRadius: 12,
                        border: "none",
                        backgroundColor: isSaved ? "#2de26f" : "#14dcf2",
                        color: "#ffffff",
                        cursor: "pointer",
                        fontSize: 17,
                        fontWeight: 700,
                        transition: "0.2s ease",
                        marginTop: 9
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

/* layout */

const rootStyle = {
    width: "100%",
    height: "100%",
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    overflow: "hidden",
    marginTop: 20
}

const topRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexShrink: 0
}

const titleStyle = {
    fontSize: 34,
    fontWeight: 700,
    color: "#111111"
}

const topControlsStyle = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginRight: 36,
    flexShrink: 0
}

const iconButtonStyle = {
    width: 44,
    height: 44,
    borderRadius: 12,
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
}

const addButtonStyle = {
    padding: "10px 24px",
    borderRadius: 18,
    border: "1px solid #d1d5db",
    fontSize: 16,
    fontWeight: 600
}

const mainAreaStyle = {
    display: "flex",
    gap: 22,
    alignItems: "flex-start",
    flex: 1,
    minHeight: 0,
    overflow: "hidden"
}

const leftColumnStyle = {
    width: 220,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    minHeight: 0
}

const leftHeadingStyle = {
    marginTop: 12,
    marginLeft: 19,
    fontSize: 16,
    marginBottom: 12,
    flexShrink: 0
}

const saveRowStyle = {
    display: "flex",
    justifyContent: "flex-end",
    flexShrink: 0
}

const saveButtonStyle = {
    padding: "12px 28px",
    borderRadius: 20,
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    fontSize: 17,
    fontWeight: 700
}

/* left side */

const leftTagOuterStyle = {
    width: 210,
    height: 380,
    border: "1px solid #d1d5db",
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    padding: 14,
    boxSizing: "border-box"
}

const leftTagInnerScrollStyle = {
    height: "100%",
    overflowY: "auto",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 7,
    boxSizing: "border-box"
}

const tagBubbleStyle = {
    padding: "10px 18px",
    borderRadius: 999,
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    fontSize: 14,
    fontWeight: 500
}

/* right side */

const rightPanelStyle = {
    flex: 1,
    minWidth: 0,
    height: 380,
    border: "1px solid #d1d5db",
    borderRadius: 18,
    backgroundColor: "#ffffff",
    padding: 14,
    boxSizing: "border-box",
    overflow: "hidden",
    marginTop: 48
}

const rightPanelInnerScrollStyle = {
    height: "100%",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 1,
    paddingRight: 6,
    boxSizing: "border-box"
}

const lineWrapStyle = {
    display: "flex",
    alignItems: "stretch",
    gap: 1,
    flexShrink: 0
}

const lineDeleteSlotStyle = {
    width: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
}

const lineDeleteButtonStyle = {
    width: 40,
    height: 40,
    borderRadius: 12,
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.2s ease"
}

const lineRowStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 7,
    flexWrap: "wrap",
    padding: "10px 8px",
    borderRadius: 12,
    cursor: "pointer",
    minHeight: 20
}

const lineNumberStyle = {
    width: 28,
    fontSize: 18,
    fontWeight: 700,
    color: "#111111"
}

const emptyLineStyle = {
    fontSize: 14,
    color: "#6b7280"
}