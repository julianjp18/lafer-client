import axios from "axios";

const MAIN_ENDPOINT = "https://lafersegurosapi.azurewebsites.net/api/";
const HEADERS = {
  "accept": "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export default axios.create({
  baseURL: MAIN_ENDPOINT,
  headers: HEADERS,
});
