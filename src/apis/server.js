import axios from 'axios';
import qs from 'qs';
import JWT from './jwt';

const server = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

server.defaults.paramsSerializer = (params) =>
  qs.stringify(params, { encode: false });
server.interceptors.response.use(
  (response) => response,
  (error) => error.response
);
server.interceptors.request.use(JWT);

export default server;
