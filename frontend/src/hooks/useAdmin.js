import API from "../services/api";

// ============================== Get All Complaints ==============================

export const getAllComplaints = async () => {

  const response = await API.get(
    "/complaints/all"
  );

  return response.data;

};

// ============================== Reply Complaint ==============================

export const replyComplaint = async (
  id,
  complaintData
) => {

  const response = await API.put(

    `/complaints/${id}/reply`,

    complaintData

  );

  return response.data;

};

// ============================ USERS ============================

export const getUsers = async () => {

  const response = await API.get("/admin/users");

  return response.data;

};

export const toggleUserStatus = async (id) => {

  const response = await API.put(
    `/admin/user/${id}/toggle-status`
  );

  return response.data;

};

export const deleteUser = async (id) => {

  const response = await API.delete(
    `/admin/user/${id}`
  );

  return response.data;

};
// ============================== CAREGIVERS ==============================

export const getCaregivers = async () => {

  const response = await API.get("/admin/caregivers");

  return response.data;

};

export const verifyCaregiver = async (id) => {

  const response = await API.put(
    `/admin/caregiver/${id}/verify`
  );

  return response.data;

};

// ============================== Dashboard ==============================

export const getDashboardStats = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};

// ============================== Analytics==============================
export const getAnalytics = async () => {

  const response = await API.get("/admin/analytics");

  return response.data;

};

// ============================== SERVICES ==============================

export const getServices = async () => {

  const response = await API.get("/admin/services");

  return response.data;

};

export const updateServiceStatus = async (id, status) => {

  const response = await API.put(
    `/admin/service/${id}/status`,
    { status }
  );

  return response.data;

};

export const assignCaregiver = async (serviceId, caregiverId) => {

  const response = await API.put(
    `/admin/service/${serviceId}/assign-caregiver`,
    { caregiverId }
  );

  return response.data;

};