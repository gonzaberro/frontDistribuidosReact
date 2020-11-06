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

function deleteInscripcionExamen(id) {
  
  return api.delete("/usuarios-examenes-finales?idUsuarioExamenFinal="+id);
}

function deleteInscripcionMateria(id) {
  
  return api.delete("/usuarios-materias?idUsuarioMateria="+id);
}
function deleteMaterias(id) {
  
  return api.delete("/materias?idMateria="+id);
}
function deleteExamenes(id) {
  
  return api.delete("/finales?idExamenFinal="+id);
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
function setReminderExamen(id,recordatorio) {
  
  return api.put("/usuarios-examenes-finales/recordatorio?idUsuarioExamenFinal="+id+"&recordatorio="+recordatorio);
}

function createUser(parametros) {
  
  return api.post("/usuarios",parametros);
}
function createMateria(parametros) {
  
  return api.post("/materias",parametros);
}
function createExamen(parametros) {
  
  return api.post("/finales",parametros);
}
function getDocentes() {
  
  return api.get("/usuarios/docentes");
}

function getAlumnosMateria(materia) {
  
  return api.get("/usuarios-materias/alumnos?idMateria="+materia);
}
function getAlumnosExamenxMateria(materia) {
  
  return api.get("/usuarios-examenes-finales/alumnos?idMateria="+materia);
}
function getMaterias() {
  
  return api.get("/materias/all");
}
function setCalificacionMateria(idMateriaUsuario,calificacion) {
  
  return api.put("/usuarios-materias/calificaciones?calificacion="+calificacion+"&idUsuarioMateria="+idMateriaUsuario);
}
function setCalificacionExamen(idUsuarioExamenFinal,calificacion) {
  
  return api.put("/usuarios-examenes-finales/calificaciones?calificacion="+calificacion+"&idUsuarioExamenFinal="+idUsuarioExamenFinal);
}

export const apiCalls = {
  getUsuarios,
  deleteUsuario,
  getUsuario,
  getMateriasUsuario,
  inscribirMateria,
  getExamenesUsuario,
  inscribirExamen,
  deleteInscripcionExamen,
  deleteInscripcionMateria,
  setReminderExamen,
  createUser,
  getDocentes,
  createMateria,
  getAlumnosMateria,
  getMaterias,
  createExamen,
  deleteExamenes,
  deleteMaterias,
  setCalificacionMateria,
  getAlumnosExamenxMateria,
  setCalificacionExamen
};
