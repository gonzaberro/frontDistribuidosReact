import React from "react";
import { Grid } from "@material-ui/core";
import "../../Css/Materias.css";
export default function HeaderMaterias() {
  return (
    <Grid container>
      <Grid item xs={12} sm={3} className="HeaderGrid">
        Nombre de Materia
      </Grid>
      <Grid item xs={12} sm={3} className="HeaderGrid">
        Docente
      </Grid>
      <Grid item xs={12} sm={1} className="HeaderGrid">
        Turno
      </Grid>
      <Grid item xs={12} sm={2} className="HeaderGrid">
        Cuatrimestre
      </Grid>
      <Grid item xs={12} sm={1} className="HeaderGrid">
        Horarios
      </Grid>
      <Grid item xs={12} sm={2} className="HeaderGrid">
        Acciones
      </Grid>
    </Grid>
  );
}
