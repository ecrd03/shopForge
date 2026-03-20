import { useNavigate } from "react-router-dom"
import ToggleButton from "../components/ToggleButton"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Product from "../components/Product"
import PopUp from "../components/PopUp"

import { useState, useEffect } from "react"

export default function ShopDashboard() {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])

  const [deleteMode, setDeleteMode] = useState(false)

  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [popUpMode, setPopUpMode] = useState("")
  const [activeProductIndex, setActiveProductIndex] = useState(null)
  const [activeTagSection, setActiveTagSection] = useState("category")

  const [allShopTags] = useState([
    "JDM",
    "Nissan",
    "Toyota",
    "Lexus",
    "Honda",
    "Mazda",
    "Subaru",
    "Streetwear",
    "Sticker",
    "Banner",
    "Shirt",
    "Hoodie"
  ])

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch("http://localhost:8080/api/products/shop/1")
      const data = await response.json()

      const formattedProducts = data.map((product) => ({
        ...product,
        categoryTags: [],
        searchTags: [],
        images: [null, null, null, null, null, null],
        isSaved: true
      }))

      setProducts(formattedProducts)
    }

    loadProducts()
  }, [])

  const shopId = 1

  async function handleSaveProduct(product, index) {
    const productToSave = {
      shopId: shopId,
      name: product.name,
      price: Number(product.price),
      stock: Number(product.stock)
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

  function openPopUp(mode, index) {
    setPopUpMode(mode)
    setActiveProductIndex(index)

    if (mode === "tags") {
      setActiveTagSection("category")
    }

    setIsPopUpOpen(true)
  }

  const activeProduct =
    activeProductIndex !== null ? products[activeProductIndex] : null

  function handleAddTag(tag) {
    if (activeProductIndex === null) return

    const updatedProducts = [...products]
    const currentProduct = updatedProducts[activeProductIndex]

    const currentTags =
      activeTagSection === "category"
        ? currentProduct.categoryTags
        : currentProduct.searchTags

    if (currentTags.includes(tag)) return

    updatedProducts[activeProductIndex] = {
      ...currentProduct,
      [activeTagSection === "category" ? "categoryTags" : "searchTags"]: [...currentTags, tag],
      isSaved: false
    }

    setProducts(updatedProducts)
  }

  function handleTagTextChange(value) {
    if (activeProductIndex === null) return

    const updatedProducts = [...products]
    const currentProduct = updatedProducts[activeProductIndex]

    const lines = value
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")

    updatedProducts[activeProductIndex] = {
      ...currentProduct,
      [activeTagSection === "category" ? "categoryTags" : "searchTags"]: lines,
      isSaved: false
    }

    setProducts(updatedProducts)
  }

  const activeTagLines =
    popUpMode === "tags" && activeProduct
      ? activeTagSection === "category"
        ? activeProduct.categoryTags
        : activeProduct.searchTags
      : []

  const activeTagText = activeTagLines.join("\n")

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
        user={{ name: "Eric Shop Profile", avatarUrl: "" }}
        onSignOut={() => {
          localStorage.removeItem("token")
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
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "#8c5ddd",
              flexShrink: 0
            }}
          />
          {/* Shop Name*/}
          <span
            style={{
              fontSize: 37,
              fontWeight: 800,
              whiteSpace: "nowrap"
            }}
          >
            RedLine Apparels
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
                  shopId: 1,
                  name: "",
                  price: "",
                  stock: "",
                  categoryTags: [],
                  searchTags: [],
                  images: [null, null, null, null, null, null],
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
              onOpenTags={() => openPopUp("tags", index)}
              onOpenImages={() => openPopUp("images", index)}
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
      >
        {popUpMode === "tags" ? (
          <div>
            <h2 style={{ marginTop: 0, marginBottom: 18 }}>Tags</h2>

            <div
              style={{
                display: "flex",
                gap: 24,
                alignItems: "flex-start"
              }}
            >
              {/* left side */}
              <div style={{ width: 185, flexShrink: 0 }}>
                <h3 style={{ marginTop: 0, fontSize: 16, marginBottom: 12 }}>
                  All Shop Tags
                </h3>

                <div style={tagListBoxStyle}>
                  {allShopTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddTag(`#${tag}`)}
                      style={listTagButtonStyle}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* right side */}
              <div style={{ flex: 1 }}>
                <div style={tagTabsBarStyle}>
                  <button
                    type="button"
                    onClick={() => setActiveTagSection("category")}
                    style={{
                      ...tagTabStyle,
                      ...(activeTagSection === "category"
                        ? tagTabActiveStyle
                        : tagTabInactiveStyle)
                    }}
                  >
                    CATEGORY
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTagSection("search")}
                    style={{
                      ...tagTabStyle,
                      ...(activeTagSection === "search"
                        ? tagTabActiveStyle
                        : tagTabInactiveStyle)
                    }}
                  >
                    SEARCH
                  </button>
                </div>

                <textarea
                  value={activeTagText}
                  onChange={(e) => handleTagTextChange(e.target.value)}
                  placeholder={"#is300\n#nissan_240z\n#jdm"}
                  style={tagTextAreaStyle}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ marginTop: 0 }}>Images</h2>
            <p>Image popup UI comes next.</p>
          </div>
        )}
      </PopUp>

    </div>

  )
}

const tagListBoxStyle = {
  border: "1px solid #7b8691",
  backgroundColor: "#ffffff",
  minHeight: 330,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden"
}

const listTagButtonStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "none",
  borderBottom: "1px solid #d7dce1",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  fontSize: 14,
  textAlign: "left"
}

const tagTabsBarStyle = {
  display: "flex",
  alignItems: "flex-end",
  gap: 0,
  marginBottom: 0
}

const tagTabStyle = {
  padding: "12px 22px",
  border: "1px solid #7b8691",
  borderBottom: "none",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 700,
  backgroundColor: "transparent",
  minWidth: 120
}

const tagTabInactiveStyle = {
  backgroundColor: "#5f6872",
  color: "#f1c46a"
}

const tagTabActiveStyle = {
  backgroundColor: "#f3f3f3",
  color: "#1f3b5b",
  position: "relative",
  top: 1
}

const tagTextAreaStyle = {
  width: "100%",
  minHeight: 330,
  border: "1px solid #7b8691",
  backgroundColor: "#ffffff",
  padding: 14,
  fontSize: 14,
  resize: "none",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  borderRadius: 0
}