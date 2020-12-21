export default (request) => {
  const newRequest = request;
  const token = localStorage.getItem('token');
  if (token) {
    newRequest.headers.Authorization = `Bearer ${token}`;
  }
  return newRequest;
};
