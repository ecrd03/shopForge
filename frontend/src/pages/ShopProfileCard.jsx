import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import Header from "../components/Header"
import ToggleButton from "../components/ToggleButton"
const API_BASE = import.meta.env.VITE_API_BASE_URL || ""


function formatPhone(phone) {
    if (!phone) return "No phone"

    const cleaned = phone.replace(/\D/g, "")

    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }

    return phone
}


export default function ShopProfileCard() {
    const location = useLocation()
    const navigate = useNavigate()

    const shop = location.state?.shop
    const user = location.state?.user
    const [externalLinkEnabled, setExternalLinkEnabled] = useState(true)

    if (!shop) {
        return <div style={{ padding: 24 }}>No shop data</div>
    }

    function toSlug(value) {
        return String(value || "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
    }

    const shopSlug = toSlug(shop?.name || "")
    const contactName = user?.username || shop.name || "No name"
    const contactEmail = user?.email || "No email"
    const contactPhone = formatPhone(user?.phone)

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: 24,
                gap: 24,
                boxSizing: "border-box"
            }}
        >
            <Header
                name="Shop Profile Card"
                user={{ name: "Eric Admin Profile", avatarUrl: "" }}
            />

            <div
                style={{
                    border: "1px solid #d1d5db",
                    backgroundColor: "#fff",
                    padding: 28,
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    position: "relative",
                    minHeight: 400
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 24,
                        right: 24
                    }}
                >
                    <ToggleButton />
                </div>

                <div style={{ display: "flex", gap: 40 }}>
                    <div
                        style={{
                            width: 220,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: 12
                        }}
                    >
                        <div
                            style={{
                                width: 220,
                                height: 220,
                                border: "1px solid #d1d5db",
                                borderRadius: 26,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            {shop.logoUrl ? (
                                <img
                                    src={shop.logoUrl}
                                    alt={shop.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 26,
                                    }}
                                />
                            ) : (
                                <div style={{ fontSize: 38 }}>
                                    {shop.name?.[0]?.toUpperCase()}
                                </div>
                            )}
                        </div>

                        <div
                            style={{
                                fontSize: 18,
                                color: "#4b5563",
                                marginLeft: 6
                            }}
                        >
                            {"Shop " + (shop.id || "Shop Name")}                        </div>
                    </div>

                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 24
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 30
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 42,
                                    fontWeight: 500
                                }}
                            >
                                {shop.name || "Shop Name"}
                            </div>

                            <button
                                type="button"
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 12,
                                    border: "1px solid #d1d5db",
                                    backgroundColor: "#fff",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                onClick={() => {
                                    const shopUrl = `https://${shopSlug}.shop-sf.com`
                                    window.open(shopUrl, "_blank")
                                }}
                            >
                                <img
                                    src="/Link.png"
                                    alt="External Link"
                                    style={{ width: 26, height: 26 }}
                                />
                            </button>
                        </div>

                        <div>{contactName}</div>

                        <div style={{ fontSize: 22 }}>
                            {shop.productCount ?? 0} products
                        </div>

                        <div style={{ height: 1, backgroundColor: "#d1d5db" }} />

                        <div>
                            <div style={{ fontSize: 28, marginBottom: 16 }}>
                                Contact Information
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "120px 1fr",
                                    rowGap: 18,
                                    columnGap: 18
                                }}
                            >
                                <div>Email</div>
                                <div>{contactEmail}</div>

                                <div>Phone</div>
                                <div>{contactPhone}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate(-1)}
                style={{
                    alignSelf: "flex-start",
                    marginTop: 20,
                    padding: "10px 22px",
                    borderRadius: 999,
                    border: "1px solid #9ca3af",
                    backgroundColor: "#fff",
                    cursor: "pointer"
                }}
            >
                Back
            </button>
        </div>
    )
}