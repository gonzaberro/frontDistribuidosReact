import React from "react";
import "../../Css/CargarNotas.css";
import { Grid } from "@material-ui/core";
import NotasMateria from "./NotasMateria";
import NotasExamen from "./NotasExamen";

export default function CargarNotas() {
  return (
    <div className="Materias">
      <Grid container>
        <Grid item md={5}>
          <label className="headerCargarNotas">
            <h3>Cargar notas de Materias</h3>
          </label>
          <NotasMateria />
        </Grid>
        <Grid md={1}></Grid>
        <Grid item md={5}>
          <label className="headerCargarNotas">
            <h3>Cargar notas de Exámenes</h3>
          </label>
          <NotasExamen />
        </Grid>
      </Grid>
    </div>
  );
}
