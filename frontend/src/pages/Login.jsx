import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin() {
    setError("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) {
        // backend might return text or json, keep it simple
        throw new Error("Invalid email or password")
      }

      const user = await res.json()
      console.log("login ok:", user)

      // for now, just route by role
      if (user.role === "ADMIN") navigate("/admin")
      else navigate("/shop")
    } catch (e) {
      setError(e.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflow: "hidden"
      }}
    >
      {/* Left Image Banner */}
      <div
        style={{
          flex: 1,
          backgroundImage: "url('/SFBanner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* Right Login */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24
          }}
        >
          <h1>Login</h1>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: 260,
              padding: "12px 16px",
              borderRadius: 999,
              border: "1px solid #ccc",
              fontSize: 16,
              outline: "none"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin()
            }}
            style={{
              width: 260,
              padding: "12px 16px",
              borderRadius: 999,
              border: "1px solid #ccc",
              fontSize: 16,
              outline: "none"
            }}
          />

          {error ? (
            <div style={{ color: "crimson", fontSize: 14 }}>{error}</div>
          ) : null}

          <button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            style={{
              width: 260,
              padding: "12px 16px",
              borderRadius: 999,
              border: "1px solid #111",
              background: loading ? "#ddd" : "#111",
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <span
            onClick={() => navigate("/createAccount")}
            style={{
              color: "blue",
              cursor: "pointer"
            }}
          >
            Create Account
          </span>
        </div>
      </div>
    </div>
  )
}