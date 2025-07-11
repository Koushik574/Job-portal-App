import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3005", // ✅ your backend base URL
  withCredentials: true, // if using cookies/sessions
});

export default instance;
