import API from "../services/api";

export const getServices = async () => {
  try {
    const response = await API.get("/service");
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const createService = async (data) => {
  try {
    const response = await API.post("/service", data);
    return response.data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

export const updateService = async (id, data) => {
  try {
    const response = await API.put(`/service/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await API.delete(`/service/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};