const API_URL = "http://localhost:5000/api/service";

export const createService = async (serviceData) => {

  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(serviceData),

  });

  return await response.json();

};

export const getServices = async () => {

  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {

    headers: {
      Authorization: `Bearer ${token}`,
    },

  });

  return await response.json();

};

export const deleteService = async (id) => {

  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {

    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },

  });

  return await response.json();

};

export const updateService = async (id, serviceData) => {

  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:5000/api/service/${id}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(serviceData),

  });

  return await response.json();

};