import Axios from "axios";
import store from "@/store";

const HttpService = Axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:3222/",
});

// Interceptors to check about authToken and loading
HttpService.interceptors.request.use(
  function (config) {
    store.commit('setLoading', true);

    const token = localStorage.getItem("authToken");
    if (token?.length) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    store.commit('setLoading', false);
    return Promise.reject(error);
  }
);

HttpService.interceptors.response.use(
  function (response) {
    store.commit('setLoading', false);
    return response;
  },
  function (error) {
    store.commit('setLoading', false);
    return Promise.reject(error);
  }
);

export default HttpService;
