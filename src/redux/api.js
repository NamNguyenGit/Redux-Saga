import axios from "axios";

export const loadUsersApi = async () =>
  await axios.get("https:localhost:5000/users");
