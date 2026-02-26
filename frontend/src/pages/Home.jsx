import { useEffect, useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("loading...");

  useEffect(() => {
    fetch("/api/test")
      .then(res => res.text())
      .then(data => setMsg(data))
      .catch(() => setMsg("failed to reach backend"));
  }, []);

  return (
    <>
      <h1>Home</h1>
      <p>{msg}</p>
    </>
  );
}
