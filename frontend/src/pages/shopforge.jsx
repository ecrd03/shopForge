import { useEffect, useMemo, useRef, useState } from "react"
import { Menu, ChevronRight, ChevronDown, X } from "lucide-react"
import { getThemeColors } from "../components/ThemeColors"

function getSocialButtonStyle(colors) {
    return {
        flex: "0 0 auto",
        padding: "8px 14px",
        borderRadius: 14,
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.buttonBg,
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 500,
        whiteSpace: "nowrap",
        textDecoration: "none",
        color: colors.buttonText
    }
}

function getItemCardStyle() {
    return {
        width: 220,
        cursor: "pointer"
    }
}

function getItemImageStyle(colors) {
    return {
        width: 220,
        height: 220,
        border: `1px solid ${colors.border}`,
        borderRadius: 20,
        backgroundColor: colors.surface,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    }
}

function safeJsonParse(value, fallback) {
    try {
        return JSON.parse(value)
    } catch {
        return fallback
    }
}

function normalizePathArray(value) {
    if (!Array.isArray(value)) return []
    return value
        .map((part) => String(part || "").trim())
        .filter(Boolean)
}

function buildCategoryTree(lines = []) {
    const root = []

    for (const rawLine of lines) {
        const line = normalizePathArray(rawLine)
        if (line.length === 0) continue

        let currentLevel = root
        let currentPath = []

        for (const part of line) {
            currentPath = [...currentPath, part]

            let node = currentLevel.find((item) => item.name === part)

            if (!node) {
                node = {
                    name: part,
                    path: currentPath,
                    children: []
                }
                currentLevel.push(node)
            }

            currentLevel = node.children
        }
    }

    return root
}

function flattenCategoryTree(nodes = []) {
    const result = []
    const seen = new Set()

    function walk(items) {
        for (const item of items) {
            const key = item.path.join("|||")

            if (!seen.has(key)) {
                seen.add(key)
                result.push(item)
            }

            if (item.children && item.children.length > 0) {
                walk(item.children)
            }
        }
    }

    walk(nodes)
    return result
}

function normalizeTagValue(value) {
    return String(value || "").trim().toLowerCase()
}

function getProductCategoryTags(product) {
    const categoryTags = []

    const field = product?.categoryTags

    if (Array.isArray(field)) {
        field.forEach((tag) => {
            const cleaned = normalizeTagValue(tag)
            if (cleaned) {
                categoryTags.push(cleaned)
            }
        })
    } else if (typeof field === "string") {
        const parsed = safeJsonParse(field, [])
        if (Array.isArray(parsed)) {
            parsed.forEach((tag) => {
                const cleaned = normalizeTagValue(tag)
                if (cleaned) {
                    categoryTags.push(cleaned)
                }
            })
        }
    }

    return Array.from(new Set(categoryTags))
}

function matchesSelectedCategory(product, selectedPath = []) {
    if (selectedPath.length === 0) return true

    const productTags = getProductCategoryTags(product)

    const selectedTags = selectedPath
        .map((part) => normalizeTagValue(part))
        .filter(Boolean)

    return selectedTags.every((tag) => productTags.includes(tag))
}


