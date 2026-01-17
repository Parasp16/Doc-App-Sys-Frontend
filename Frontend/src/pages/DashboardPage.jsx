import React, { useEffect, useState } from "react";
import {
  FaSignOutAlt,
  FaUsers,
  FaPlus,
  FaUserMd,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../api/userAPI";

// Components
import Profile from "../components/Profile";
import Appointments from "../components/Appointments";
import CreateAppointment from "../components/CreateAppointment";
import DoctorsList from "../components/DoctorsList";
import UsersList from "../components/UsersList";
import ApplyDoctor from "../components/ApplyDoctor";
import AdminDoctorRequests from "../components/AdminDoctorRequests";

const DashboardNavbar = () => {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token6163");
    navigate("/", { replace: true });
  };

  const fetchUser = async () => {
    const res = await getLoggedUser();
    if (res?.data?.success) {
      setUser(res.data.user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /* ======================
     PAGE CONTENT
  =======================*/
  const renderContent = () => {
    if (!user) return null;

    switch (activePage) {
      case "profile":
        return <Profile />;
      case "appointments":
        return <Appointments />;
      case "create-appointment":
        return <CreateAppointment />;
      case "doctors":
        return <DoctorsList />;
      case "users":
        return <UsersList />;
      case "apply-doctor":
        return <ApplyDoctor />;
      case "doctor-requests":
        return <AdminDoctorRequests />;
      default:
        return <h4>Welcome to Dashboard</h4>;
    }
  };

  /* ======================
     MENU BY ROLE
  =======================*/
  const renderMenu = () => {
    if (!user) return null;

    if (user.role === "Admin") {
      return (
        <>
          <MenuBtn label="Profile" onClick={() => setActivePage("profile")} />
          <MenuBtn
            label="Appointments"
            icon={<FaCalendarAlt />}
            onClick={() => setActivePage("appointments")}
          />
          <MenuBtn
            label="All Doctors"
            icon={<FaUserMd />}
            onClick={() => setActivePage("doctors")}
          />
          <MenuBtn
            label="All Users"
            icon={<FaUsers />}
            onClick={() => setActivePage("users")}
          />
          <MenuBtn
            label="Create Appointment"
            icon={<FaPlus />}
            onClick={() => setActivePage("create-appointment")}
          />
          <MenuBtn
            label="Doctor Requests"
            icon={<FaUserMd />}
            onClick={() => setActivePage("doctor-requests")}
          />
        </>
      );
    }

    if (user.role === "Doctor") {
      return (
        <>
          <MenuBtn label="Profile" onClick={() => setActivePage("profile")} />
          <MenuBtn
            label="Create Appointment"
            icon={<FaPlus />}
            onClick={() => setActivePage("create-appointment")}
          />
          <MenuBtn
            label="Appointments"
            icon={<FaCalendarAlt />}
            onClick={() => setActivePage("appointments")}
          />
        </>
      );
    }

    return (
      <>
        <MenuBtn label="Profile" onClick={() => setActivePage("profile")} />
        <MenuBtn
          label="Create Appointment"
          icon={<FaPlus />}
          onClick={() => setActivePage("create-appointment")}
        />
        <MenuBtn
          label="Appointments"
          icon={<FaCalendarAlt />}
          onClick={() => setActivePage("appointments")}
        />
        <MenuBtn
          label="Apply for Doctor"
          icon={<FaUserMd />}
          onClick={() => setActivePage("apply-doctor")}
        />
      </>
    );
  };

  /* ======================
     STYLES
  =======================*/
  const sidebarStyle = {
    background: "linear-gradient(180deg, #1e3c72, #2a5298)",
    minHeight: "100vh",
  };

  const contentStyle = {
    background: "#f4f6f9",
    minHeight: "100vh",
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "25px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* SIDEBAR */}
        <div className="col-md-3 col-lg-2 text-white p-4" style={sidebarStyle}>
          <div className="text-center mb-4">
            <div
              style={{
                width: 65,
                height: 65,
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
              {user?.name?.charAt(0)}
            </div>
            <h6 className="mt-2">{user?.name}</h6>
            <small>{user?.role}</small>
          </div>

          <ul className="nav flex-column">
            {renderMenu()}

            <hr className="text-light" />

            <li className="nav-item">
              <button
                className="btn btn-outline-light w-100 text-start"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="col-md-9 col-lg-10 p-4" style={contentStyle}>
          <div style={cardStyle}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

/* ======================
   MENU BUTTON
======================*/
const MenuBtn = ({ label, icon, onClick }) => (
  <li className="nav-item mb-2">
    <button
      onClick={onClick}
      className="btn w-100 text-start text-white"
      style={{
        background: "rgba(255,255,255,0.18)",
        borderRadius: "8px",
        padding: "10px 14px",
        transition: "0.3s",
      }}
      onMouseEnter={(e) =>
        (e.target.style.background = "rgba(255,255,255,0.35)")
      }
      onMouseLeave={(e) =>
        (e.target.style.background = "rgba(255,255,255,0.18)")
      }
    >
      {icon && <span className="me-2">{icon}</span>}
      {label}
    </button>
  </li>
);

export default DashboardNavbar;
