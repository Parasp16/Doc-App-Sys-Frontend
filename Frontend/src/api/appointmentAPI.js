import axiosInstance from "./axiosInstance";

export const saveAppointment = (data) => {
  return axiosInstance.post("/appointment/create", data)
}

export const updateAppointment = (id, data) => {
  return axiosInstance.put(`/appointment/updateAppoint/${id}`, data)
}

export const deleteAppointment = (id) => {
  return axiosInstance.delete(`/appointment/deleteAppoint/${id}`)

}
