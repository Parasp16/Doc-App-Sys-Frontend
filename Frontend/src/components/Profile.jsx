import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:7006/uploads/";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user info
  useEffect(() => {
    axiosInstance.get("/user/getUserInfo").then((res) => {
      if (res.data.success) {
        setUser(res.data.user);
      }
    });
  }, []);

  // Upload profile image
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await axiosInstance.put(
        "/user/update-profile-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast.success("Profile image updated ✅");
        setUser(res.data.user);
      }
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading profile...</p>
      </div>
    );
  }

  /* ======================
        INLINE STYLES
     =======================*/
  const cardStyle = {
    maxWidth: "420px",
    margin: "auto",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "30px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
  };

  const avatarWrapper = {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    border: "5px solid #2a5298",
    padding: "4px",
    margin: "auto",
  };

  const infoRow = {
    background: "#f4f6f9",
    padding: "10px 14px",
    borderRadius: "8px",
    marginBottom: "10px",
  };

  return (
    <div style={cardStyle}>
      <h4 className="text-center mb-4" style={{ color: "#2a5298" }}>
        👤 My Profile
      </h4>

      {/* Profile Image */}
      <div className="text-center mb-3">
        <div style={avatarWrapper}>
          <img
            src={
              user.imagePath
                ? user.imagePath.startsWith("http")
                  ? user.imagePath
                  : BASE_URL + user.imagePath
                : "https://via.placeholder.com/150"
            }
            alt="profile"
            width="150"
            height="150"
            className="rounded-circle"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Upload */}
      <input
        type="file"
        className="form-control mb-4"
        onChange={handleUpload}
        disabled={loading}
      />

      {/* Info */}
      <div style={infoRow}>
        <b>Name:</b> {user.name}
      </div>
      <div style={infoRow}>
        <b>Email:</b> {user.email}
      </div>
      <div style={infoRow}>
        <b>Role:</b> {user.role}
      </div>

      {loading && (
        <p className="text-center mt-3 text-muted">
          Uploading image...
        </p>
      )}
    </div>
  );
};

export default Profile;