function SidebarNode({
    node,
    level,
    openMap,
    toggleNode,
    onSelect,
    selectedCategoryPath,
    colors
}) {
    const key = node.path.join("|||")
    const isOpen = !!openMap[key]
    const hasChildren = node.children && node.children.length > 0
    const isSelected = selectedCategoryPath.join("|||") === key

    return (
        <div>
            <button
                type="button"
                onClick={() => {
                    onSelect(node.path)

                    if (hasChildren) {
                        toggleNode(key)
                    }
                }}
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 12px",
                    paddingLeft: 14 + level * 18,
                    border: "none",
                    backgroundColor: isSelected ? colors.surface2 : "transparent",
                    color: colors.text,
                    cursor: "pointer",
                    textAlign: "left",
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: isSelected ? 700 : 500
                }}
            >
                {hasChildren ? (
                    isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                ) : (
                    <div style={{ width: 16, flexShrink: 0 }} />
                )}

                <span>{node.name}</span>
            </button>

            {hasChildren && isOpen && (
                <div>
                    {node.children.map((child) => (
                        <SidebarNode
                            key={child.path.join("|||")}
                            node={child}
                            level={level + 1}
                            openMap={openMap}
                            toggleNode={toggleNode}
                            onSelect={onSelect}
                            selectedCategoryPath={selectedCategoryPath}
                            colors={colors}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

function FilterOption({
    label,
    checked,
    onClick,
    colors
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 4px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                color: colors.text,
                fontSize: 14,
                textAlign: "left"
            }}
        >
            <div
                style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    border: `1px solid ${colors.border}`,
                    backgroundColor: checked ? colors.buttonText : "#ffffff",
                    flexShrink: 0
                }}
            />
            <span>{label}</span>
        </button>
    )
}

export default function ShopForge() {
    const [search, setSearch] = useState("")
    const [shop, setShop] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)

    const [selectedCategoryPath, setSelectedCategoryPath] = useState([])
    const [openMap, setOpenMap] = useState({})
    const [sortMode, setSortMode] = useState("latest")

    const filterRef = useRef(null)

    const user = JSON.parse(localStorage.getItem("user"))
    const shopId = user?.shopId

    useEffect(() => {
        async function loadData() {
            if (!shopId) {
                setError("No shop found")
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError("")

                const [shopRes, productsRes] = await Promise.all([
                    fetch(`http://localhost:8080/api/shops/${shopId}`),
                    fetch(`http://localhost:8080/api/products/shop/${shopId}`)
                ])

                if (!shopRes.ok) {
                    throw new Error("Failed to load shop")
                }

                if (!productsRes.ok) {
                    throw new Error("Failed to load products")
                }

                const shopData = await shopRes.json()
                const productsData = await productsRes.json()

                const formattedProducts = (productsData || []).map((product) => ({
                    ...product,
                    categoryTags: Array.isArray(product.categoryTags)
                        ? product.categoryTags
                        : typeof product.categoryTags === "string"
                            ? safeJsonParse(product.categoryTags, [])
                            : [],
                    searchTags: Array.isArray(product.searchTags)
                        ? product.searchTags
                        : typeof product.searchTags === "string"
                            ? safeJsonParse(product.searchTags, [])
                            : [],
                    images: Array.isArray(product.images)
                        ? product.images
                        : typeof product.images === "string"
                            ? safeJsonParse(product.images, [])
                            : []
                }))

                setShop(shopData)
                setProducts(formattedProducts)
            } catch (err) {
                console.error("Error loading shop page:", err)
                setError("Could not load shop page")
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [shopId])

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setFilterOpen(false)
            }
        }

        if (filterOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [filterOpen])

    const colors = getThemeColors(shop?.theme || "Theme1")
    const socialButtonStyle = getSocialButtonStyle(colors)
    const itemCardStyle = getItemCardStyle()
    const itemImageStyle = getItemImageStyle(colors)

    const socials = useMemo(() => {
        if (!shop) return []

        return [
            { label: "Instagram", url: shop.instagramUrl, enabled: shop.instagramEnabled },
            { label: "Facebook", url: shop.facebookUrl, enabled: shop.facebookEnabled },
            { label: "Twitter", url: shop.twitterUrl, enabled: shop.twitterEnabled },
            { label: "TikTok", url: shop.tiktokUrl, enabled: shop.tiktokEnabled },
            { label: "Etsy", url: shop.etsyUrl, enabled: shop.etsyEnabled },
            { label: "Shopify", url: shop.shopifyUrl, enabled: shop.shopifyEnabled },
            { label: "Depop", url: shop.depopUrl, enabled: shop.depopEnabled },
            { label: "eBay", url: shop.ebayUrl, enabled: shop.ebayEnabled }
        ].filter(
            (social) =>
                social.enabled &&
                social.url &&
                social.url.trim() !== ""
        )
    }, [shop])

    const customCategoryLines = useMemo(() => {
        if (!shop?.customCategoryLines || shop.customCategoryLines.trim() === "") {
            return []
        }

        const parsed = safeJsonParse(shop.customCategoryLines, [])
        return Array.isArray(parsed) ? parsed : []
    }, [shop])

    const categoryTree = useMemo(() => {
        return buildCategoryTree(customCategoryLines)
    }, [customCategoryLines])

    const flatCategoryList = useMemo(() => {
        return flattenCategoryTree(categoryTree)
    }, [categoryTree])



    function toggleNode(key) {
        setOpenMap((prev) => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    const filteredProducts = useMemo(() => {
        let result = [...products]

        const trimmedSearch = search.trim().toLowerCase()

        result = result.filter((product) => {
            const matchesName = (product.name || "")
                .toLowerCase()
                .includes(trimmedSearch)

            const matchesCategoryTag = (product.categoryTags || []).some((tag) =>
                String(tag || "").toLowerCase().includes(trimmedSearch)
            )

            const matchesSearchTag = (product.searchTags || []).some((tag) =>
                String(tag || "").toLowerCase().includes(trimmedSearch)
            )

            const matchesCategory = matchesSelectedCategory(
                product,
                selectedCategoryPath
            )

            return (
                (trimmedSearch === "" ||
                    matchesName ||
                    matchesCategoryTag ||
                    matchesSearchTag) &&
                matchesCategory
            )
        })

        result.sort((a, b) => {
            switch (sortMode) {
                case "oldest":
                    return (a.id ?? 0) - (b.id ?? 0)

                case "az":
                    return String(a.name || "").localeCompare(String(b.name || ""))

                case "za":
                    return String(b.name || "").localeCompare(String(a.name || ""))

                case "priceHighLow":
                    return Number(b.price ?? 0) - Number(a.price ?? 0)

                case "priceLowHigh":
                    return Number(a.price ?? 0) - Number(b.price ?? 0)

                case "latest":
                default:
                    return (b.id ?? 0) - (a.id ?? 0)
            }
        })

        return result
    }, [products, search, selectedCategoryPath, sortMode])

    if (loading) {
        return <div style={{ padding: 24, color: colors.text }}>Loading shop...</div>
    }

    if (error) {
        return (
            <div style={{ padding: 24, color: "crimson" }}>
                {error}
            </div>
        )
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                backgroundColor: colors.pageBg,
                padding: 24,
                boxSizing: "border-box",
                position: "relative",
                overflowX: "hidden"
            }}
        >
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.35)",
                        zIndex: 40
                    }}
                />
            )}

            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: sidebarOpen ? 0 : -340,
                    width: 320,
                    height: "100vh",
                    backgroundColor: colors.surface,
                    borderRight: `1px solid ${colors.border}`,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                    zIndex: 50,
                    transition: "left 0.25s ease",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 18,
                        borderBottom: `1px solid ${colors.borderSoft}`
                    }}
                >
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: colors.text
                        }}
                    >
                        Categories
                    </div>

                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        style={{
                            width: 42,
                            height: 42,
                            borderRadius: 12,
                            border: `1px solid ${colors.border}`,
                            backgroundColor: colors.buttonBg,
                            color: colors.buttonText,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            lineHeight: 0
                        }}
                    >
                        <X style={{ width: 22, height: 22, flexShrink: 0 }} />
                    </button>
                </div>

                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: 12
                    }}
                >
                    <button
                        type="button"
                        onClick={() => setSelectedCategoryPath([])}
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 12px",
                            border: "none",
                            backgroundColor:
                                selectedCategoryPath.length === 0
                                    ? colors.surface2
                                    : "transparent",
                            color: colors.text,
                            cursor: "pointer",
                            textAlign: "left",
                            borderRadius: 12,
                            fontSize: 15,
                            fontWeight: selectedCategoryPath.length === 0 ? 700 : 500,
                            marginBottom: 6
                        }}
                    >
                        <div style={{ width: 16, flexShrink: 0 }} />
                        <span>All Categories</span>
                    </button>

                    {shop?.customCategoryEnabled ? (
                        categoryTree.map((node) => (
                            <SidebarNode
                                key={node.path.join("|||")}
                                node={node}
                                level={0}
                                openMap={openMap}
                                toggleNode={toggleNode}
                                onSelect={setSelectedCategoryPath}
                                selectedCategoryPath={selectedCategoryPath}
                                colors={colors}
                            />
                        ))
                    ) : (
                        flatCategoryList.map((node) => {
                            const key = node.path.join("|||")
                            const isSelected = selectedCategoryPath.join("|||") === key

                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setSelectedCategoryPath(node.path)}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        padding: "10px 12px",
                                        border: "none",
                                        backgroundColor: isSelected ? colors.surface2 : "transparent",
                                        color: colors.text,
                                        cursor: "pointer",
                                        textAlign: "left",
                                        borderRadius: 12,
                                        fontSize: 15,
                                        fontWeight: isSelected ? 700 : 500,
                                        marginBottom: 4
                                    }}
                                >
                                    <span>{node.name}</span>
                                </button>
                            )
                        })
                    )}

                    {categoryTree.length === 0 && (
                        <div
                            style={{
                                padding: 12,
                                color: colors.textSoft,
                                fontSize: 14
                            }}
                        >
                            No custom categories yet
                        </div>
                    )}
                </div>
            </div>

            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 28
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 24,
                        backgroundColor: colors.surface,
                        border: `1px solid ${colors.borderSoft}`,
                        borderRadius: 24,
                        padding: 24
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 20,
                            flexWrap: "wrap"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 16
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(true)}
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 16,
                                    border: `1px solid ${colors.border}`,
                                    backgroundColor: colors.buttonBg,
                                    color: colors.buttonText,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                    transition: "all 0.2s ease",
                                    lineHeight: 0
                                }}
                            >
                                <Menu style={{ width: 22, height: 22, flexShrink: 0 }} strokeWidth={2.5} />                            </button>

                            {shop?.logoUrl ? (
                                <img
                                    src={shop.logoUrl}
                                    alt={shop.name}
                                    style={{
                                        width: 180,
                                        height: 180,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: `1px solid ${colors.border}`,
                                        flexShrink: 0
                                    }}
                                />
                            ) : (
                                <img
                                    src="/ProfileEmptyIcon.png"
                                    alt="Default shop logo"
                                    style={{
                                        width: 130,
                                        height: 130,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: `1px solid ${colors.border}`,
                                        flexShrink: 0
                                    }}
                                />
                            )}
                        </div>

                        <div
                            style={{
                                flex: 1,
                                minWidth: 280,
                                display: "flex",
                                flexDirection: "column",
                                gap: 14
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 38,
                                    fontWeight: 700,
                                    color: colors.text,
                                    lineHeight: 1.1
                                }}
                            >
                                {shop?.name || "Shop Name"}
                            </div>

                            <div
                                style={{
                                    minHeight: 90,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: 18,
                                    backgroundColor: colors.surface2,
                                    padding: 16,
                                    fontSize: 15,
                                    color: colors.textSoft,
                                    lineHeight: 1.5
                                }}
                            >
                                {shop?.description?.trim()
                                    ? shop.description
                                    : "No shop description yet."}
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            paddingLeft: 0
                        }}
                    >
                        <div
                            style={{
                                minWidth: 70,
                                fontSize: 18,
                                fontWeight: 600,
                                color: colors.textSoft
                            }}
                        >
                            Links
                        </div>

                        <div
                            id="shop-socials-scroll"
                            style={{
                                flex: 1,
                                display: "flex",
                                gap: 10,
                                overflowX: "auto",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                                paddingBottom: 4
                            }}
                        >
                            {socials.length > 0 ? (
                                socials.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={socialButtonStyle}
                                    >
                                        {social.label}
                                    </a>
                                ))
                            ) : (
                                <div style={{ color: colors.muted, fontSize: 14 }}>
                                    No social links yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                        flexWrap: "wrap"
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            flex: 1,
                            minWidth: 260,
                            height: 54,
                            borderRadius: 20,
                            border: `1px solid ${colors.border}`,
                            backgroundColor: colors.inputBg,
                            color: colors.text,
                            padding: "0 18px",
                            fontSize: 16,
                            outline: "none"
                        }}
                    />

                    <div style={{ position: "relative" }} ref={filterRef}>
                        <button
                            type="button"
                            onClick={() => setFilterOpen((prev) => !prev)}
                            style={{
                                height: 54,
                                padding: "0 28px",
                                borderRadius: 20,
                                border: `1px solid ${colors.border}`,
                                backgroundColor: colors.buttonBg,
                                color: colors.buttonText,
                                cursor: "pointer",
                                fontSize: 16,
                                fontWeight: 500
                            }}
                        >
                            Filter
                        </button>

                        {filterOpen && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 62,
                                    right: 0,
                                    width: 250,
                                    backgroundColor: colors.surface,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: 18,
                                    boxShadow: "0 12px 28px rgba(0,0,0,0.16)",
                                    padding: 14,
                                    zIndex: 30
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: colors.text,
                                        marginBottom: 8
                                    }}
                                >
                                    Sort
                                </div>

                                <FilterOption
                                    label="Latest"
                                    checked={sortMode === "latest"}
                                    onClick={() => setSortMode("latest")}
                                    colors={colors}
                                />

                                <FilterOption
                                    label="Oldest"
                                    checked={sortMode === "oldest"}
                                    onClick={() => setSortMode("oldest")}
                                    colors={colors}
                                />

                                <FilterOption
                                    label="A-Z"
                                    checked={sortMode === "az"}
                                    onClick={() => setSortMode("az")}
                                    colors={colors}
                                />

                                <FilterOption
                                    label="Z-A"
                                    checked={sortMode === "za"}
                                    onClick={() => setSortMode("za")}
                                    colors={colors}
                                />

                                <FilterOption
                                    label="Price high - low"
                                    checked={sortMode === "priceHighLow"}
                                    onClick={() => setSortMode("priceHighLow")}
                                    colors={colors}
                                />

                                <FilterOption
                                    label="Price low - high"
                                    checked={sortMode === "priceLowHigh"}
                                    onClick={() => setSortMode("priceLowHigh")}
                                    colors={colors}
                                />
                            </div>
                        )}

                    </div>
                </div>

                {selectedCategoryPath.length > 0 && (
                    <div
                        style={{
                            fontSize: 14,
                            color: colors.textSoft
                        }}
                    >
                        Category: {selectedCategoryPath.join(" / ")}
                    </div>
                )}

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 25,
                        alignItems: "flex-start",
                        justifyContent: "center"
                    }}
                >
                    {filteredProducts.map((product) => {
                        const firstImage =
                            Array.isArray(product.images) && product.images.length > 0
                                ? product.images[0]
                                : ""

                        return (
                            <div key={product.id} style={itemCardStyle}>
                                <div style={itemImageStyle}>
                                    {firstImage ? (
                                        <img
                                            src={firstImage}
                                            alt={product.name}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover"
                                            }}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                width: 90,
                                                height: 90,
                                                borderRadius: 18,
                                                backgroundColor: colors.placeholderBlock
                                            }}
                                        />
                                    )}
                                </div>

                                <div style={{ marginTop: 10 }}>
                                    <div
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 600,
                                            color: colors.text,
                                            marginBottom: 4
                                        }}
                                    >
                                        {product.name || "Unnamed Product"}
                                    </div>

                                    <div
                                        style={{
                                            fontSize: 14,
                                            color: colors.textSoft
                                        }}
                                    >
                                        ${product.price}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {!loading && filteredProducts.length === 0 && (
                    <div style={{ color: colors.muted, fontSize: 15 }}>
                        No products found
                    </div>
                )}
            </div>
        </div>
    )
}