import React from "react";
import { Grid } from "@material-ui/core";
import "../../Css/ExamenesFinales.css";

export default function HeaderExamenesFinales() {
  return (
    <Grid container>
      <Grid item xs={12} sm={2} className="HeaderGrid">
        Nombre de Materia
      </Grid>
      <Grid item xs={12} sm={2} className="HeaderGrid">
        Turno
      </Grid>
      <Grid item xs={12} sm={2} className="HeaderGrid">
        Docente
      </Grid>

      <Grid item xs={12} sm={2} className="HeaderGrid">
        Fecha
      </Grid>
      <Grid item xs={12} sm={1} className="HeaderGrid">
        Hora
      </Grid>

      <Grid item xs={12} sm={3} className="HeaderGrid">
        Acciones
      </Grid>
    </Grid>
  );
}
