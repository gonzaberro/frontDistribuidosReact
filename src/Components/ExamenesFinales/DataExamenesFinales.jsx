import React from "react";
import { Grid, Button } from "@material-ui/core";
import "../../Css/ExamenesFinales.css";
import { useSelector, useDispatch } from "react-redux";
import { apiCalls } from "../../api/apiCalls";
import { setExamenesUsuario } from "../../actions/ExamenesActions";

export default function DataExamenesFinales(props) {
  const rolUsuario = useSelector((state) => state.informacionPersonal.idRol);

  const dispatch = useDispatch();

  const periodoInscripcionValido = () => {
    if (
      new Date(props.examen?.materia?.periodoInscripcion?.fechaDesde) <=
        new Date() &&
      new Date(props.examen?.materia?.periodoInscripcion?.fechaHasta) >=
        new Date()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const incribirExamen = (materia) => {
    apiCalls
      .inscribirExamen({
        idExamenFinal: props.examen?.id,
        idUsuario: 1,
        recordatorio: true,
        calificacion: 10,
      })
      .then((response) => {
        apiCalls
          .getExamenesUsuario(1)
          .then((response) => {
            dispatch(setExamenesUsuario(response.data.data));
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const ActionsEstudiante = () => {
    if (periodoInscripcionValido()) {
      if (!props.examen?.inscripto) {
        return (
          <Button
            variant="contained"
            color="secondary"
            className="ButtonNuevaMateria"
            onClick={() => incribirExamen(props.materia)}
          >
            Inscribirme
          </Button>
        );
      } else {
        return (
          <Button variant="contained" color="secondary">
            Anular Inscripción
          </Button>
        );
      }
    } else if (props.examen?.inscripto) {
      return <div className="textInscriptoMateria">INSCRIPTO</div>;
    } else {
      return <div></div>;
    }
  };
  return (
    <Grid container className="ContainerDataGrid">
      <Grid item xs={12} sm={3} className="DataGrid">
        {props.examen?.materia?.nombre?.toUpperCase()}
      </Grid>
      <Grid item xs={12} sm={3} className="DataGrid">
        {props.examen?.materia?.profesor?.nombre}{" "}
        {props.examen?.materia?.profesor?.apellido}
      </Grid>

      <Grid item xs={12} sm={2} className="DataGrid">
        {props.examen?.fecha}
      </Grid>
      <Grid item xs={12} sm={1} className="DataGrid">
        11:00 AM
      </Grid>

      <Grid item xs={12} sm={3} className="DataGrid">
        {rolUsuario === 3 && <ActionsEstudiante />}
      </Grid>
    </Grid>
  );
}
