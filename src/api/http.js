import axios from "axios"
axios.defaults.withCredentials = true

const service = axios.create({
  // baseURl: "http://127.0.0.1:8082",
  // baseURl: "https://api.kele8.cn/agent/https://api.bilibili.com/x/web-interface",
  baseURl: "",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    // "Content-Type": "application/x-www-form-urlencoded",
    // "Content-Type": "Content-Type:application/x-www-form-urlencoded; charset=UTF-8",
  }
})

service.interceptors.request.use(
  config=> {
    console.log(config);
    
    return config
  },
  error=>{
    console.log(error);
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
      return response.data;
  },
  error =>{
      console.log(error);
      return Promise.reject(error);
  }
)

export default service;