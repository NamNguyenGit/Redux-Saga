import axios from "axios";

export const loadUsersApi = async () =>
  await axios.get("http://localhost:5000/users");

export const createUserApi = async (user) =>
  await axios.post("http://localhost:5000/users", user);
