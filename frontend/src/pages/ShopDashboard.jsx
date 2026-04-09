import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Product from "../components/Product"
import PopUp from "../components/PopUp"
import TagPopUp from "../components/TagPopUp"
import ImagePopUp from "../components/ImagePopUp"

import { useState, useEffect } from "react"

export default function ShopDashboard() {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])

  const [deleteMode, setDeleteMode] = useState(false)

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

  const [allShopTags, setAllShopTags] = useState([])

  useEffect(() => {
    async function loadProducts() {
      if (!shopId) return
      const response = await fetch(`http://localhost:8080/api/products/shop/${shopId}`)
      const data = await response.json()

      const formattedProducts = data.map((product) => ({
        ...product,
        categoryTags: product.categoryTags || [],
        searchTags: product.searchTags || [],
        images: [],
        isSaved: true
      }))

      const tagSet = new Set()

      formattedProducts.forEach((product) => {
        ; (product.categoryTags || []).forEach((tag) => tagSet.add(tag))
          ; (product.searchTags || []).forEach((tag) => tagSet.add(tag))
      })

      setAllShopTags(Array.from(tagSet))

      setProducts(formattedProducts)
    }

    loadProducts()
  }, [])

  useEffect(() => {
    async function loadShop() {
      if (!shopId) {
        setLoadingShop(false)
        return
      }

      try {
        const response = await fetch(`http://localhost:8080/api/shops/${shopId}`)
        if (!response.ok) {
          throw new Error("Failed to load shop")
        }

        const data = await response.json()
        setShop(data)
      } catch (error) {
        console.error("Error loading shop:", error)
      } finally {
        setLoadingShop(false)
      }
    }

    loadShop()
  }, [shopId])

  async function handleSaveProduct(product, index) {
    const productToSave = {
      shopId: shopId,
      name: product.name,
      price: Number(product.price),
      stock: Number(product.stock),
      categoryTags: product.categoryTags || [],
      searchTags: product.searchTags || []
    }

    const isEditingExistingProduct = product.id != null

    const response = await fetch(
      isEditingExistingProduct
        ? `http://localhost:8080/api/products/${product.id}`
        : "http://localhost:8080/api/products",
      {
        method: isEditingExistingProduct ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productToSave)
      }
    )

    const savedProduct = await response.json()

    const updatedProducts = [...products]
    updatedProducts[index] = {
      ...updatedProducts[index],
      ...savedProduct,
      isSaved: true
    }
    setProducts(updatedProducts)
  }

  async function handleDeleteProduct(product, index) {
    if (product.id != null) {
      await fetch(`http://localhost:8080/api/products/${product.id}`, {
        method: "DELETE"
      })
    }

    const updatedProducts = products.filter((_, i) => i !== index)
    setProducts(updatedProducts)
  }

  function openPopUp(mode, index, productName) {
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
        ? activeProduct.categoryTags
        : activeProduct.searchTags
      : []
  const activeProductUsedTags =
    activeProduct
      ? [...(activeProduct.categoryTags || []), ...(activeProduct.searchTags || [])]
      : []

  const availableShopTags = allShopTags.filter(
    (tag) => !activeProductUsedTags.includes(tag)
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
      if (prev.includes(cleanedTag)) return prev
      return [...prev, cleanedTag]
    })
  }

  function handleRemoveTag(tagToRemove) {
    if (activeProductIndex === null) return

    const updatedProducts = [...products]
    const currentProduct = updatedProducts[activeProductIndex]

    const currentTags =
      activeTagSection === "category"
        ? currentProduct.categoryTags
        : currentProduct.searchTags

    updatedProducts[activeProductIndex] = {
      ...currentProduct,
      [activeTagSection === "category" ? "categoryTags" : "searchTags"]:
        currentTags.filter((tag) => tag !== tagToRemove),
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

  function handleRemoveImage(imageId) {
    if (activeProductIndex === null) return

    const updatedProducts = [...products]
    const currentProduct = updatedProducts[activeProductIndex]

    updatedProducts[activeProductIndex] = {
      ...currentProduct,
      images: currentProduct.images.filter((image) => image.id !== imageId),
      isSaved: false
    }

    setProducts(updatedProducts)
  }


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
          {/* icon image*/}
          {shop?.logoUrl ? (
            <img
              src={shop.logoUrl}
              alt={shop?.name || "Shop logo"}
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0
              }}
            />
          ) : (
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                backgroundColor: "#8c5ddd",
                flexShrink: 0
              }}
            />
          )}
          {/* Shop Name*/}
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
          {/* External Link Button*/}
          <button
            type="button"
            onClick={() =>
              window.open("https://www.etsy.com/shop/RedLineApparels", "_blank")
            }
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

          {/* Edit shop Profile Button*/}
          <button
            type="button" onClick={() => navigate("/editShopProfile")}
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

      {/* line dividor*/}
      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "#00000073",
          flexShrink: 0,
          position: "relative",

        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        <SearchBar />


        {/* RIGHT SIDE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18
          }}
        >
          {/* delete Button*/}
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
            <img
              src="/delete.png"
              alt="Delete"
              style={{ width: 32, height: 32 }}
            />
          </button>

          <button
            type="button"
            onClick={() =>
              setProducts([
                ...products,
                {
                  shopId: shopId,
                  name: "",
                  price: "",
                  stock: "",
                  categoryTags: [],
                  searchTags: [],
                  images: [],
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

      {/* LEFT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20
        }}
      >
        {/* product list */}


        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {products.map((product, index) => (
            <Product
              key={product.id ?? index}
              product={product}
              isSaved={product.isSaved}
              showDelete={deleteMode}
              onChange={(updatedProduct) => {
                const updatedProducts = [...products]
                updatedProducts[index] = {
                  ...updatedProduct,
                  isSaved: false,
                }
                setProducts(updatedProducts)
              }}
              onSave={() => handleSaveProduct(product, index)}
              onDelete={() => handleDeleteProduct(product, index)}
              onOpenTags={() => openPopUp("tags", index, product.name)}
              onOpenImages={() => openPopUp("images", index, product.name)}
            />
          ))}
        </div>


      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18
        }}
      >

      </div>

      <PopUp
        isOpen={isPopUpOpen}
        onClose={() => setIsPopUpOpen(false)}
        productName={popUpProductName}
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
        ) : (
          <ImagePopUp
            images={activeProduct?.images || []}
            onAddImages={handleAddImages}
            onRemoveImage={handleRemoveImage}
          />
        )}
      </PopUp>

    </div>

  )
}

