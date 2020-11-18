import {apiAdmin,apiDocentes,apiEstudiantes} from "./api";

function getUsuarios() {
  return apiAdmin.get("/usuarios/all");
}
function getUsuario(idUsuario) {
  return apiAdmin.get("/usuarios?idUsuario="+idUsuario);
}
function deleteUsuario(idUsuario) {
  
  return apiAdmin.delete("/usuarios?idUsuario="+idUsuario);
}

function deleteInscripcionExamen(id) {
  
  return apiAdmin.delete("/usuarios-examenes-finales?idUsuarioExamenFinal="+id);
}

function deleteInscripcionMateria(id) {
  
  return apiAdmin.delete("/usuarios-materias?idUsuarioMateria="+id);
}
function deleteMaterias(id) {
  
  return apiAdmin.delete("/materias?idMateria="+id);
}
function deleteExamenes(id) {
  
  return apiAdmin.delete("/finales?idExamenFinal="+id);
}

function getMateriasUsuario(idUsuario) {
  
  return apiAdmin.get("/usuarios-materias/materias-inscriptas?idUsuario="+idUsuario);
}
function getExamenesUsuario(idUsuario) {
  
  return apiAdmin.get("/usuarios-examenes-finales/finales-inscriptos?idUsuario="+idUsuario);
}


function inscribirMateria(parametros) {
  
  return apiEstudiantes.post("/usuarios-materias",parametros);
}

function inscribirExamen(parametros) {
  
  return apiEstudiantes.post("/usuarios-examenes-finales",parametros);
}
function setReminderExamen(id,recordatorio) {
  
  return apiEstudiantes.put("/usuarios-examenes-finales/recordatorio?idUsuarioExamenFinal="+id+"&recordatorio="+recordatorio);
}

function createUser(parametros) {
  
  return apiAdmin.post("/usuarios",parametros);
}
function createMateria(parametros) {
  
  return apiAdmin.post("/materias",parametros);
}
function createExamen(parametros) {
  
  return apiAdmin.post("/finales",parametros);
}
function getDocentes() {
  
  return apiAdmin.get("/usuarios/docentes");
}

function getAlumnosMateria(materia) {
  
  return apiDocentes.get("/usuarios-materias/alumnos?idMateria="+materia);
}
function getAlumnosExamenxMateria(materia) {
  
  return apiDocentes.get("/usuarios-examenes-finales/alumnos?idMateria="+materia);
}
function getMaterias() {
  
  return apiAdmin.get("/materias/all");
}
function setCalificacionMateria(idMateriaUsuario,calificacion,notaTp) {
  
  return apiDocentes.put("/usuarios-materias/calificaciones?calificacionExamen="+calificacion+"&calificacionTps="+notaTp+"&idUsuarioMateria="+idMateriaUsuario);
}
function setCalificacionExamen(idUsuarioExamenFinal,calificacion) {
  
  return apiDocentes.put("/usuarios-examenes-finales/calificaciones?calificacion="+calificacion+"&idUsuarioExamenFinal="+idUsuarioExamenFinal);
}

function loginUsuario(parameters) {
  
  return apiAdmin.post("/usuarios/login",parameters);
}
function changePassword(parameters) {
  
  return apiAdmin.put("/usuarios/password",parameters);
}

function updateUsuario(idUsuario,parameters) {
  
  return apiAdmin.put("/usuarios/datos-contacto?idUsuario="+idUsuario,parameters);
}
function updateUsuarioCompleto(idUsuario,parameters) {
  
  return apiAdmin.put("/usuarios?idUsuario="+idUsuario,parameters);
}

function updateNotasMateria(parameters) {
  
  return apiDocentes.put("/usuarios-materias/notas-excel",parameters);
}

function updateNotasExamen(parameters) {
  
  return apiDocentes.put("/usuarios-examenes-finales/notas-excel",parameters);
}

function editarMateria(idMateria,parameters) {
  
  return apiAdmin.put("/materias?idMateria="+idMateria,parameters);
}


function editarExamen(idExamen,parameters) {
  
  return apiAdmin.put("/finales?idExamenFinal="+idExamen,parameters);
}

function getAnaliticoUsuario(idUsuario) {
  
  return apiEstudiantes.get("/usuarios/analitico?idUsuario="+idUsuario);
}
function getAlumnosMateriaInscripcion(idMateria) {
  
  return apiAdmin.get("/usuarios-materias/alumnos?idMateria="+idMateria);
}
function getAlumnosExamenInscripcion(idMateria) {
  
  return apiAdmin.get("/usuarios-examenes-finales/alumnos?idMateria="+idMateria);
}
function setInscribirAlumnoMateria(idMateria,idUsuario){
  return apiAdmin.post("/usuarios-materias?idUsuario="+idUsuario+"&idMateria="+idMateria);
}
function setInscribirAlumnoExamen(idExamenFinal,idUsuario){
  return apiAdmin.post("/usuarios-examenes-finales?idUsuario="+idUsuario+"&idExamenFinal="+idExamenFinal);
}
function deleteInscripcionMateriaAdmin(idUsuarioMateria){
  return apiAdmin.delete("/usuarios-materias/admin?idUsuarioMateria="+idUsuarioMateria);
}
function deleteInscripcionExamenAdmin(idUsuarioExamenFinal){
  return apiAdmin.delete("/usuarios-examenes-finales/admin?idUsuarioExamenFinal="+idUsuarioExamenFinal);
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
  setCalificacionExamen,
  loginUsuario,
  changePassword,
  updateUsuario,
  updateUsuarioCompleto,
  updateNotasMateria,
  updateNotasExamen,
  editarMateria,
  editarExamen,
  getAnaliticoUsuario,
  getAlumnosMateriaInscripcion,
  getAlumnosExamenInscripcion,
  setInscribirAlumnoExamen,
  setInscribirAlumnoMateria,
  deleteInscripcionMateriaAdmin,
  deleteInscripcionExamenAdmin
};
