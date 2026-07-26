import API from "./api";

export const loginUser = async (loginData) => {
    const response = await API.post("/auth/login", loginData);
    return response.data;
};

export const registerUser = async (signupData) => {
    const response = await API.post("/auth/signup", signupData);
    return response.data;
};

export const caregiverRegister = async (data) => {
    const response = await API.post("/auth/caregiver-signup", data);
    return response.data;
};