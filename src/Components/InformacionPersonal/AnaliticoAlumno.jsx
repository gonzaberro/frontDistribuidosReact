import React from "react";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { apiUrlEstudiante as apiUrl } from "../../api/api";

export default function AnaliticoAlumno() {
  const idUsuario = useSelector((state) => state.informacionPersonal.idUsuario);
  const analiticoUsuario = useSelector(
    (state) => state.informacionPersonal.analiticoUsuario
  );

  const analiticoPDF = () => {
    window.open(
      apiUrl +
        "/modulo-estudiante/usuarios/analitico-pdf?idUsuario=" +
        idUsuario,
      "_blank"
    );
  };

  return (
    <>
      <Grid container className="containerHeaderHorarios">
        <Grid item xs={4} sm={12} className="DataGrid horariosHeader">
          <Button variant="contained" color="primary" onClick={analiticoPDF}>
            Descargar PDF
            <FontAwesomeIcon
              className="IconMateriaOn"
              icon={faDownload}
              title="Recordatorios Examenes Finales"
              style={{ color: "white" }}
            />
          </Button>
        </Grid>
      </Grid>
      <div style={{ overflowY: "auto", height: "30vh" }}>
        <Grid container>
          <Grid item xs={12} sm={3} className="DataGrid horariosHeader">
            Materia
          </Grid>
          <Grid item xs={12} sm={1} className="DataGrid horariosHeader">
            TP
          </Grid>
          <Grid item xs={12} sm={1} className="DataGrid horariosHeader">
            Parcial
          </Grid>
          <Grid item xs={12} sm={1} className="DataGrid horariosHeader">
            Promedio
          </Grid>
          <Grid item xs={12} sm={2} className="DataGrid horariosHeader">
            Condicion
          </Grid>
          <Grid item xs={12} sm={1} className="DataGrid horariosHeader">
            Final
          </Grid>
          <Grid item xs={12} sm={3} className="DataGrid horariosHeader">
            Promedio General
          </Grid>
          {analiticoUsuario.analitico.length > 0 &&
            analiticoUsuario.analitico.map((analitico) => {
              return (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    className="DataGrid"
                    style={{ textAlign: "center" }}
                  >
                    {analitico.nombreMateria}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    className="DataGrid"
                    style={{ textAlign: "center" }}
                  >
                    {analitico.notaTP}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    className="DataGrid"
                    style={{ textAlign: "center" }}
                  >
                    {analitico.notaParcial}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    className="DataGrid"
                    style={{ textAlign: "center" }}
                  >
                    {analitico.promedioMateria}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    className="DataGrid"
                    style={{ textAlign: "center" }}
                  >
                    {analitico.condicion}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    className="DataGrid"
                    style={{ textAlign: "center" }}
                  >
                    {analitico.notaFinal}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    className="DataGrid"
                    style={{ textAlign: "center" }}
                  >
                    {analitico.promedioGeneral}
                  </Grid>
                </>
              );
            })}
        </Grid>
      </div>
    </>
  );
}
