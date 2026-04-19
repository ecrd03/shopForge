import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import InputBox from "../components/InputBox"
const API_BASE = import.meta.env.VITE_API_BASE_URL || ""


export default function Settings() {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))

  const [username, setUsername] = useState(user?.username || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setMessage("")

    if (!user?.id) {
      setMessage("User not found")
      return
    }

    if (password && password !== confirmPassword) {
      setMessage("Passwords do not match")
      return
    }

    try {
      setSaving(true)

      const profileResponse = await fetch(`${API_BASE}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          phone
        })
      })

      const profileData = await profileResponse.json()

      if (!profileResponse.ok) {
        setMessage(profileData.error || "Failed to update profile")
        return
      }

      const updatedUser = {
        ...user,
        ...profileData
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))

      if (password.trim()) {
        const passwordResponse = await fetch(`${API_BASE}/api/users/${user.id}/password`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            password
          })
        })

        const passwordData = await passwordResponse.json()

        if (!passwordResponse.ok) {
          setMessage(passwordData.error || "Failed to update password")
          return
        }
      }

      setPassword("")
      setConfirmPassword("")
      setMessage("Settings saved")
    } catch (err) {
      console.error(err)
      setMessage("Failed to save")
    } finally {
      setSaving(false)
    }
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
        name="Settings"
        user={{
          name: user?.username || user?.email || "Profile",
          avatarUrl: ""
        }}
        onSignOut={() => {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          navigate("/")
        }}
      />

      <div
        style={{
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          gap: 16
        }}
      >
        <InputBox label="Name" value={username} onChange={setUsername} />
        <InputBox label="Email" value={email} onChange={setEmail} />
        <InputBox label="Phone" value={phone} onChange={setPhone} />

        <div style={{ height: 1, backgroundColor: "#ddd", margin: "10px 0" }} />

        <InputBox
          label="New Password"
          value={password}
          onChange={setPassword}
        />
        <InputBox
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        {message && (
          <div style={{ color: "#444", fontSize: 14 }}>
            {message}
          </div>
        )}

        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="button"
            onClick={() => navigate(-1)}
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

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: "12px 35px",
              fontSize: 18,
              backgroundColor: "#1c85fd",
              color: "#ffffff",
              borderRadius: 50,
              fontWeight: 620,
              cursor: saving ? "default" : "pointer",
              border: "none",
              opacity: saving ? 0.7 : 1
            }}
          >
            {saving ? "Saving..." : "Save "}
          </button>
        </div>
      </div>
    </div>
  )
}