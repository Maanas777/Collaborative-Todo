import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; 

// Register User
export const registerUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login User
export const loginUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/login`, userData,);
  return response.data;
};

// Logout User
export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/logout`, {}, {
   
  });
  return response.data;
};
