import axios from "axios";
import mem from "mem";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

// axios public instance
export const axiosPublic = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// refresh jwt
export const refresh = async () => {
  try {
    const res = await axiosPublic.get("refresh", {
      withCredentials: true,
    });
    console.log("res - ", res);
  } catch (e) {
    console.log(e);
    // if refresh token expired, logout the user and clear cookies
  }
};

// memoized refresh token function to prevent excessive fxn calls
export const memoizedRefreshJwt = mem(refresh, {
  maxAge: 10000,
});

// axios private instance
export const axiosPrivate = axios.create({
  baseURL: SERVER_URL,
});

// axios interceptors request
axiosPrivate.interceptors.request.use(
  async (config) => {
    // if access token, add to headers
    config.headers = {
      ...config.headers,
      Authorization: `Bearer access-token`,
    };

    return config;
  },
  (error) => Promise.reject(error)
);

// axios interceptors response
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await memoizedRefreshJwt();

      if(result) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer access-token`,
          };
      }

      return axiosPrivate(config)
    }
    return Promise.reject(error)
  }
);
