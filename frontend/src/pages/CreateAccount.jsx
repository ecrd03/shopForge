import { useNavigate } from "react-router-dom"
import Divider from "../components/divider"


export default function CreateAccount() {
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
                    <h1>Create Account</h1>
                    {/* Name*/}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12
                        }}
                    >
                        <span
                            style={{
                                fontSize: 20,
                                fontWeight: 400,
                                whiteSpace: "nowrap"
                            }}
                        >
                            Name
                        </span>
                        <input
                            type="text"
                            style={{
                                width: 260,
                                padding: "12px 16px",
                                borderRadius: 999,
                                border: "1px solid #ccc",
                                fontSize: 16,
                                outline: "none"
                            }}
                        />
                        </div>
                    {/* Email*/}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12
                        }}
                    >
                        <span
                            style={{
                                fontSize: 20,
                                fontWeight: 400,
                                whiteSpace: "nowrap"
                            }}
                        >
                            Email
                        </span>
                        <input
                            type="text"
                            style={{
                                width: 260,
                                padding: "12px 16px",
                                borderRadius: 999,
                                border: "1px solid #ccc",
                                fontSize: 16,
                                outline: "none"
                            }}
                        />
                        </div>
                    {/* Number*/}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12
                        }}
                    >
                        <span
                            style={{
                                fontSize: 20,
                                fontWeight: 400,
                                whiteSpace: "nowrap"
                            }}
                        >
                            Number
                        </span>
                        <input
                            type="text"
                            style={{
                                width: 260,
                                padding: "12px 16px",
                                borderRadius: 999,
                                border: "1px solid #ccc",
                                fontSize: 16,
                                outline: "none"
                            }}
                        />
                        </div>
                    {/* Dividor*/}
                    {/* line dividor*/}
                          <Divider />

                    {/* User Name*/}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12
                        }}
                    >
                        <span
                            style={{
                                fontSize: 20,
                                fontWeight: 400,
                                whiteSpace: "nowrap"
                            }}
                        >
                            User Name
                        </span>
                        <input
                            type="text"
                            style={{
                                width: 260,
                                padding: "12px 16px",
                                borderRadius: 999,
                                border: "1px solid #ccc",
                                fontSize: 16,
                                outline: "none"
                            }}
                        />
                        </div>
                    {/*password*/}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12
                        }}
                    >
                        <span
                            style={{
                                fontSize: 20,
                                fontWeight: 400,
                                whiteSpace: "nowrap"
                            }}
                        >
                            Password
                        </span>
                        <input
                            type="password"
                            style={{
                                width: 260,
                                padding: "12px 16px",
                                borderRadius: 999,
                                border: "1px solid #ccc",
                                fontSize: 16,
                                outline: "none"
                            }}
                        />
                        </div>
                    {/* Confirm password*/}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12
                        }}
                    >
                        <span
                            style={{
                                fontSize: 20,
                                fontWeight: 400,
                                whiteSpace: "nowrap"
                            }}
                        >
                            Confirm Password
                        </span>
                        <input
                            type="password"
                            style={{
                                width: 260,
                                padding: "12px 16px",
                                borderRadius: 999,
                                border: "1px solid #ccc",
                                fontSize: 16,
                                outline: "none"
                            }}
                        />
                        </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 20
                        }}
                    >

                        {/* Cancel*/}
                        <button
                            type="button"
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

                        {/* Create*/}
                        <button
                            type="button"
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
