import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogit-w8z3.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
