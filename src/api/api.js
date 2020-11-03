import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/modulo-admin",
  timeout: 10000000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
