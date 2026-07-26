import axios from "axios";

const API = "http://localhost:5000/api/medical-records";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getMedicalRecords = async () => {
  const response = await axios.get(API, getToken());
  return response.data;
};

export const uploadMedicalRecord = async (record) => {
  const response = await axios.post(API, record, getToken());
  return response.data;
};

export const deleteMedicalRecord = async (id) => {
  const response = await axios.delete(`${API}/${id}`, getToken());
  return response.data;
};