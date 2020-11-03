import api from "./api";

function getUsuarios() {
  return api.get("/usuarios/all");
}
function getUsuario(idUsuario) {
  return api.get("/usuarios?idUsuario="+idUsuario);
}
function deleteUsuario(idUsuario) {
  
  return api.delete("/usuarios?idUsuario="+idUsuario);
}
function getMateriasUsuario(idUsuario) {
  
  return api.get("/usuarios-materias/materias-inscriptas?idUsuario="+idUsuario);
}
function getExamenesUsuario(idUsuario) {
  
  return api.get("/usuarios-examenes-finales/finales-inscriptos?idUsuario="+idUsuario);
}


function inscribirMateria(parametros) {
  
  return api.post("/usuarios-materias",parametros);
}

function inscribirExamen(parametros) {
  
  return api.post("/usuarios-examenes-finales",parametros);
}
export const apiCalls = {
  getUsuarios,
  deleteUsuario,
  getUsuario,
  getMateriasUsuario,
  inscribirMateria,
  getExamenesUsuario,
  inscribirExamen
};
