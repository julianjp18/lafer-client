import axios from "axios";

const MAIN_ENDPOINT = "";
const HEADERS = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "x-api-key": "",
};

axios.interceptors.response.use(config => {
  return config;
}, error => {
  // handle the error
  console.log('del interceptor', error);
  return Promise.reject(error);
});

const axiosSura = axios.create({
  baseURL: MAIN_ENDPOINT,
  headers: HEADERS,
});

export default axiosSura;
