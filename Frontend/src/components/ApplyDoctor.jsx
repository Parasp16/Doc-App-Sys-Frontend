import { useState } from "react"
import axiosInstance from "../api/axiosInstance"
import { toast } from "react-toastify"

const ApplyDoctor = () => {
  const [formData, setFormData] = useState({
    speciality: "",
    fees: ""
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.speciality || !formData.fees) {
      toast.error("All fields are required")
      return
    }

    try {
      setLoading(true)

      const res = await axiosInstance.post(
        "/doctor/apply-doctor",
        {
          speciality: formData.speciality,
          fees: Number(formData.fees)
        }
      )

      if (res.data.success) {
        toast.success("Doctor apply request sent successfully")
        setFormData({ speciality: "", fees: "" })
      } else {
        toast.error(res.data.msg || "Request failed")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: 450 }}>
      <h4 className="mb-3 text-center">Apply for Doctor</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Speciality</label>
          <input
            type="text"
            className="form-control"
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            placeholder="e.g. Cardiologist"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Consultation Fees</label>
          <input
            type="number"
            className="form-control"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            placeholder="e.g. 500"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      </form>
    </div>
  )
}

export default ApplyDoctor

