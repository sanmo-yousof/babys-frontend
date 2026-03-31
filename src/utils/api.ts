import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api"
      : import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export default api;
