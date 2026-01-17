// http://localhost:7006/api/doc/apply
import axiosInstance from "./axiosInstance";


export const applyDoctor = (data) => {
    return axiosInstance.post("/doc/apply", data)
}

export const updateStatusDoctor = (docID, data) => {
    return axiosInstance.patch(`/doc/docStatus/${docID}`, data)
}