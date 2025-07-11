import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3005" || "https://job-portal-app-d4cg.onrender.com", // ✅ your backend base URL
  withCredentials: true, // if using cookies/sessions
});

export default instance;
