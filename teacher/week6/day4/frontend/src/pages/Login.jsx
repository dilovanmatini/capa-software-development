import { useState } from "react";
import { saveToken } from "../services/auth";

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin () {
        if (email === "" || password === ""){
            setError("Please fill in all fields");
            return;
        }
        
        setError("");

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || "Login failed");
                return;
            }

            const data = await response.json();
            saveToken(data.token);
            window.location.href = "/dashboard";
        } catch (e) {
            setError("An error occurred" + e.message);
        }
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="email"
                placeholder="Email"
                className="block p-2 mt-3 border w-64"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="block p-2 mt-3 border w-64"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="bg-blue-900 text-white p-2 mt-3">Login</button>
        </div>
    );
}

export default Login;
