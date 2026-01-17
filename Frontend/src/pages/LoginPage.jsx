import { useState } from "react";
import { loginUser } from "../api/userAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      if (res.data.success) {
        toast.success("Login successful ✅");
        localStorage.setItem("token6163", res.data.token);
        navigate("/dashboard");
      } else {
        toast.error(res.data.msg || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed");
    }
  };

  
  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    color: "#fff",
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.9)",
    borderRadius: "8px",
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    border: "none",
    color: "#fff",
    padding: "10px",
    fontWeight: "600",
    borderRadius: "8px",
    transition: "0.3s",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle} className="p-4">

        <div className="text-center mb-4">
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "#fff",
              color: "#2a5298",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: "bold",
              margin: "auto",
            }}
          >
            🔐
          </div>
          <h4 className="mt-3">Welcome Back</h4>
          <small>Login to continue</small>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              style={inputStyle}
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              style={inputStyle}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.target.style.opacity = "0.85")
            }
            onMouseLeave={(e) =>
              (e.target.style.opacity = "1")
            }
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="mb-1">
            Don’t have an account?
          </p>
          <span
            style={{
              cursor: "pointer",
              color: "#ffd1dc",
              fontWeight: "600",
            }}
            onClick={() => navigate("/register")}
          >
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

