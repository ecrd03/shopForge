import { useNavigate } from "react-router-dom"
import Divider from "../components/divider"

export default function CreateAccount() {
    const navigate = useNavigate()

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
            {/* Left Image Banner */}
            <div
                style={{
                    flex: 1,
                    backgroundImage: "url('/SFBanner.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",

                }}
            />

            {/* Right Form */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

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

                    {/* Name */}
                    <div style={rowStyle}>
                        <span style={labelStyle}>Name</span>
                        <input type="text" style={inputStyle} />
                    </div>

                    {/* Email */}
                    <div style={rowStyle}>
                        <span style={labelStyle}>Email</span>
                        <input type="text" style={inputStyle} />
                    </div>

                    {/* Number */}
                    <div style={rowStyle}>
                        <span style={labelStyle}>Number</span>
                        <input type="text" style={inputStyle} />
                    </div>

                    {/* Divider */}
                    <div style={{ width: "100%", margin: "10px 0", marginLeft: 95 }}>
                        <Divider />
                    </div>

                    {/* Username */}
                    <div style={rowStyle}>
                        <span style={labelStyle}>User Name</span>
                        <input type="text" style={inputStyle} />
                    </div>

                    {/* Password */}
                    <div style={rowStyle}>
                        <span style={labelStyle}>Password</span>
                        <input type="password" style={inputStyle} />
                    </div>

                    {/* Confirm Password */}
                    <div style={rowStyle}>
                        <span style={labelStyle}>Confirm Password</span>
                        <input type="password" style={inputStyle} />
                    </div>

                    {/* Buttons */}
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
                            Create
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}