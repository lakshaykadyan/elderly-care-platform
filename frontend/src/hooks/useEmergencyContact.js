import axios from "axios";

const API = "http://localhost:5000/api/emergency-contacts";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getContacts = async () => {
  const response = await axios.get(API, getToken());
  return response.data;
};

export const createContact = async (contact) => {
  const response = await axios.post(API, contact, getToken());
  return response.data;
};

export const updateContact = async (id, contact) => {
  const response = await axios.put(
    `${API}/${id}`,
    contact,
    getToken()
  );
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axios.delete(
    `${API}/${id}`,
    getToken()
  );
  return response.data;
};