import axios from "axios";

export const apiUrl = "http://localhost:8080";

export default axios.create({
  baseURL: apiUrl+"/modulo-admin",
  timeout: 10000000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
