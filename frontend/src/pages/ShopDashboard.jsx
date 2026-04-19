import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Product from "../components/Product"
import PopUp from "../components/PopUp"
import TagPopUp from "../components/TagPopUp"
import ImagePopUp from "../components/ImagePopUp"
import CategoryPopUp from "../components/CategoryPopUp"
import { storage } from "../firebase"
import { ref, deleteObject } from "firebase/storage"
import { useState, useEffect, useMemo, useRef } from "react"
const API_BASE = import.meta.env.VITE_API_BASE_URL || ""





export default function ShopDashboard() {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [deleteMode, setDeleteMode] = useState(false)

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [filterOption, setFilterOption] = useState("newest")

  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [popUpMode, setPopUpMode] = useState("")
  const [popUpProductName, setPopUpProductName] = useState("")
  const [activeProductIndex, setActiveProductIndex] = useState(null)
  const [activeTagSection, setActiveTagSection] = useState("category")
  const [tagInput, setTagInput] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))
  const shopId = user?.shopId

  const [shop, setShop] = useState(null)
  const [loadingShop, setLoadingShop] = useState(true)

  const [allShopTags, setAllShopTags] = useState({
    category: [],
    search: []
  })
  const tempIdRef = useRef(0)

  function makeTempId() {
    tempIdRef.current += 1
    return `temp-${Date.now()}-${tempIdRef.current}`
  }

  const [customCategoryEnabled, setCustomCategoryEnabled] = useState(false)
  const [customCategoryLines, setCustomCategoryLines] = useState([])

  useEffect(() => {
    async function loadProducts() {
      if (!shopId) return

      const response = await fetch(`${API_BASE}/api/products/shop/${shopId}`)

      let data = []

      try {
        data = await response.json()
      } catch (e) {
        console.error("failed to parse products response", e)
      }

      console.log("products response:", data)

      if (!Array.isArray(data)) {
        console.error("expected array but got:", data)
        setProducts([])
        return
      }

      const formattedProducts = data.map((product) => ({
        ...product,
        tempId: `db-${product.id}`,
        categoryTags: product.categoryTags || [],
        searchTags: product.searchTags || [],
        images: (product.images || []).map((image, index) => {
          if (typeof image === "string") {
            return {
              id: `${product.id || "product"}-image-${index}`,
              preview: image,
              url: image,
              path: ""
            }
          }

          return {
            id: image.id || `${product.id || "product"}-image-${index}`,
            preview: image.preview || image.url || "",
            url: image.url || "",
            path: image.path || ""
          }
        }),
        buyingLink: product.buyingLink || "",
        isActive: product.isActive ?? true,
        isSaved: true
      }))

      const categoryTagSet = new Set()
      const searchTagSet = new Set()

      formattedProducts.forEach((product) => {
        ; (product.categoryTags || []).forEach((tag) => categoryTagSet.add(tag))
          ; (product.searchTags || []).forEach((tag) => searchTagSet.add(tag))
      })

      setAllShopTags({
        category: Array.from(categoryTagSet),
        search: Array.from(searchTagSet)
      })

      setProducts(formattedProducts)
    }
    loadProducts()
  }, [shopId])


  useEffect(() => {
    async function loadShop() {
      if (!shopId) {
        setLoadingShop(false)
        setCustomCategoryEnabled(false)
        setCustomCategoryLines([])
        return
      }

      try {
        const response = await fetch(`${API_BASE}/api/shops/${shopId}`)
        if (!response.ok) {
          throw new Error("Failed to load shop")
        }

        const data = await response.json()
        setShop(data)

        setCustomCategoryEnabled(data.customCategoryEnabled ?? false)

        const parsedLines =
          data.customCategoryLines && data.customCategoryLines.trim() !== ""
            ? JSON.parse(data.customCategoryLines)
            : []

        setCustomCategoryLines(parsedLines)
      } catch (error) {
        console.error("Error loading shop:", error)
        setCustomCategoryEnabled(false)
        setCustomCategoryLines([])
      } finally {
        setLoadingShop(false)
      }
    }

    loadShop()
  }, [shopId])

  function handleSetCoverImage(imageId) {
    if (activeProductIndex === null) return

    const updatedProducts = [...products]
    const currentProduct = updatedProducts[activeProductIndex]
    const currentImages = [...(currentProduct.images || [])]

    const clickedIndex = currentImages.findIndex((image) => image.id === imageId)
    if (clickedIndex <= 0) return

      ;[currentImages[0], currentImages[clickedIndex]] = [currentImages[clickedIndex], currentImages[0]]

    updatedProducts[activeProductIndex] = {
      ...currentProduct,
      images: currentImages,
      isSaved: false
    }

    setProducts(updatedProducts)
  }



  async function handleSaveCustomCategory({ enabled, lines }) {
    if (!shopId) return

    try {
      const response = await fetch(`${API_BASE}/api/shops/${shopId}/custom-category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          enabled,
          lines
        })
      })

      if (!response.ok) {
        throw new Error("Failed to save custom category")
      }

      const savedData = await response.json()

      setCustomCategoryEnabled(savedData.enabled ?? false)
      setCustomCategoryLines(savedData.lines ?? [])
    } catch (error) {
      console.error("Error saving custom category:", error)
    }
  }
  async function handleSaveProduct(product, index) {
    const latestProduct = products[index] || product
    const updatedProducts = [...products]

    const productToSave = {
      shopId: Number(shopId),

      name: latestProduct.name || "",

      price: Number(latestProduct.price) || 0,
      stock: Number(latestProduct.stock) || 0,

      categoryTags: Array.isArray(latestProduct.categoryTags)
        ? latestProduct.categoryTags
        : [],

      searchTags: Array.isArray(latestProduct.searchTags)
        ? latestProduct.searchTags
        : [],

      images: Array.isArray(latestProduct.images)
        ? latestProduct.images.map((image, imageIndex) => ({
          id: image.id || `${latestProduct.id || "product"}-image-${imageIndex}`,
          preview: image.preview || image.url || "",
          url: image.url || image.preview || "",
          path: image.path || ""
        }))
        : [],

      buyingLink: latestProduct.buyingLink || "",

      isActive: latestProduct.isActive ?? true
    }

    const isEditingExistingProduct = latestProduct.id != null

    console.log("SENDING PRODUCT:", productToSave)
    console.log("IS EDIT:", isEditingExistingProduct)
    console.log("URL:",
      isEditingExistingProduct
        ? `${API_BASE}/api/products/${latestProduct.id}`
        : `${API_BASE}/api/products`
    )

    try {
      const response = await fetch(
        isEditingExistingProduct
          ? `${API_BASE}/api/products/${latestProduct.id}`
          : `${API_BASE}/api/products`,
        {
          method: isEditingExistingProduct ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(productToSave)
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.log("save product error:", errorText)
        throw new Error(errorText || "Failed to save product")
      }

      const savedProduct = await response.json()

      updatedProducts[index] = {
        ...updatedProducts[index],
        ...savedProduct,
        buyingLink: savedProduct.buyingLink || productToSave.buyingLink || "",
        tempId: updatedProducts[index].tempId || `db-${savedProduct.id}`,
        images: (savedProduct.images || productToSave.images).map((image, imageIndex) => {
          if (typeof image === "string") {
            return {
              id: `${savedProduct.id || index}-image-${imageIndex}`,
              preview: image,
              url: image,
              path: ""
            }
          }

          return {
            id: image.id || `${savedProduct.id || index}-image-${imageIndex}`,
            preview: image.preview || image.url || "",
            url: image.url || "",
            path: image.path || ""
          }
        }),
        isSaved: true
      }

      setProducts(updatedProducts)
    } catch (error) {
      console.error("Error saving product:", error)
    }
  }

  async function handleDeleteProduct(product, index) {
    try {
      if (product.id != null) {
        const response = await fetch(`${API_BASE}/api/products/${product.id}`, {
          method: "DELETE"
        })

        if (!response.ok) {
          throw new Error("Failed to delete product")
        }
      }

      setProducts((prev) =>
        prev.filter((item, i) => {
          if (i === index) return false

          if (product.id != null) {
            return item.id !== product.id
          }

          return item.tempId !== product.tempId
        })
      )
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  function openPopUp(mode, index = null, productName = "") {
    setPopUpMode(mode)
    setActiveProductIndex(index)
    setPopUpProductName(productName)
    setTagInput("")

    if (mode === "tags") {
      setActiveTagSection("category")
    }

    setIsPopUpOpen(true)
  }

  const activeProduct =
    activeProductIndex !== null ? products[activeProductIndex] : null

  const activeTagLines =
    popUpMode === "tags" && activeProduct
      ? activeTagSection === "category"
        ? (activeProduct.categoryTags || [])
        : (activeProduct.searchTags || [])
      : []

  const sourceTags =
    activeTagSection === "category"
      ? allShopTags.category
      : allShopTags.search

  const currentSectionTags =
    activeProduct
      ? activeTagSection === "category"
        ? (activeProduct.categoryTags || [])
        : (activeProduct.searchTags || [])
      : []

  const availableShopTags = sourceTags.filter(
    (tag) => !currentSectionTags.includes(tag)
  )

  function normalizeTag(tag) {
    return tag
      .trim()
      .replace(/^#+/, "")
      .replaceAll("_", " ")
      .trim()
  }

  function handleAddTag(tag) {
    if (activeProductIndex === null) return

    const cleanedTag = normalizeTag(tag)
    if (!cleanedTag) return

    const updatedProducts = [...products]
    const currentProduct = updatedProducts[activeProductIndex]

    const tagField =
      activeTagSection === "category" ? "categoryTags" : "searchTags"

    const currentTags = currentProduct[tagField] || []

    if (!currentTags.includes(cleanedTag)) {
      updatedProducts[activeProductIndex] = {
        ...currentProduct,
        [tagField]: [...currentTags, cleanedTag],
        isSaved: false
      }

      setProducts(updatedProducts)
    }

    setAllShopTags((prev) => {
      const key = activeTagSection === "category" ? "category" : "search"
      const currentList = prev[key] || []

      if (currentList.includes(cleanedTag)) return prev

      return {
        ...prev,
        [key]: [...currentList, cleanedTag]
      }
    })
  }

  function handleRemoveTag(tagToRemove) {
    if (activeProductIndex === null) return

    const updatedProducts = [...products]
    const currentProduct = updatedProducts[activeProductIndex]
    const tagField = activeTagSection === "category" ? "categoryTags" : "searchTags"

    updatedProducts[activeProductIndex] = {
      ...currentProduct,
      [tagField]: (currentProduct[tagField] || []).filter(
        (tag) => tag !== tagToRemove
      ),
      isSaved: false
    }

    setProducts(updatedProducts)
  }

  function handleTagInputKeyDown(e) {
    if (e.key !== "Enter" && e.key !== ",") return

    e.preventDefault()

    const cleanedTag = normalizeTag(tagInput)
    if (!cleanedTag) return

    handleAddTag(cleanedTag)
    setTagInput("")
  }

  function handleAddImages(newImages) {
    if (activeProductIndex === null) return

    const updatedProducts = [...products]
    const currentProduct = updatedProducts[activeProductIndex]
    const currentImages = currentProduct.images || []

    updatedProducts[activeProductIndex] = {
      ...currentProduct,
      images: [...currentImages, ...newImages].slice(0, 8),
      isSaved: false
    }

    setProducts(updatedProducts)
  }

  async function handleRemoveImage(imageToRemove) {
    if (activeProductIndex === null) return

    try {
      if (imageToRemove.path) {
        const imageRef = ref(storage, imageToRemove.path)
        await deleteObject(imageRef)
      }

      const updatedProducts = [...products]
      const currentProduct = updatedProducts[activeProductIndex]

      updatedProducts[activeProductIndex] = {
        ...currentProduct,
        images: currentProduct.images.filter((image) => image.id !== imageToRemove.id),
        isSaved: false
      }

      setProducts(updatedProducts)
    } catch (error) {
      console.error("Error deleting image:", error)
      alert("Failed to delete image")
    }
  }

  const displayedProducts = useMemo(() => {
    let filtered = [...products]

    const trimmedSearch = searchTerm.trim().toLowerCase()

    if (trimmedSearch !== "") {
      filtered = filtered.filter((product) => {
        const nameMatch = (product.name || "")
          .toLowerCase()
          .includes(trimmedSearch)

        const categoryMatch = (product.categoryTags || []).some((tag) =>
          (tag || "").toLowerCase().includes(trimmedSearch)
        )

        const searchTagMatch = (product.searchTags || []).some((tag) =>
          (tag || "").toLowerCase().includes(trimmedSearch)
        )

        return nameMatch || categoryMatch || searchTagMatch
      })
    }

    switch (filterOption) {
      case "isActive":
        filtered.sort((a, b) => Number(b.isActive) - Number(a.isActive))
        break

      case "notActive":
        filtered.sort((a, b) => Number(a.isActive) - Number(b.isActive))
        break

      case "newest":
        filtered.sort((a, b) => {
          if (a.id == null && b.id == null) return 0
          if (a.id == null) return -1
          if (b.id == null) return 1
          return b.id - a.id
        })
        break

      case "oldest":
        filtered.sort((a, b) => {
          if (a.id == null && b.id == null) return 0
          if (a.id == null) return 1
          if (b.id == null) return -1
          return a.id - b.id
        })
        break

      case "az":
        filtered.sort((a, b) =>
          (a.name || "").localeCompare(b.name || "", undefined, {
            sensitivity: "base"
          })
        )
        break

      case "za":
        filtered.sort((a, b) =>
          (b.name || "").localeCompare(a.name || "", undefined, {
            sensitivity: "base"
          })
        )
        break

      case "priceHighLow":
        filtered.sort((a, b) => Number(b.price || 0) - Number(a.price || 0))
        break

      case "priceLowHigh":
        filtered.sort((a, b) => Number(a.price || 0) - Number(b.price || 0))
        break

      case "stockHighLow":
        filtered.sort((a, b) => Number(b.stock || 0) - Number(a.stock || 0))
        break

      case "stockLowHigh":
        filtered.sort((a, b) => Number(a.stock || 0) - Number(b.stock || 0))
        break

      default:
        break
    }

    return filtered
  }, [products, searchTerm, filterOption])

  return (
    <div
      style={{
        height: "calc(100vh - 60px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 24,
        gap: 24,
        boxSizing: "border-box"
      }}
    >
      <Header
        name="Shop Dashboard"
        user={{
          name: user?.name || user?.email || "Profile",
          avatarUrl: shop?.logoUrl || ""
        }}
        onSignOut={() => {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          navigate("/login")
        }}
      />

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            minWidth: 0
          }}
        >
          <img
            src={
              shop?.logoUrl && shop.logoUrl.trim() !== ""
                ? shop.logoUrl
                : "/ProfileEmptyIcon.png"
            }
            alt={shop?.name || "Shop logo"}
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0
            }}
          />

          <span
            style={{
              fontSize: 37,
              fontWeight: 800,
              whiteSpace: "nowrap"
            }}
          >
            {loadingShop ? "Loading..." : shop?.name || "My Shop"}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12
          }}
        >
          <button
            type="button"
            onClick={() => {
              const username = user?.username || `shop${shopId}`
              window.open(`/shop/${username}`, "_blank")
            }}
            style={{
              width: 44,
              height: 44,
              borderRadius: 6,
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              marginTop: 70
            }}
          >
            <img
              src="/Link.png"
              alt="Open link"
              style={{ width: 28, height: 28 }}
            />
          </button>

          <button
            type="button"
            onClick={() => navigate("/editShopProfile")}
            style={{
              padding: "12px 20px",
              fontSize: 16,
              backgroundColor: "#28b8fb",
              color: "#ffffff",
              borderRadius: 5,
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              marginTop: 70
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "#00000073",
          flexShrink: 0,
          position: "relative"
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: 16,
          flexWrap: "wrap"
        }}
      >
        {/* LEFT SIDE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flex: .87,
            minWidth: 280
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            style={{
              flex: 1,
              height: 44,
              borderRadius: 50,
              border: "1px solid #d1d5db",
              padding: "0 14px",
              fontSize: 15,
              outline: "none",
              backgroundColor: "#ffffff"
            }}
          />

          {/* FILTER BUTTON */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              style={{
                height: 44,
                width: 120,
                padding: "0 20px",
                borderRadius: 50,
                border: "none",
                backgroundColor: "#1c85fd",
                color: "#ffffff",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Filter
            </button>

            {isFilterOpen && (
              <div
                style={{
                  position: "absolute",
                  top: 52,
                  right: 0,
                  width: 220,
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  borderRadius: 12,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  zIndex: 10
                }}
              >
                {[
                  { label: "Is Active", value: "isActive" },
                  { label: "Not Active", value: "notActive" },
                  { label: "Newest", value: "newest" },
                  { label: "Oldest", value: "oldest" },
                  { label: "A-Z", value: "az" },
                  { label: "Z-A", value: "za" },
                  { label: "Price Highest - Lowest", value: "priceHighLow" },
                  { label: "Price Lowest - Highest", value: "priceLowHigh" },
                  { label: "Stock Highest - Lowest", value: "stockHighLow" },
                  { label: "Stock Lowest - Highest", value: "stockLowHigh" }
                ].map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setFilterOption(option.value)
                      setIsFilterOpen(false)
                    }}
                    style={{
                      padding: "10px 14px",
                      cursor: "pointer",
                      fontSize: 14,
                      borderBottom: "1px solid #f1f1f1"
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexShrink: 0
          }}
        >
          <button
            type="button"
            onClick={() => openPopUp("customCategory")}
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <img src="/category.png" style={{ width: 40, height: 40 }} />
          </button>

          <button
            type="button"
            onClick={() => setDeleteMode(!deleteMode)}
            style={{
              width: 44,
              height: 44,
              borderRadius: 15,
              border: "1px solid #d1d5db",
              backgroundColor: deleteMode ? "#eef2ff" : "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <img src="/delete.png" style={{ width: 32, height: 32 }} />
          </button>

          <button
            type="button"
            onClick={() =>
              setProducts([
                ...products,
                {
                  tempId: makeTempId(),
                  shopId: shopId,
                  name: "",
                  price: "",
                  stock: "",
                  categoryTags: [],
                  searchTags: [],
                  images: [],
                  buyingLink: "",
                  isActive: true,
                  isSaved: false
                }
              ])
            }
            style={{
              padding: "12px 35px",
              fontSize: 16,
              backgroundColor: "#1c85fd",
              color: "#ffffff",
              borderRadius: 50,
              fontWeight: 620,
              cursor: "pointer",
              border: "none",
              whiteSpace: "nowrap"
            }}
          >
            Add Product
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {displayedProducts.map((product) => {
            const index = products.findIndex(
              (p) =>
                (p.id != null && p.id === product.id) ||
                (p.id == null && p.tempId === product.tempId)
            )

            if (index === -1) return null

            return (
              <Product
                key={product.id ?? product.tempId}
                product={product}
                isSaved={product.isSaved}
                showDelete={deleteMode}
                onChange={(updatedProduct) => {
                  const updatedProducts = [...products]
                  updatedProducts[index] = {
                    ...updatedProduct,
                    isSaved: false
                  }
                  setProducts(updatedProducts)
                }}
                onSave={() => handleSaveProduct(products[index], index)}
                onDelete={() => handleDeleteProduct(product, index)}
                onOpenTags={() => openPopUp("tags", index, product.name)}
                onOpenImages={() => openPopUp("images", index, product.name)}
                onRemoveCategoryTag={(tagToRemove) => {
                  const updatedProducts = [...products]
                  const currentProduct = updatedProducts[index]

                  updatedProducts[index] = {
                    ...currentProduct,
                    categoryTags: (currentProduct.categoryTags || []).filter(
                      (tag) => tag !== tagToRemove
                    ),
                    isSaved: false
                  }

                  setProducts(updatedProducts)
                }}
                onRemoveSearchTag={(tagToRemove) => {
                  const updatedProducts = [...products]
                  const currentProduct = updatedProducts[index]

                  updatedProducts[index] = {
                    ...currentProduct,
                    searchTags: (currentProduct.searchTags || []).filter(
                      (tag) => tag !== tagToRemove
                    ),
                    isSaved: false
                  }

                  setProducts(updatedProducts)
                }}
              />
            )
          })}
          <div style={{ marginTop: 20 }} />
        </div>

      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18
        }}
      />

      <PopUp
        isOpen={isPopUpOpen}
        onClose={() => setIsPopUpOpen(false)}
        productName={popUpProductName}
        hideFooter={popUpMode === "customCategory"}
      >
        {popUpMode === "tags" ? (
          <TagPopUp
            allShopTags={availableShopTags}
            activeTagSection={activeTagSection}
            setActiveTagSection={setActiveTagSection}
            activeTagLines={activeTagLines}
            tagInput={tagInput}
            setTagInput={setTagInput}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            onTagInputKeyDown={handleTagInputKeyDown}
          />
        ) : popUpMode === "images" ? (
          <ImagePopUp
            images={activeProduct?.images || []}
            onAddImages={handleAddImages}
            onRemoveImage={handleRemoveImage}
            onSetCoverImage={handleSetCoverImage}
          />
        ) : popUpMode === "customCategory" ? (
          <CategoryPopUp
            allCategoryTags={allShopTags.category}
            initialEnabled={customCategoryEnabled}
            initialLines={customCategoryLines}
            onSave={handleSaveCustomCategory}
          />
        ) : null}
      </PopUp>
    </div>
  )
}