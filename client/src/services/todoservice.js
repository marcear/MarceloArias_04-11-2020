import axios from "axios";
const API_URL = "http://localhost:5000/api/todos";

const getAllTodos = () => {
  return axios
    .get(`${API_URL}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const createTodo = (action) => {
  return axios
    .post(`${API_URL}/create`, {
      action: action,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteTodo = (id) => {
  return axios
    .delete(`${API_URL}/` + id)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateTodo = (id, action) => {
  return axios
    .put(`${API_URL}/update/` + id, { action: action })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default { getAllTodos, createTodo, deleteTodo, updateTodo };
