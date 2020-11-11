import axios from "axios";

export const apiUrlAdmin = "http://localhost:8080";
export const apiUrlDocente = "http://localhost:8081";
export const apiUrlEstudiante = "http://localhost:8082";

export const apiAdmin = axios.create({
  baseURL: apiUrlAdmin+"/modulo-admin",
  timeout: 10000000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiDocentes = axios.create({
  baseURL: apiUrlDocente+"/modulo-admin",
  timeout: 10000000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});


export const apiEstudiantes = axios.create({
  baseURL: apiUrlEstudiante+"/modulo-admin",
  timeout: 10000000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});