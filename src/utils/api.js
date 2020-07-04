import axios from "axios";
import { BASE_URL } from "./const";

export const PlatformApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`
  },
});

// Added Interceptor
PlatformApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem("TOKEN");
  config.headers.Authorization =  `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(function (config) {
  const token = localStorage.getItem("TOKEN");
  config.headers.Authorization =  `Bearer ${token}`;
  return config;
});