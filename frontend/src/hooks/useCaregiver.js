import API from "../services/api";

export const getAssignedServices = async () => {
  const response = await API.get("/caregiver/services");
  return response.data;
};

export const updateAvailability = async (availability) => {
  const response = await API.put("/caregiver/availability", { availability });
  return response.data;
};

export const updateServiceStatus = async (id, status) => {
  const response = await API.put(`/caregiver/service/${id}/status`, { status });
  return response.data;
};