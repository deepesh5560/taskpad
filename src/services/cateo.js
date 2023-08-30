import axios from "axios";

export const createCateogory = async (headers) =>
  await axios.post(
    "https://taskpad-58nv.onrender.com/createCateogory",
    headers
  );

export const getCateogory = async (headers) =>
  await axios.get("https://taskpad-58nv.onrender.com/getCateogories", headers);

export const delCateogory = async (id) =>
  await axios.delete(`https://taskpad-58nv.onrender.com/deleteCateogory/${id}`);
