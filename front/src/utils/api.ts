import axios from "axios";

export const api = axios.create({
  baseURL: "http://104.248.9.118:8080/api",
});
