import Instance from "./api";

Instance.interceptors.request.use(
  (req) => {
    if (axios.defaults.headers.common["Authorization"]) return req;
    throw { message: "the token is not available" };
  },
  (error) => {
    return Promise.reject(error);
  }
);

Instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const fallbackValue = [
      {
        userId: "Not authorized",
        id: "aerw15311sq",
        title: "Please try     again",
        completed: false,
      },
    ];
    return Promise.reject(fallbackValue);
  }
);
