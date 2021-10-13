import axios from "axios";
import axiosRetry from "axios-retry";
import { API_TODO_URL } from "../../constants/constants";

//In case of 5xx errors axios will make 3 retries.
axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
});

export const getTodos = () => {
  return axios.get(`${API_TODO_URL}/todos`);
};

export const addTodo = (body) => {
  return axios.post(`${API_TODO_URL}/todos`, JSON.stringify(body));
};

export const updateTodo = (body) => {
  return axios.put(`${API_TODO_URL}/todos/${body.id}`, JSON.stringify(body));
};

export const deleteTodo = (body) => {
  return axios.delete(`${API_TODO_URL}/todos/${body.id}`);
};
