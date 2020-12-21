const apiCall = (method, url) => {
    return fetch(url, {
        method
    });
};

export default apiCall;