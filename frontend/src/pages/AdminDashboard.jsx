import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import ShopCard from "../components/ShopCard"

export default function AdminDashboard() {
  const navigate = useNavigate()

  const [shops, setShops] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError("")

        const [shopsRes, usersRes] = await Promise.all([
          fetch("http://localhost:8080/api/shops"),
          fetch("http://localhost:8080/api/users")
        ])

        if (!shopsRes.ok) {
          throw new Error("Failed to load shops")
        }

        if (!usersRes.ok) {
          throw new Error("Failed to load users")
        }

        const shopsData = await shopsRes.json()
        const usersData = await usersRes.json()

        console.log("shops:", shopsData)
        console.log("users:", usersData)

        const formattedShops = shopsData.map((shop) => ({
          ...shop,
          logoUrl: shop.logoUrl,
          productCount: shop.productCount ?? shop.products?.length ?? 0
        }))

        setShops(formattedShops)
        setUsers(usersData)
      } catch (err) {
        console.error("Load dashboard data error:", err)
        setError("Could not load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  function handleOpenShop(shop) {
    const user = users.find((u) => u.shopId === shop.id)

    navigate("/profilecard", {
      state: {
        shop,
        user: user || null
      }
    })
  }

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
        name="Admin Dashboard"
        user={{ name: "Eric Admin Profile", avatarUrl: "" }}
      />

      <SearchBar />

      {loading && <div>Loading shops...</div>}
      {error && <div style={{ color: "crimson" }}>{error}</div>}

      {!loading && !error && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "flex-start",
            alignItems: "flex-start"
          }}
        >
          {shops.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={{
                ...shop,
                username:
                  users.find((u) => u.shopId === shop.id)?.username || `shop${shop.id}`
              }}
              onClick={() => handleOpenShop(shop)}
            />
          ))}
        </div>
      )}
    </div>
  )
}