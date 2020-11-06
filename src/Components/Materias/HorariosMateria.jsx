import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

export default function HorariosMateria() {
  const materia = useSelector(
    (state) => state.materiasReducer.materiaSeleccionada
  );
  return (
    <Grid container className="ContainerDataGrid">
      <Grid item xs={12} sm={12} className="DataGrid">
        Horarios Correspondientes a:<b> {materia.nombre?.toUpperCase()}</b>
      </Grid>
      <Grid item xs={12} sm={3} className="DataGrid">
        Turno
      </Grid>
      <Grid item xs={12} sm={3} className="DataGrid">
        Día
      </Grid>
      <Grid item xs={12} sm={3} className="DataGrid">
        Hora de Inicio
      </Grid>
      <Grid item xs={12} sm={3} className="DataGrid">
        Hora de Fin
      </Grid>
      {materia.dias.map((horario) => {
        return (
          <>
            <Grid item xs={12} sm={3} className="DataGrid">
              {horario.nombre.toUpperCase()}
            </Grid>
            <Grid item xs={12} sm={3} className="DataGrid">
              {materia?.turno?.descripcion.toUpperCase()}
            </Grid>
            <Grid item xs={12} sm={3} className="DataGrid">
              {materia?.turno?.horaDesde}
            </Grid>
            <Grid item xs={12} sm={3} className="DataGrid">
              {materia?.turno?.horaHasta}
            </Grid>
          </>
        );
      })}
    </Grid>
  );
}
