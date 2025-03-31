import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";
import "./App.css"; // Import CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      <ToastContainer /> {/* ✅ Ensure this is present for toasts */}
    </div>
  );
}

export default App;