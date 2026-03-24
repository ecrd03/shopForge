import { useEffect, useState } from "react"
import Divider from "../components/divider"
import Header from "../components/Header"
import InputBox from "../components/InputBox"
import Theme from "../components/Theme"
import { useNavigate } from "react-router-dom"

export default function EditShop() {
  const navigate = useNavigate()
  const shopId = 1

  const [shopName, setShopName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("Theme1")
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
  const [message, setMessage] = useState("")

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
      try {
        const response = await fetch(`http://localhost:8080/api/shops/${shopId}`)
        if (!response.ok) {
          throw new Error("Failed to load shop")
        }

        const data = await response.json()

        setShopName(data.name || "")
        setDescription(data.description || "")
        setSelectedTheme(data.theme || "Theme1")

        const loadedLinks = {
          instagram: { enabled: true, value: data.instagramUrl || "" },
          facebook: { enabled: true, value: data.facebookUrl || "" },
          twitter: { enabled: true, value: data.twitterUrl || "" },
          tiktok: { enabled: true, value: data.tiktokUrl || "" },
          etsy: { enabled: true, value: data.etsyUrl || "" },
          shopify: { enabled: true, value: data.shopifyUrl || "" },
          depop: { enabled: true, value: data.depopUrl || "" },
          ebay: { enabled: true, value: data.ebayUrl || "" }
        }

        setLinks(loadedLinks)

        setOriginalShop({
          name: data.name || "",
          description: data.description || "",
          theme: data.theme || "Theme1",
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
          logoUrl: "",
          instagramUrl: links.instagram.enabled ? links.instagram.value : "",
          facebookUrl: links.facebook.enabled ? links.facebook.value : "",
          twitterUrl: links.twitter.enabled ? links.twitter.value : "",
          tiktokUrl: links.tiktok.enabled ? links.tiktok.value : "",
          etsyUrl: links.etsy.enabled ? links.etsy.value : "",
          shopifyUrl: links.shopify.enabled ? links.shopify.value : "",
          depopUrl: links.depop.enabled ? links.depop.value : "",
          ebayUrl: links.ebay.enabled ? links.ebay.value : ""
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
    setLinks(originalShop.links)
    setMessage("Changes were discarded.")
  }

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
        gap: 24,
        boxSizing: "border-box"
      }}
    >
      <Header
        name="Edit Shop Profile"
        user={{ name: "Eric Shop Profile", avatarUrl: "" }}
        onSignOut={() => {
          localStorage.removeItem("token")
          navigate("/login")
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
            <button
              type="button"
              style={{
                width: 100,
                height: 100,
                borderRadius: 60,
                border: "1.2px solid #0d4bbf9e",
                backgroundColor: "#755ddd",
                flexShrink: 0,
                cursor: "pointer"
              }}
            />

            <InputBox
              label="Enter Shop Name"
              value={shopName}
              onChange={setShopName}
            />
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
                gap: 22
              }}
            >
              <Theme
                colorA="#ffffff"
                colorB="#2d2c2c"
                borderColor={selectedTheme === "Theme1" ? "rgb(11, 31, 181)" : "#0d4bbf9e"}
                onClick={() => setSelectedTheme("Theme1")}
                size={selectedTheme === "Theme1" ? 65 : 50}
              />
              <Theme
                colorA="#000000"
                colorB="#ffffff"
                borderColor={selectedTheme === "Theme2" ? "rgb(11, 31, 181)" : "#0d4bbf9e"}
                onClick={() => setSelectedTheme("Theme2")}
                size={selectedTheme === "Theme2" ? 65 : 50}
              />
              <Theme
                colorA="#061a9a"
                colorB="#17b6bc"
                borderColor={selectedTheme === "Theme3" ? "rgb(11, 31, 181)" : "#0d4bbf9e"}
                onClick={() => setSelectedTheme("Theme3")}
                size={selectedTheme === "Theme3" ? 65 : 50}
              />
              <Theme
                colorA="#000000"
                colorB="#ee4c4c"
                borderColor={selectedTheme === "Theme4" ? "rgb(11, 31, 181)" : "#0d4bbf9e"}
                onClick={() => setSelectedTheme("Theme4")}
                size={selectedTheme === "Theme4" ? 65 : 50}
              />
              <Theme
                colorA="#ffffff"
                colorB="#f3a0ed"
                borderColor={selectedTheme === "Theme5" ? "rgb(11, 31, 181)" : "#0d4bbf9e"}
                onClick={() => setSelectedTheme("Theme5")}
                size={selectedTheme === "Theme5" ? 65 : 50}
              />
              <Theme
                colorA="#ffffff"
                colorB="#5162ea"
                borderColor={selectedTheme === "Theme6" ? "rgb(11, 31, 181)" : "#0d4bbf9e"}
                onClick={() => setSelectedTheme("Theme6")}
                size={selectedTheme === "Theme6" ? 65 : 50}
              />
              <Theme
                colorA="#ffffff"
                colorB="#9e65ef"
                borderColor={selectedTheme === "Theme7" ? "rgb(11, 31, 181)" : "#0d4bbf9e"}
                onClick={() => setSelectedTheme("Theme7")}
                size={selectedTheme === "Theme7" ? 65 : 50}
              />
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
              marginTop: 18,
              display: "flex",
              flexDirection: "column",
              gap: 5,
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
              onToggleChange={(enabled) =>
                updateLink("instagram", "enabled", enabled)
              }
            />

            <InputBox
              label="Facebook"
              toggle
              value={links.facebook.value}
              onChange={(value) => updateLink("facebook", "value", value)}
              enabled={links.facebook.enabled}
              onToggleChange={(enabled) =>
                updateLink("facebook", "enabled", enabled)
              }
            />

            <InputBox
              label="Twitter"
              toggle
              value={links.twitter.value}
              onChange={(value) => updateLink("twitter", "value", value)}
              enabled={links.twitter.enabled}
              onToggleChange={(enabled) =>
                updateLink("twitter", "enabled", enabled)
              }
            />

            <InputBox
              label="TikTok"
              toggle
              value={links.tiktok.value}
              onChange={(value) => updateLink("tiktok", "value", value)}
              enabled={links.tiktok.enabled}
              onToggleChange={(enabled) =>
                updateLink("tiktok", "enabled", enabled)
              }
            />

            <InputBox
              label="Etsy"
              toggle
              value={links.etsy.value}
              onChange={(value) => updateLink("etsy", "value", value)}
              enabled={links.etsy.enabled}
              onToggleChange={(enabled) =>
                updateLink("etsy", "enabled", enabled)
              }
            />

            <InputBox
              label="Shopify"
              toggle
              value={links.shopify.value}
              onChange={(value) => updateLink("shopify", "value", value)}
              enabled={links.shopify.enabled}
              onToggleChange={(enabled) =>
                updateLink("shopify", "enabled", enabled)
              }
            />

            <InputBox
              label="Depop"
              toggle
              value={links.depop.value}
              onChange={(value) => updateLink("depop", "value", value)}
              enabled={links.depop.enabled}
              onToggleChange={(enabled) =>
                updateLink("depop", "enabled", enabled)
              }
            />

            <InputBox
              label="Ebay"
              toggle
              value={links.ebay.value}
              onChange={(value) => updateLink("ebay", "value", value)}
              enabled={links.ebay.enabled}
              onToggleChange={(enabled) =>
                updateLink("ebay", "enabled", enabled)
              }
            />
          </div>
        </div>
      </div>

      <Divider />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: -8
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
            disabled={saving}
            style={{
              padding: "12px 35px",
              fontSize: 16,
              backgroundColor: "#1c85fd",
              color: "#ffffff",
              borderRadius: 50,
              fontWeight: 620,
              cursor: saving ? "default" : "pointer",
              border: "none",
              opacity: saving ? 0.7 : 1
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}