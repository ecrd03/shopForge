import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()

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
                    {/* userName Button*/}
                    <input
                        type="text"
                        placeholder="Username"
                        style={{
                            width: 260,
                            padding: "12px 16px",
                            borderRadius: 999,
                            border: "1px solid #ccc",
                            fontSize: 16,
                            outline: "none"
                        }}
                    />
                    {/* password Button*/}
                    <input
                        type="password"
                        placeholder="Password"
                        style={{
                            width: 260,
                            padding: "12px 16px",
                            borderRadius: 999,
                            border: "1px solid #ccc",
                            fontSize: 16,
                            outline: "none"
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 20
                        }}
                    >
                        {/* Button actions*/}
                        <button onClick={() => navigate("/admin")}>
                            Admin Dashboard
                        </button>

                        <button onClick={() => navigate("/shop")}>
                            Shop Dashboard
                        </button>

                    </div>

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
