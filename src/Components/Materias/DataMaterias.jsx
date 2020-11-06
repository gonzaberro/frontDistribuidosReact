import React from "react";
import { Grid, Button } from "@material-ui/core";
import "../../Css/Materias.css";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import {
  setMateriaSeleccionada,
  setAlumnos,
} from "../../actions/MateriasActions";
import { setMateriasUsuario } from "../../actions/MateriasActions";
import { setModal, modalFunction } from "../../actions/ModalActions";
import { apiCalls } from "../../api/apiCalls";
import { ModalFunctions } from "../../actions/types";

export default function DataMaterias(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const idUsuario = useSelector((state) => state.informacionPersonal.idUsuario);

  const rolUsuario = useSelector((state) => state.informacionPersonal.idRol);

  const showHorarios = (materia) => {
    dispatch(modalFunction(ModalFunctions.horariosMateria));
    dispatch(setMateriaSeleccionada(materia));
    dispatch(setModal(true));
  };

  const materiasUsuario = () => {
    apiCalls
      .getMateriasUsuario(idUsuario)
      .then((response) => {
        dispatch(setMateriasUsuario(response.data.data));
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

  const anularInscripcionMateria = () => {
    apiCalls
      .deleteInscripcionMateria(props.materia?.idInscripcion)
      .then((response) => {
        materiasUsuario();
        enqueueSnackbar("Se anulo la inscripción a la materia", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };
  const eliminarMateria = () => {
    apiCalls
      .deleteMaterias(props.materia?.id)
      .then((response) => {
        materiasUsuario();
        enqueueSnackbar("Se eliminó la materia", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

  const verAlumnos = (materia) => {
    dispatch(modalFunction(ModalFunctions.alumnosMateria));
    dispatch(setMateriaSeleccionada(materia));
    dispatch(setModal(true));
    apiCalls
      .getAlumnosMateria(materia.id)
      .then((response) => {
        dispatch(setAlumnos(response.data.data));
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

  const incribirMateria = () => {
    apiCalls
      .inscribirMateria({
        idMateria: props.materia?.id,
        idUsuario: idUsuario,
        calificacion: 0,
      })
      .then((response) => {
        materiasUsuario();
        enqueueSnackbar("Te inscribiste a la materia", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
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
            onClick={() => incribirMateria()}
          >
            Inscribirme
          </Button>
        );
      } else {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => anularInscripcionMateria()}
          >
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
        {props.materia?.nombre}
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
          onClick={() => showHorarios(props.materia)}
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
            onClick={() => verAlumnos(props.materia)}
          >
            Ver Alumnos
          </Button>
        )}
        {rolUsuario === 1 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={eliminarMateria}
          >
            Eliminar Materia
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
