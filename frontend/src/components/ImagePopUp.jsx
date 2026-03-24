import { useRef } from "react"

export default function ImagePopUp({ images, onAddImages, onRemoveImage }) {
    const fileInputRef = useRef(null)

    function handleOpenFileExplorer() {
        fileInputRef.current?.click()
    }

    function handleFileChange(e) {
        const files = Array.from(e.target.files || [])
        if (files.length === 0) return

        const newImages = files.map((file, index) => ({
            id: `${Date.now()}-${index}`,
            file,
            preview: URL.createObjectURL(file)
        }))

        onAddImages(newImages)
        e.target.value = ""
    }

    return (
        <div>
            <h2 style={{ marginTop: 0, marginBottom: 18, fontSize: 54, color: "#21354d" }}>
                Images
            </h2>

            <div style={outerBoxStyle}>
                <div style={gridStyle}>
                    {Array.from({ length: 8 }).map((_, index) => {
                        const image = images[index]

                        return (
                            <div key={index} style={imageSlotStyle}>
                                <div style={slotNumberStyle}>{index + 1}</div>

                                {image && (
                                    <>
                                        <img
                                            src={image.preview}
                                            alt={`product-${index + 1}`}
                                            style={imagePreviewStyle}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => onRemoveImage(image.id)}
                                            style={removeButtonStyle}
                                        >
                                            ✕
                                        </button>
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div style={bottomButtonRowStyle}>
                <button type="button" style={smallButtonStyle}>
                    Order
                </button>

                <button
                    type="button"
                    style={smallButtonStyle}
                    onClick={handleOpenFileExplorer}
                >
                    Upload Images
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </div>
    )
}

const outerBoxStyle = {
    width: "100%",
    maxWidth: 800,
    minHeight: 300,
    border: "1px solid #cfd4da",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    padding: 20,
    boxSizing: "border-box",
    justifyContent: "center"
}

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 150px)",
    justifyContent: "space-between",
    rowGap: 12,
    columnGap: 12,
    gap: 18
}

const imageSlotStyle = {
    position: "relative",
    width: "100%",
    aspectRatio: "1 / 1",
    border: "2px solid #5a5a5a",
    backgroundColor: "#f8f8f8",
    overflow: "hidden"
}

const slotNumberStyle = {
    position: "absolute",
    top: 4,
    right: 4,
    width: 14,
    height: 18,
    borderRadius: 4,
    border: "1px solid #7d7d7d",
    backgroundColor: "#ffffff",
    fontSize: 11,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2
}

const imagePreviewStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block"
}

const removeButtonStyle = {
    position: "absolute",
    top: 6,
    left: 6,
    width: 17,
    height: 25,
    borderRadius: "50%",
    border: "1px solid #bfc5cc",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    fontSize: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2
}

const bottomButtonRowStyle = {
    display: "flex",
    gap: 10,
    marginTop: 16
}

const smallButtonStyle = {
    padding: "8px 16px",
    borderRadius: 18,
    border: "1px solid #bfc5cc",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    fontSize: 15
}