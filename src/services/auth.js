import axios from "axios";

export const register = async (headers) =>
  await axios.post("https://taskpad-58nv.onrender.com/auth/signup", headers);

export const verifyUser = async (headers) =>
  await axios.post("https://taskpad-58nv.onrender.com/auth/signin", headers);
