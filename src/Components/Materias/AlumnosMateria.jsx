import React from "react";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function AlumnosMateria() {
  const materia = useSelector(
    (state) => state.materiasReducer.materiaSeleccionada
  );
  const alumnos = useSelector((state) => state.materiasReducer.alumnos);
  return (
    <Grid container className="ContainerDataGrid">
      <Grid item xs={8} sm={8} className="DataGrid">
        Alumnos Correspondientes a:<b> {materia.nombre?.toUpperCase()}</b>
      </Grid>
      <Grid item xs={4} sm={4} className="DataGrid">
        <Button variant="contained" color="primary">
          Descargar Excel
          <FontAwesomeIcon
            className="IconMateriaOn"
            icon={faDownload}
            title="Recordatorios Examenes Finales"
            style={{ color: "white" }}
          />
        </Button>
      </Grid>

      <Grid item xs={12} sm={3} className="DataGrid">
        Nombre
      </Grid>
      <Grid item xs={12} sm={3} className="DataGrid">
        Apellido
      </Grid>
      <Grid item xs={12} sm={3} className="DataGrid">
        Documento
      </Grid>
      <Grid item xs={12} sm={3} className="DataGrid">
        Email
      </Grid>
      {alumnos.length > 0 &&
        alumnos[0].alumnos.map((alumno) => {
          return (
            <>
              <Grid item xs={12} sm={3} className="DataGrid">
                {alumno.usuario?.nombre}
              </Grid>
              <Grid item xs={12} sm={3} className="DataGrid">
                {alumno?.usuario?.apellido}
              </Grid>
              <Grid item xs={12} sm={3} className="DataGrid">
                {alumno?.usuario?.dni}
              </Grid>
              <Grid item xs={12} sm={3} className="DataGrid">
                {alumno?.usuario?.email}
              </Grid>
            </>
          );
        })}
    </Grid>
  );
}
