import axios from "axios";
const connection = axios.create({
  baseURL: "https://share-backend-3q5p.onrender.com",

  withCredentials: true,
});
export default connection;
