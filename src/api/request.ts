import axios from "axios"

const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
})

// 1.请求拦截器：请求发出前执行
request.interceptors.request.use((config) => {
  console.log("即将发送请求", config.method, config.url);
  return config
})

// 2.响应成功拦截器：收到成功响应后执行
request.interceptors.response.use((response) => {
  console.log("收到响应", response.status);
  return response
})

export default request