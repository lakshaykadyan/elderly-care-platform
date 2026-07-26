import API from "../services/api";

export const getPatientProfile = async () => {
  try {
    const response = await API.get("/patient-profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching patient profile:", error);
    throw error;
  }
};

export const savePatientProfile = async (data) => {
  try {
    const response = await API.post("/patient-profile", data);
    return response.data;
  } catch (error) {
    console.error("Error saving patient profile:", error);
    throw error;
  }
};