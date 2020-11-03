import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import "../../Css/Materias.css";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash, faBell } from "@fortawesome/free-solid-svg-icons";
import { setHorariosMateriaSeleccionada } from "../../actions/MateriasActions";
import { setMateriasUsuario } from "../../actions/MateriasActions";
import { setModal } from "../../actions/ModalActions";
import { apiCalls } from "../../api/apiCalls";

export default function DataMaterias(props) {
  const dispatch = useDispatch();
  const [tipoBell, setTipoBell] = useState(
    props.materia?.recordatorio ? faBell : faBellSlash
  );
  const rolUsuario = useSelector((state) => state.informacionPersonal.idRol);

  const showHorarios = (nombre, horarios) => {
    dispatch(setHorariosMateriaSeleccionada({ nombre, horarios }));
    dispatch(setModal(true));
  };

  const alumnosMateria = () => {
    window.open(
      "localhost:8080/modulo-admin/materias/cuatrimestres-pdf",
      "_blank"
    );
  };

  const incribirMateria = (materia) => {
    const recordatorio = tipoBell === faBell ? true : false;

    apiCalls
      .inscribirMateria({
        idMateria: materia.id,
        idUsuario: 1,
        recordatorio: recordatorio,
        calificacion: 10,
      })
      .then((response) => {
        apiCalls
          .getMateriasUsuario(1)
          .then((response) => {
            dispatch(setMateriasUsuario(response.data.data));
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const periodoInscripcionValido = () => {
    if (
      new Date(props.materia?.periodoInscripcion?.fechaDesde) <= new Date() &&
      new Date(props.materia?.periodoInscripcion?.fechaHasta) >= new Date()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const ActionsEstudiante = () => {
    if (periodoInscripcionValido()) {
      if (!props.materia?.inscripto) {
        return (
          <Button
            variant="contained"
            color="secondary"
            className="ButtonNuevaMateria"
            onClick={() => incribirMateria(props.materia)}
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
    } else if (props.materia?.inscripto) {
      return <div className="textInscriptoMateria">INSCRIPTO</div>;
    } else {
      return <div></div>;
    }
  };

  return (
    <Grid container className="ContainerDataGrid">
      <Grid item xs={12} sm={3} className="DataGrid">
        <FontAwesomeIcon
          className="IconMateriaOn"
          icon={tipoBell}
          title="Recordatorios Examenes Finales"
          onClick={() =>
            setTipoBell(tipoBell === faBellSlash ? faBell : faBellSlash)
          }
        />
        {props.materia?.nombre.toUpperCase()}
      </Grid>

      <Grid item xs={12} sm={3} className="DataGrid">
        {props.materia?.profesor?.nombre} {props.materia?.profesor?.apellido}
      </Grid>
      <Grid item xs={12} sm={1} className="DataGrid">
        {props.materia?.turno?.descripcion?.toUpperCase()}
      </Grid>
      <Grid item xs={12} sm={2} className="DataGrid">
        {props.materia?.cuatrimestre}º Cuatrimestre
      </Grid>
      <Grid item xs={12} sm={1} className="DataGrid">
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            showHorarios(props.materia?.nombre, props.materia?.horarios)
          }
        >
          Horarios
        </Button>
      </Grid>
      <Grid item xs={12} sm={2} className="DataGrid">
        {rolUsuario === 3 && <ActionsEstudiante />}
        {rolUsuario === 2 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={alumnosMateria}
          >
            Ver Alumnos
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
