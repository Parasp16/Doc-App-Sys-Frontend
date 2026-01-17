import React, { useState, useEffect } from "react";
import { getDoctorList } from "../api/userAPI";
import { saveAppointment } from "../api/appointmentAPI";
import { toast } from "react-toastify";

const CreateAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [doctorID, setDoctorId] = useState("");

  async function fetchData() {
    try {
      const res = await getDoctorList();
      if (res.data.success) {
        setDoctors(res.data.doctors || res.data.data || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load doctors");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!dateTimeInput || !doctorID) {
      toast.error("Please select date & doctor");
      return;
    }

    try {
      const res = await saveAppointment({
        dateTime: dateTimeInput,
        doctorId: doctorID,
      });

      if (res.data.success) {
        toast.success("Appointment created successfully ✅");
        setDateTimeInput("");
        setDoctorId("");
      } else {
        toast.error(res.data.msg || "Appointment not created");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  /* ======================
        INLINE STYLES
     =======================*/
  const cardStyle = {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "30px",
    maxWidth: "520px",
    margin: "auto",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "25px",
    fontWeight: "600",
    color: "#2a5298",
  };

  const inputStyle = {
    borderRadius: "8px",
    padding: "10px",
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, #CE7E5A, #E09F7D)",
    border: "none",
    padding: "10px",
    fontWeight: "600",
    borderRadius: "8px",
    width: "100%",
    color: "#fff",
    transition: "0.3s",
  };

  return (
    <div style={cardStyle}>
      <h4 style={titleStyle}>📅 Create Appointment</h4>

      <form onSubmit={handleSubmit}>
        {/* Date & Time */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Select Date & Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            style={inputStyle}
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            required
          />
        </div>

        {/* Doctor List */}
        <div className="mb-4">
          <label className="form-label fw-semibold">
            Select Doctor
          </label>
          <select
            className="form-select"
            style={inputStyle}
            value={doctorID}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Create Appointment
        </button>
      </form>
    </div>
  );
};

export default CreateAppointment;
