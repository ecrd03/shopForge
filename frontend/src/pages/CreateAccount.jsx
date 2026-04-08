import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Divider from "../components/divider"

export default function CreateAccount() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleCreateAccount() {
        setError("")

        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("Email and password are required")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            setLoading(true)

            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password
                })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "Create account failed")
                return
            }

            navigate("/")
        } catch (err) {
            console.error("Create account error:", err)
            setError("Could not connect to backend")
        } finally {
            setLoading(false)
        }
    }

    const rowStyle = {
        display: "flex",
        alignItems: "center",
        gap: 12
    }

    const labelStyle = {
        width: 170,
        fontSize: 20,
        fontWeight: 400,
        textAlign: "right",
        whiteSpace: "nowrap"
    }

    const inputStyle = {
        width: 260,
        padding: "12px 16px",
        borderRadius: 999,
        border: "1px solid #ccc",
        fontSize: 16,
        outline: "none"
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
            <div
                style={{
                    flex: 1,
                    backgroundImage: "url('/SFBanner.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />

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
                        gap: 24,
                        width: 440,
                        marginRight: 95
                    }}
                >
                    <h1 style={{ fontSize: 48, marginBottom: 5, marginLeft: 95 }}>
                        Create Account
                    </h1>

                    <div style={rowStyle}>
                        <span style={labelStyle}>Name</span>
                        <input
                            type="text"
                            style={inputStyle}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div style={rowStyle}>
                        <span style={labelStyle}>Email</span>
                        <input
                            type="text"
                            style={inputStyle}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div style={rowStyle}>
                        <span style={labelStyle}>Number</span>
                        <input
                            type="text"
                            style={inputStyle}
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>

                    <div style={{ width: "100%", margin: "10px 0", marginLeft: 95 }}>
                        <Divider />
                    </div>

                    <div style={rowStyle}>
                        <span style={labelStyle}>User Name</span>
                        <input
                            type="text"
                            style={inputStyle}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div style={rowStyle}>
                        <span style={labelStyle}>Password</span>
                        <input
                            type="password"
                            style={inputStyle}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div style={rowStyle}>
                        <span style={labelStyle}>Confirm Password</span>
                        <input
                            type="password"
                            style={inputStyle}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div style={{ color: "red", marginLeft: 95, fontSize: 15 }}>
                            {error}
                        </div>
                    )}

                    <div
                        style={{
                            display: "flex",
                            gap: 20,
                            marginTop: 10,
                            marginLeft: 95
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            style={{
                                padding: "12px 35px",
                                fontSize: 16,
                                backgroundColor: "#1c85fd",
                                color: "#ffffff",
                                borderRadius: 50,
                                fontWeight: 620,
                                cursor: "pointer",
                                border: "none"
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleCreateAccount}
                            disabled={loading}
                            style={{
                                padding: "12px 35px",
                                fontSize: 16,
                                backgroundColor: "#1c85fd",
                                color: "#ffffff",
                                borderRadius: 50,
                                fontWeight: 620,
                                cursor: "pointer",
                                border: "none",
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}