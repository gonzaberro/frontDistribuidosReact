import React from "react";
import { Grid } from "@material-ui/core";
import "../../Css/Materias.css";

export default function HeaderAdministrarUsuarios() {
  return (
    <Grid container>
      <Grid item xs={12} sm={1} className="HeaderGrid"></Grid>
      <Grid item xs={12} sm={2} className="HeaderGrid">
        Nombre
      </Grid>
      <Grid item xs={12} sm={1} className="HeaderGrid">
        Documento
      </Grid>
      <Grid item xs={12} sm={2} className="HeaderGrid">
        Email
      </Grid>
      <Grid item xs={12} sm={2} className="HeaderGrid">
        Cargo
      </Grid>
      <Grid item xs={12} sm={1} className="HeaderGrid">
        Editar
      </Grid>
      <Grid item xs={12} sm={3} className="HeaderGrid">
        Acciones
      </Grid>
    </Grid>
  );
}
