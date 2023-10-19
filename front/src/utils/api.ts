import axios from "axios";

export const api = axios.create({
  baseURL: "http://190.89.239.35/api",
});
