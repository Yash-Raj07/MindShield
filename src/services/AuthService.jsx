import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// Register function
export const register = async (auth_details) => {
    const response = await axios.post(`${API_URL}/register`, auth_details);
    return response.data;
}

// Login function
export const login = async (auth_details) => {
    const response = await axios.post(`${API_URL}/login`, auth_details);
    return response.data;
}

// Reset Password function
export const resetPassword = async (email) => {
    const response = await axios.post(`${API_URL}/resetPassword`, { email });
    return response.data;
}

export const resetPasswordWithToken = async (token, newPassword) => {
    const response = await axios.post(`${API_URL}/resetPassword/${token}`, { newPassword });
    return response.data;
}
