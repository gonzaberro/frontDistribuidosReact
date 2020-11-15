import axios from "axios";

export const apiUrlAdmin = "http://localhost:8090";
export const apiUrlDocente = "http://localhost:8091";
export const apiUrlEstudiante = "http://localhost:8092";

export const apiAdmin = axios.create({
  baseURL: apiUrlAdmin+"/modulo-admin",
  timeout: 10000000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiDocentes = axios.create({
  baseURL: apiUrlDocente+"/modulo-docente",
  timeout: 10000000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});


export const apiEstudiantes = axios.create({
  baseURL: apiUrlEstudiante+"/modulo-estudiante",
  timeout: 10000000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});