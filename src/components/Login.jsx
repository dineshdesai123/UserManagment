import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "eve.holt@reqres.in" && password === "cityslicka") {
      localStorage.setItem("token", "fake-jwt-token");
      navigate("/users", { state: { message: "Login successful!" } }); // ✅ Pass message to Users page
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer autoClose={2000} /> {/* ✅ Ensures toast only affects this page */}

      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
