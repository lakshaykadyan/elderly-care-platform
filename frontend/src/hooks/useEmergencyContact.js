import API from "../services/api";

// Get all emergency contacts
export const getContacts = async () => {
  try {
    const response = await API.get("/emergency-contacts");
    return response.data;
  } catch (error) {
    console.error("Error fetching emergency contacts:", error);
    throw error;
  }
};

// Create emergency contact
export const createContact = async (data) => {
  try {
    const response = await API.post("/emergency-contacts", data);
    return response.data;
  } catch (error) {
    console.error("Error creating emergency contact:", error);
    throw error;
  }
};

// Update emergency contact
export const updateContact = async (id, data) => {
  try {
    const response = await API.put(`/emergency-contacts/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating emergency contact:", error);
    throw error;
  }
};

// Delete emergency contact
export const deleteContact = async (id) => {
  try {
    const response = await API.delete(`/emergency-contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting emergency contact:", error);
    throw error;
  }
};