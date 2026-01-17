import { useState } from "react";
import { registerUser } from "../api/userAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
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
      const res = await registerUser(formData);

      if (res.data.success) {
        toast.success("Registration successful 🎉");
        navigate("/");
      } else {
        toast.error(res.data.msg || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  /* ======================
        INLINE STYLES
     =======================*/
  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "480px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    borderRadius: "18px",
    boxShadow: "0 20px 45px rgba(0,0,0,0.35)",
    color: "#fff",
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "8px",
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, #ff9966, #ff5e62)",
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

        {/* Header */}
        <div className="text-center mb-4">
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "#fff",
              color: "#764ba2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: "bold",
              margin: "auto",
            }}
          >
            📝
          </div>
          <h4 className="mt-3">Create Account</h4>
          <small>Register to get started</small>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name *</label>
            <input
              type="text"
              className="form-control"
              style={inputStyle}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email *</label>
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
            <label className="form-label">Password *</label>
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

          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input
              type="text"
              className="form-control"
              style={inputStyle}
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              style={inputStyle}
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={buttonStyle}
            onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="mb-1">Already have an account?</p>
          <span
            style={{
              cursor: "pointer",
              color: "#ffe0e9",
              fontWeight: "600",
            }}
            onClick={() => navigate("/")}
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
