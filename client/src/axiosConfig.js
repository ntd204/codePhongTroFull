import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

//Add a request interceptor
instance.interceptors.request.use(
  //Do something before the request is sent
  //Gắn token vào header
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

//Add a response interceptor
instance.interceptors.response.use(
  //Refresh token
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
