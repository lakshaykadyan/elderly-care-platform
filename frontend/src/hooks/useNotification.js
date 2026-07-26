import API from "../services/api";

// ========================= Get Notifications =========================

export const getNotifications = async () => {

  const response = await API.get("/notifications");

  return response.data;

};

// ========================= Mark One Notification Read =========================

export const markAsRead = async (id) => {

  const response = await API.put(
    `/notifications/${id}/read`
  );

  return response.data;

};

// ========================= Mark All Notifications Read =========================

export const markAllAsRead = async () => {

  const response = await API.put(
    "/notifications/read-all"
  );

  return response.data;

};

// ========================= Delete Notification =========================

export const deleteNotification = async (id) => {

  const response = await API.delete(
    `/notifications/${id}`
  );

  return response.data;

};