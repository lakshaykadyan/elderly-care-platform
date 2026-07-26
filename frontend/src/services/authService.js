import API from "./api";

// ========================== LOGIN ==========================
export const loginUser = async (loginData) => {
  const response = await API.post("/auth/login", loginData);
  return response.data; // Axios automatically parses JSON, response.data me { token, user } aayega
};

// ========================== REGISTER USER ==========================
export const registerUser = async (signupData) => {
  const response = await API.post("/auth/signup", signupData);
  return response.data;
};

// ========================== CAREGIVER REGISTER ==========================
export const caregiverRegister = async (data) => {
  const response = await API.post("/auth/caregiver-signup", data);
  return response.data;
};

// ========================== (OPTIONAL) Forgot Password ==========================
// Agar aapne implement kiya hai toh yeh bhi add kar lo
export const forgotPassword = async (email) => {
  const response = await API.post("/auth/forgot-password", { email });
  return response.data;
};

// ========================== (OPTIONAL) OTP Verification ==========================
export const verifyOTP = async (email, otp) => {
  const response = await API.post("/auth/verify-otp", { email, otp });
  return response.data;
};

// ========================== (OPTIONAL) Reset Password ==========================
export const resetPassword = async (email, newPassword) => {
  const response = await API.post("/auth/reset-password", { email, newPassword });
  return response.data;
};