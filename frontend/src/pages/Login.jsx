import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()

    return (
        <div
            style={{
                height: "calc(100vh - 60px)",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div
                style={{
                    transform: `translateY(${-90}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 24
                }}


            ><h1>Login</h1>
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
                    <button onClick={() => navigate("/admin")}>
                        Admin Dashboard
                    </button>

                    <button onClick={() => navigate("/shop")}>
                        Shop Dashboard
                    </button>
                </div>
            </div>
        </div>
    )
}
