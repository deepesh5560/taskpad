import axios from "axios";

export const createTask = async (headers) =>
  await axios.post("http://localhost:8000/createTodo", headers);

export const getTask = async (id) =>
  await axios.get(`http://localhost:8000/getTodo/${id}`);

export const editTask = async (id, header) =>
  await axios.put(`http://localhost:8000/updateTodo/${id}`, { header });

export const delTask = async (id) =>
  await axios.delete(`http://localhost:8000/deleteTodo/${id}`);
