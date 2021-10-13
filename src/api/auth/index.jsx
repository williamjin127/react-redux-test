import axios from "axios";
import axiosRetry from "axios-retry";
import { API_BASE_URL } from "../../constants/constants";

//In case of 5xx errors axios will make 3 retries.
axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
});

export const login = (body) => {
  return axios.post(`${API_BASE_URL}/login`, body);
};
