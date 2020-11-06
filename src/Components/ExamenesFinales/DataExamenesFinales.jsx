import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import "../../Css/ExamenesFinales.css";
import { useSelector, useDispatch } from "react-redux";
import { apiCalls } from "../../api/apiCalls";
import { setExamenesUsuario } from "../../actions/ExamenesActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash, faBell } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import audio from "../../audio/iphone.mp3";
import useSound from "use-sound";

export default function DataExamenesFinales(props) {
  const { enqueueSnackbar } = useSnackbar();
  const rolUsuario = useSelector((state) => state.informacionPersonal.idRol);
  const idUsuario = useSelector((state) => state.informacionPersonal.idUsuario);
  const [play] = useSound(audio);
  const [tipoBell, setTipoBell] = useState(
    props.examen?.recordatorio ? faBell : faBellSlash
  );
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

  useEffect(() => {
    return () => dispatch(setExamenesUsuario([]));
  }, [dispatch]);

  const examenesUsuario = () => {
    apiCalls
      .getExamenesUsuario(idUsuario)
      .then((response) => {
        dispatch(setExamenesUsuario(response.data.data));
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

  const incribirExamen = () => {
    const recordatorio = tipoBell === faBell ? true : false;
    apiCalls
      .inscribirExamen({
        idExamenFinal: props.examen?.id,
        idUsuario: idUsuario,
        recordatorio: recordatorio,
        calificacion: 0,
      })
      .then((response) => {
        examenesUsuario();
        enqueueSnackbar("Te inscribiste al examen final", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

  const anularInscripcionExamen = () => {
    apiCalls
      .deleteInscripcionExamen(props.examen?.idInscripcion)
      .then((response) => {
        examenesUsuario();
        enqueueSnackbar("Anulaste tu inscripción al examen final", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

  const eliminarExamen = () => {
    apiCalls
      .deleteExamenes(props.examen?.id)
      .then((response) => {
        examenesUsuario();
        enqueueSnackbar("Se eliminó el exámen", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
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
            onClick={() => incribirExamen()}
          >
            Inscribirme
          </Button>
        );
      } else {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => anularInscripcionExamen()}
          >
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

  const setReminder = () => {
    setTipoBell(tipoBell === faBellSlash ? faBell : faBellSlash);
    apiCalls
      .setReminderExamen(
        props.examen?.idInscripcion,
        tipoBell === faBellSlash ? true : false
      )
      .then((response) => {
        if (tipoBell === faBellSlash) {
          enqueueSnackbar("Se activo el recordatorio para la exámen", {
            variant: "success",
          });
          play();
        } else {
          enqueueSnackbar("Se desactivo el recordatorio para el exámen", {
            variant: "success",
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };
  return (
    <Grid container className="ContainerDataGrid">
      <Grid item xs={12} sm={3} className="DataGrid">
        {props.examen?.inscripto && (
          <FontAwesomeIcon
            className="IconMateriaOn"
            icon={tipoBell}
            title="Recordatorios Examenes Finales"
            onClick={setReminder}
          />
        )}
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
        {props.examen?.materia?.turno?.horaDesde} hs
      </Grid>

      <Grid item xs={12} sm={3} className="DataGrid">
        {rolUsuario === 3 && <ActionsEstudiante />}
        {rolUsuario === 1 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={eliminarExamen}
          >
            Eliminar Examen
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
