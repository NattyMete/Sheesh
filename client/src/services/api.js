// api.js

import axios from "axios";

const API_BASE_URL = "http://localhost:3001/";

const api = axios.create({
    baseURL: API_BASE_URL,
    validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    });

const request = async (endpoint, options = {}) =>{
    try {
        const res = await api.get(endpoint, options);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const registerUser = async (userData) => {
    try {
        userData = {...userData, 'profilePicture': userData.picture.name}
        const res = await api.post("/auth/register", userData);
        return res;
    } catch (error) {
        console.error(error);
        // return error;
    }
}
export const loginUser = async (userData) => {
    try {
        const res = await api.post("/auth/login", userData);
        // console.log('token: ',res.headers.get('Authorization'))
        const token = res.headers['x-auth-token'];
        // console.log()
        localStorage.setItem("token", token);
        return res;
    } catch (error) {
        console.error(error);
    }
}
export const getUserPosts = async (userId) => {
    try {
      const res = await api.get(`${API_BASE_URL}/${userId}/posts`);
      return res;
    } catch (error) {
      console.error('Error fetching user posts:', error);
      throw error;
    }
  };

