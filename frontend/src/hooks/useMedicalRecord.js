import API from "../services/api";

// Get all medical records
export const getMedicalRecords = async () => {
  try {
    const response = await API.get("/medical-records");
    return response.data;
  } catch (error) {
    console.error("Error fetching medical records:", error);
    throw error;
  }
};

// Upload new medical record
export const uploadMedicalRecord = async (formData) => {
  try {
    const response = await API.post("/medical-records", formData);
    return response.data;
  } catch (error) {
    console.error("Error uploading medical record:", error);
    throw error;
  }
};

// Delete medical record
export const deleteMedicalRecord = async (id) => {
  try {
    const response = await API.delete(`/medical-records/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting medical record:", error);
    throw error;
  }
};