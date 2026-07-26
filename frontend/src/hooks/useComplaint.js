import API from "../services/api";

export const getComplaints = async () => {

  const response = await API.get("/complaints");

  return response.data;

};

export const createComplaint = async (complaint) => {

  const response = await API.post(
    "/complaints",
    complaint
  );

  return response.data;

};