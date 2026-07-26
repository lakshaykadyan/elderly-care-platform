import axios from "axios";

const API = "http://localhost:5000/api/caregiver";

export const getAssignedServices = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API}/services`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateAvailability = async (availability) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/availability`,
    { availability },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateServiceStatus = async (id, status) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/service/${id}/status`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};