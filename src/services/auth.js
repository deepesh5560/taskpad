import axios from "axios";

export const register = async (headers) =>
  await axios.post("http://localhost:8000/auth/signup", headers);

export const verifyUser = async (headers) =>
  await axios.post("http://localhost:8000/auth/signin", headers);
