import { useEffect, useRef, useState } from "react"
import Divider from "../components/Divider"
import Header from "../components/Header"
import InputBox from "../components/InputBox"
import Theme from "../components/Theme"
import { useNavigate } from "react-router-dom"
import { storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import ThemeColors from "../components/ThemeColors"

export default function EditShop() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const shopId = user?.shopId
  const fileInputRef = useRef(null)

  const [shopName, setShopName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("Theme1")
  const [logoUrl, setLogoUrl] = useState("")
  const [originalShop, setOriginalShop] = useState(null)

  const [links, setLinks] = useState({
    instagram: { enabled: true, value: "" },
    facebook: { enabled: true, value: "" },
    twitter: { enabled: true, value: "" },
    tiktok: { enabled: true, value: "" },
    etsy: { enabled: true, value: "" },
    shopify: { enabled: true, value: "" },
    depop: { enabled: true, value: "" },
    ebay: { enabled: true, value: "" }
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user, navigate])

  function updateLink(platform, field, newValue) {
    setLinks((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: newValue
      }
    }))
  }

  useEffect(() => {
    async function fetchShop() {
      if (!shopId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`http://localhost:8080/api/shops/${shopId}`)
        if (!response.ok) {
          throw new Error("Failed to load shop")
        }

        const data = await response.json()

        setShopName(data.name || "")
        setDescription(data.description || "")
        setSelectedTheme(data.theme || "Theme1")
        setLogoUrl(data.logoUrl || "")

        const loadedLinks = {
          instagram: { enabled: data.instagramEnabled ?? true, value: data.instagramUrl || "" },
          facebook: { enabled: data.facebookEnabled ?? true, value: data.facebookUrl || "" },
          twitter: { enabled: data.twitterEnabled ?? true, value: data.twitterUrl || "" },
          tiktok: { enabled: data.tiktokEnabled ?? true, value: data.tiktokUrl || "" },
          etsy: { enabled: data.etsyEnabled ?? true, value: data.etsyUrl || "" },
          shopify: { enabled: data.shopifyEnabled ?? true, value: data.shopifyUrl || "" },
          depop: { enabled: data.depopEnabled ?? true, value: data.depopUrl || "" },
          ebay: { enabled: data.ebayEnabled ?? true, value: data.ebayUrl || "" }
        }

        setLinks(loadedLinks)

        setOriginalShop({
          name: data.name || "",
          description: data.description || "",
          theme: data.theme || "Theme1",
          logoUrl: data.logoUrl || "",
          links: loadedLinks
        })
      } catch (error) {
        console.error("Error loading shop:", error)
        setMessage("Failed to load shop data.")
      } finally {
        setLoading(false)
      }
    }

    fetchShop()
  }, [shopId])

  function handleOpenLogoPicker() {
    if (uploadingLogo) return
    fileInputRef.current?.click()
  }

  async function handleLogoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingLogo(true)
      setMessage("")

      const imageRef = ref(storage, `shop-logos/${shopId}-${Date.now()}-${file.name}`)
      await uploadBytes(imageRef, file)
      const url = await getDownloadURL(imageRef)

      setLogoUrl(url)
      setMessage("Logo uploaded. Click Save Changes to keep it.")
    } catch (error) {
      console.error("Logo upload failed:", error)
      setMessage("Logo upload failed.")
    } finally {
      setUploadingLogo(false)
      e.target.value = ""
    }
  }

  function handleRemoveLogo(e) {
    e.stopPropagation()
    setLogoUrl("")
    setMessage("Logo removed. Click Save Changes to keep it.")
  }

  async function handleSave() {
    setSaving(true)
    setMessage("")

    try {
      const response = await fetch(`http://localhost:8080/api/shops/${shopId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: shopName,
          description,
          theme: selectedTheme,
          logoUrl: logoUrl,

          instagramUrl: links.instagram.value,
          facebookUrl: links.facebook.value,
          twitterUrl: links.twitter.value,
          tiktokUrl: links.tiktok.value,
          etsyUrl: links.etsy.value,
          shopifyUrl: links.shopify.value,
          depopUrl: links.depop.value,
          ebayUrl: links.ebay.value,

          instagramEnabled: links.instagram.enabled,
          facebookEnabled: links.facebook.enabled,
          twitterEnabled: links.twitter.enabled,
          tiktokEnabled: links.tiktok.enabled,
          etsyEnabled: links.etsy.enabled,
          shopifyEnabled: links.shopify.enabled,
          depopEnabled: links.depop.enabled,
          ebayEnabled: links.ebay.enabled
        })
      })

      if (!response.ok) {
        throw new Error("Failed to save shop")
      }

      setMessage("Shop profile saved.")

      setOriginalShop({
        name: shopName,
        description,
        theme: selectedTheme,
        logoUrl,
        links: {
          instagram: { ...links.instagram },
          facebook: { ...links.facebook },
          twitter: { ...links.twitter },
          tiktok: { ...links.tiktok },
          etsy: { ...links.etsy },
          shopify: { ...links.shopify },
          depop: { ...links.depop },
          ebay: { ...links.ebay }
        }
      })
    } catch (error) {
      console.error("Error saving shop:", error)
      setMessage("Failed to save shop profile.")
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    if (!originalShop) return

    setShopName(originalShop.name)
    setDescription(originalShop.description)
    setSelectedTheme(originalShop.theme)
    setLogoUrl(originalShop.logoUrl || "")
    setLinks(originalShop.links)
    setMessage("Changes were discarded.")
  }

  if (!user) return null

  if (loading) {
    return <div style={{ padding: 24 }}>Loading shop...</div>
  }

  return (
    <div
      style={{
        height: "calc(100vh - 60px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 24,
        gap: 20,
        boxSizing: "border-box"
      }}
    >
      <Header
        name="Edit Shop Profile"
        user={{
          name: user?.email || "Profile",
          avatarUrl: logoUrl || ""
        }}
        onSignOut={() => {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          navigate("/")
        }}
      />

      <div
        style={{
          display: "flex",
          width: "100%",
          flex: 1,
          gap: 24
        }}
      >
        <div
          style={{
            flex: 5.4,
            borderRight: "1px solid #ddd",
            paddingRight: 16,
            boxSizing: "border-box"
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
            <div
              style={{
                position: "relative",
                width: 100,
                height: 100,
                flexShrink: 0
              }}
            >
              <button
                type="button"
                onClick={handleOpenLogoPicker}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 60,
                  border: "1.2px solid #0d4bbf9e",
                  backgroundColor: "#ffffff",
                  backgroundImage: `url(${logoUrl || "/ProfileEmptyIcon.png"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  cursor: uploadingLogo ? "default" : "pointer",
                  opacity: uploadingLogo ? 0.7 : 1
                }}
                title={uploadingLogo ? "Uploading..." : "Upload shop logo"}
              />

              {logoUrl && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  style={{
                    position: "absolute",
                    right: -4,
                    bottom: -4,
                    width: 26,
                    height: 26,
                    minWidth: 26,
                    minHeight: 26,
                    padding: 0,
                    borderRadius: "50%",
                    border: "1px solid #d1d5db",
                    backgroundColor: "#ffffff",
                    color: "#333",
                    fontSize: 15,
                    lineHeight: "26px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    aspectRatio: "1 / 1"
                  }}
                  title="Remove logo"
                >
                  ×
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleLogoChange}
              />
            </div>

            <InputBox
              label="Enter Shop Name"
              value={shopName}
              onChange={setShopName}
            />
          </div>

          <div style={{ marginTop: 8, fontSize: 10, color: "#555" }}>
            {uploadingLogo ? "Uploading logo..." : "Click to upload shop Icon"}
          </div>

          <div
            style={{
              marginTop: 25,
              display: "flex",
              flexDirection: "column",
              width: "106%",
              gap: 14
            }}
          >
            <InputBox
              label="Description"
              multiline
              height={120}
              value={description}
              onChange={setDescription}
            />
          </div>

          <div style={{ marginTop: 30 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>
              Theme
            </span>

            <div
              style={{
                marginTop: 12,
                display: "flex",
                alignItems: "center",
                gap: 5
              }}
            >
              {Object.entries(ThemeColors).map(([themeName, theme]) => (
                <Theme
                  key={themeName}
                  colorA={theme.surface}
                  colorB={theme.accent}
                  borderColor={selectedTheme === themeName ? "rgb(11, 31, 181)" : "#0d4bbf9e"}
                  onClick={() => setSelectedTheme(themeName)}
                  size={selectedTheme === themeName ? 65 : 50}
                />
              ))}
            </div>

            <div style={{ marginTop: 10, fontSize: 14, color: "#555" }}>
              Selected: {selectedTheme}
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 4,
            minWidth: 0
          }}
        >
          <span style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>
            External Links
          </span>

          <div
            style={{
              marginTop: 22,
              display: "flex",
              flexDirection: "column",
              gap: 0,
              maxHeight: "62vh",
              overflowY: "auto"
            }}
          >
            <InputBox
              label="Instagram"
              toggle
              value={links.instagram.value}
              onChange={(value) => updateLink("instagram", "value", value)}
              enabled={links.instagram.enabled}
              onToggleChange={(enabled) => updateLink("instagram", "enabled", enabled)}
            />

            <InputBox
              label="Facebook"
              toggle
              value={links.facebook.value}
              onChange={(value) => updateLink("facebook", "value", value)}
              enabled={links.facebook.enabled}
              onToggleChange={(enabled) => updateLink("facebook", "enabled", enabled)}
            />

            <InputBox
              label="Twitter"
              toggle
              value={links.twitter.value}
              onChange={(value) => updateLink("twitter", "value", value)}
              enabled={links.twitter.enabled}
              onToggleChange={(enabled) => updateLink("twitter", "enabled", enabled)}
            />

            <InputBox
              label="TikTok"
              toggle
              value={links.tiktok.value}
              onChange={(value) => updateLink("tiktok", "value", value)}
              enabled={links.tiktok.enabled}
              onToggleChange={(enabled) => updateLink("tiktok", "enabled", enabled)}
            />

            <InputBox
              label="Etsy"
              toggle
              value={links.etsy.value}
              onChange={(value) => updateLink("etsy", "value", value)}
              enabled={links.etsy.enabled}
              onToggleChange={(enabled) => updateLink("etsy", "enabled", enabled)}
            />

            <InputBox
              label="Shopify"
              toggle
              value={links.shopify.value}
              onChange={(value) => updateLink("shopify", "value", value)}
              enabled={links.shopify.enabled}
              onToggleChange={(enabled) => updateLink("shopify", "enabled", enabled)}
            />

            <InputBox
              label="Depop"
              toggle
              value={links.depop.value}
              onChange={(value) => updateLink("depop", "value", value)}
              enabled={links.depop.enabled}
              onToggleChange={(enabled) => updateLink("depop", "enabled", enabled)}
            />

            <InputBox
              label="Ebay"
              toggle
              value={links.ebay.value}
              onChange={(value) => updateLink("ebay", "value", value)}
              enabled={links.ebay.enabled}
              onToggleChange={(enabled) => updateLink("ebay", "enabled", enabled)}
            />
            <div style={{ marginTop: 20 }} />
          </div>
        </div>
      </div>

      <Divider />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: -5
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/shop")}
          style={{
            padding: "12px 30px",
            fontSize: 18,
            backgroundColor: "#f1f1f1",
            color: "#111",
            borderRadius: 50,
            fontWeight: 600,
            cursor: "pointer",
            border: "1px solid #ddd"
          }}
        >
          Back
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {message && (
            <span style={{ fontSize: 14, color: "#444" }}>
              {message}
            </span>
          )}

          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: "12px 40px",
              fontSize: 18,
              backgroundColor: "#ffffff",
              color: "#111",
              borderRadius: 50,
              fontWeight: 600,
              cursor: "pointer",
              border: "1px solid #ddd"
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || uploadingLogo}
            style={{
              padding: "12px 35px",
              fontSize: 16,
              backgroundColor: "#1c85fd",
              color: "#ffffff",
              borderRadius: 50,
              fontWeight: 620,
              cursor: saving || uploadingLogo ? "default" : "pointer",
              border: "none",
              opacity: saving || uploadingLogo ? 0.7 : 1
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}