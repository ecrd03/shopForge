import { storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useRef, useState } from "react"

export default function ImagePopUp({
    images,
    onAddImages,
    onRemoveImage,
    onSetCoverImage
}) {
    const fileInputRef = useRef(null)
    const [uploading, setUploading] = useState(false)
    const [isChoosingCover, setIsChoosingCover] = useState(false)

    function handleOpenFileExplorer() {
        if (uploading) return
        fileInputRef.current?.click()
    }

    function handleChooseCover(imageId) {
        if (!isChoosingCover) return

        onSetCoverImage?.(imageId)
        setIsChoosingCover(false)
    }




    async function handleFileChange(e) {
        const files = Array.from(e.target.files || [])
        if (files.length === 0) return

        try {
            setUploading(true)

            const uploadedImages = await Promise.all(
                files.map(async (file, index) => {
                    const path = `product-images/${Date.now()}-${index}-${file.name}`
                    const imageRef = ref(storage, path)

                    await uploadBytes(imageRef, file)
                    const url = await getDownloadURL(imageRef)

                    return {
                        id: `${Date.now()}-${index}`,
                        preview: url,
                        url,
                        path
                    }
                })
            )

            onAddImages(uploadedImages)
        } catch (error) {
            console.error("Image upload failed:", error)
            alert("Image upload failed")
        } finally {
            setUploading(false)
            e.target.value = ""
        }
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
                            <div
                                key={index}
                                style={{
                                    ...imageSlotStyle,
                                    cursor: image && isChoosingCover ? "pointer" : "default",
                                    outline: image && isChoosingCover ? "3px solid #fbbf24" : "none"
                                }}
                                onClick={() => image && handleChooseCover(image.id)}
                            >
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
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onRemoveImage(image)
                                            }}
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
                <button
                    type="button"
                    onClick={() => setIsChoosingCover((prev) => !prev)}
                    style={{
                        ...smallButtonStyle,
                        backgroundColor: isChoosingCover ? "#fef3c7" : "#ffffff",
                        border: isChoosingCover ? "1px solid #f59e0b" : "1px solid #bfc5cc"
                    }}
                >
                    {isChoosingCover ? "Pick Cover" : "Star"}
                </button>
                <button
                    type="button"
                    style={{
                        ...smallButtonStyle,
                        opacity: uploading ? 0.7 : 1,
                        cursor: uploading ? "default" : "pointer"
                    }}
                    onClick={handleOpenFileExplorer}
                >
                    {uploading ? "Uploading..." : "Upload Images"}
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