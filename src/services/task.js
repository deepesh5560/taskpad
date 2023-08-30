import axios from "axios";

export const createTask = async (headers) =>
  await axios.post("https://taskpad-58nv.onrender.com/createTodo", headers);

export const getTask = async (id) =>
  await axios.get(`https://taskpad-58nv.onrender.com/getTodo/${id}`);

export const editTask = async (id, header) =>
  await axios.put(`https://taskpad-58nv.onrender.com/updateTodo/${id}`, {
    header,
  });

export const delTask = async (id) =>
  await axios.delete(`https://taskpad-58nv.onrender.com/deleteTodo/${id}`);
