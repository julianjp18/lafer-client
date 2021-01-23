import axios from "axios";

const API_KEY = "UK3ncSKYBD3dxMHSCLNVe4QYh6ZHEwbZ4dlc1dSp";
const MAIN_ENDPOINT = "https://stg-api-conecta.segurosbolivar.com/stage/";
const HEADERS = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
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
