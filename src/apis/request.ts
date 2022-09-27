import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStore } from "@/store/userStore";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  timeout: 10000,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.token) {
      // @ts-ignore
      config.headers.Authorization = userStore.token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    ElMessage.error(err.response.data.message);
    return Promise.reject(err);
  }
);

export default service;
