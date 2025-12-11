import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() 
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const endpoint = isLoginMode ? "/login" : "/register";

    try 
    {
      const response = await fetch(`http://localhost:3001${endpoint}`, 
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        });

      const data = await response.json();

      if (!response.ok) 
      {
        setError(data.error || "Unknown error occurred.");
        return;
      }

      // ✅ Guardar token y email
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);

      // 🔄 Refrescar app para actualizar el header
      window.location.href = "/";

    } catch (err) {
      console.error("Error:", err);
      setError("Server error");
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-screen p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">
        {isLoginMode ? "Log In" : "Register"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isLoginMode ? "Login" : "Register"}
        </button>
      </form>

      <button
        className="mt-4 text-sm text-blue-500 hover:underline"
        onClick={toggleMode}
      >
        {isLoginMode
          ? "Need an account? Register"
          : "Already registered? Log in"}
      </button>
    </div>
  );
}
