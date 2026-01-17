import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { getLoggedUser } from "../api/userAPI";
import { toast } from "react-toastify";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [newDateTime, setNewDateTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getLoggedUser();
        const loggedUser = userRes.data.user;
        setUser(loggedUser);

        const endpoint =
          loggedUser.role === "Doctor"
            ? "/appointment/doctor"
            : "/appointment/user";

        const res = await axiosInstance.get(endpoint);
        if (res.data.success) {
          setAppointments(res.data.appointments);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ======================
        ACTION HANDLERS
     =======================*/
  const handleUpdate = async (id) => {
    try {
      const res = await axiosInstance.put(
        `/appointment/update/${id}`,
        { dateTime: newDateTime }
      );

      if (res.data.success) {
        toast.success("Appointment updated ✅");
        setAppointments(prev =>
          prev.map(app =>
            app._id === id ? { ...app, dateTime: newDateTime } : app
          )
        );
        setEditingId(null);
        setNewDateTime("");
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      const res = await axiosInstance.delete(`/appointment/delete/${id}`);
      if (res.data.success) {
        toast.success("Appointment cancelled");
        setAppointments(prev => prev.filter(app => app._id !== id));
      }
    } catch {
      toast.error("Cancel failed");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axiosInstance.put(
        `/appointment/status/${id}`,
        { status }
      );
      if (res.data.success) {
        toast.success(`Appointment ${status}`);
        setAppointments(prev =>
          prev.map(app =>
            app._id === id ? { ...app, status } : app
          )
        );
      }
    } catch {
      toast.error("Action failed");
    }
  };

  const handleDoctorDelete = async (id) => {
    if (!window.confirm("Delete permanently?")) return;
    try {
      const res = await axiosInstance.delete(
        `/appointment/doctor/delete/${id}`
      );
      if (res.data.success) {
        toast.success("Appointment deleted");
        setAppointments(prev => prev.filter(app => app._id !== id));
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleAdminUpdate = async (id, dateTime) => {
    try {
      const res = await axiosInstance.put(
        `/appointment/admin/update/${id}`,
        { dateTime }
      );
      if (res.data.success) {
        toast.success("Updated by admin");
        setAppointments(prev =>
          prev.map(a =>
            a._id === id ? { ...a, dateTime } : a
          )
        );
      }
    } catch {
      toast.error("Admin update failed");
    }
  };

  const handleAdminCancel = async (id) => {
    if (!window.confirm("Cancel appointment?")) return;
    try {
      const res = await axiosInstance.delete(
        `/appointment/admin/delete/${id}`
      );
      if (res.data.success) {
        toast.success("Cancelled by admin");
        setAppointments(prev => prev.filter(a => a._id !== id));
      }
    } catch {
      toast.error("Admin cancel failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading appointments...</p>
      </div>
    );
  }

  /* ======================
        INLINE STYLES
     =======================*/
  const cardStyle = {
    background: "#fff",
    borderRadius: "14px",
    padding: "18px",
    marginBottom: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
  };

  const badgeStyle = (status) => ({
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "13px",
    color: "#fff",
    background:
      status === "approved"
        ? "#28a745"
        : status === "rejected"
        ? "#dc3545"
        : "#ffc107",
  });

  return (
    <div>
      <h3 className="mb-4" style={{ color: "#2a5298" }}>
        {user?.role === "Doctor"
          ? "🧑‍⚕️ Doctor Appointments"
          : user?.role === "Admin"
          ? "👑 All Appointments"
          : "📅 My Appointments"}
      </h3>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        appointments.map((app) => (
          <div key={app._id} style={cardStyle}>
            <div className="d-flex justify-content-between">
              <p>
                <b>
                  {user?.role === "Doctor"
                    ? "Patient"
                    : "Doctor"}:
                </b>{" "}
                {user?.role === "Doctor"
                  ? app.userId?.name
                  : app.doctorId?.name}
              </p>
              <span style={badgeStyle(app.status)}>
                {app.status}
              </span>
            </div>

            <p>
              <b>Date & Time:</b>{" "}
              {new Date(app.dateTime).toLocaleString()}
            </p>

            {/* DOCTOR */}
            {user?.role === "Doctor" && (
              <>
                {app.status === "pending" && (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() =>
                        handleStatusChange(app._id, "approved")
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() =>
                        handleStatusChange(app._id, "rejected")
                      }
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDoctorDelete(app._id)}
                >
                  Delete
                </button>
              </>
            )}

            {/* ADMIN */}
            {user?.role === "Admin" && (
              <>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    handleAdminUpdate(app._id, app.dateTime)
                  }
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleAdminCancel(app._id)
                  }
                >
                  Cancel
                </button>
              </>
            )}

            {/* USER */}
            {user?.role === "User" && (
              <>
                {editingId === app._id ? (
                  <>
                    <input
                      type="datetime-local"
                      className="form-control mb-2"
                      value={newDateTime}
                      onChange={(e) =>
                        setNewDateTime(e.target.value)
                      }
                    />
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleUpdate(app._id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        setEditingId(app._id);
                        setNewDateTime(
                          new Date(app.dateTime)
                            .toISOString()
                            .slice(0, 16)
                        );
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCancel(app._id)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;
