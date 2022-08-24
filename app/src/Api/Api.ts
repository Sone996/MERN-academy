import { TOKEN_LS_NAME } from "../Constants/Constants";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3200/api/v1/",
});

axiosInstance.interceptors.request.use((config) => {
  const token: any = localStorage.getItem(TOKEN_LS_NAME);
  if (token) {
    // config.data = token;
    // return Promise.reject(error)
  }
  return config;
});

// console.log(localStorage.getItem(TOKEN_LS_NAME))

axiosInstance.defaults.headers.common['Authorization'] =
'Bearer ' + localStorage.getItem(TOKEN_LS_NAME);

axiosInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = axiosInstance;
