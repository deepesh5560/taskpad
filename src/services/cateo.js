import axios from "axios";

export const createCateogory = async (headers) =>
  await axios.post("http://localhost:8000/createCateogory", headers);

export const getCateogory = async (headers) =>
  await axios.get("http://localhost:8000/getCateogories", headers);

export const delCateogory = async (id) =>
  await axios.delete(`http://localhost:8000/deleteCateogory/${id}`);
