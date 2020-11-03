import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

export default function HorariosMateria() {
  const horarios = useSelector(
    (state) => state.materiasReducer.horariosMateriaSeleccionada
  );

  return (
    <Grid container className="ContainerDataGrid">
      <Grid item xs={12} sm={12} className="DataGrid">
        Horarios Correspondientes a:<b> {horarios.nombre?.toUpperCase()}</b>
      </Grid>
      <Grid item xs={12} sm={4} className="DataGrid">
        Día
      </Grid>
      <Grid item xs={12} sm={4} className="DataGrid">
        Hora de Inicio
      </Grid>
      <Grid item xs={12} sm={4} className="DataGrid">
        Hora de Fin
      </Grid>
      {horarios.horarios.map((horario) => {
        return (
          <>
            <Grid item xs={12} sm={4} className="DataGrid">
              {horario.dia}
            </Grid>
            <Grid item xs={12} sm={4} className="DataGrid">
              {horario.horaDesde}
            </Grid>
            <Grid item xs={12} sm={4} className="DataGrid">
              {horario.horaHasta}
            </Grid>
          </>
        );
      })}
    </Grid>
  );
}
