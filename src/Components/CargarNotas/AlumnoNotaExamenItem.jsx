import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Grid, TextField, Button } from "@material-ui/core";
import { apiCalls } from "../../api/apiCalls";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { setAlumnosNotasMateriaExamen } from "../../actions/CargarNotasActions";

export default function AlumnoNotaExamenItem(props) {
  const [notaParcial, setNotaParcial] = useState(props.alumno?.calificacion);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const actualizarNota = () => {
    apiCalls
      .setCalificacionExamen(props.alumno?.idInscripcion, notaParcial)
      .then((response) => {
        enqueueSnackbar("Se actualzó la nota del alumno", {
          variant: "success",
        });
        apiCalls
          .getAlumnosExamenxMateria(props.examenFinal?.materia?.id)
          .then((response) => {
            dispatch(setAlumnosNotasMateriaExamen(response.data.data));
          })
          .catch((error) => {
            enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
              variant: "error",
            });
          });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

  const fechaNotasValido = () => {
    if (
      new Date(
        props.examenFinal?.materia?.periodoInscripcion?.fechaLimiteNota
      ) > new Date()
    ) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Grid item xs={12} sm={4} className="DataGrid">
        {props.alumno.usuario?.nombre + " " + props.alumno?.usuario?.apellido}
      </Grid>
      <Grid item xs={12} sm={4} className="DataGrid">
        {props.alumno?.usuario?.dni}
      </Grid>
      <Grid item xs={12} sm={2} className="DataGrid">
        <TextField
          id="outlined-basic"
          disabled={fechaNotasValido()}
          variant="outlined"
          inputProps={{ min: 0, style: { textAlign: "center", height: "0px" } }} // the change is here
          className="InputsDato"
          value={notaParcial}
          onChange={(event) => setNotaParcial(event.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={2} className="DataGrid">
        <Button
          variant="contained"
          className="ButtonNuevoUsuario"
          onClick={() => actualizarNota()}
        >
          <FontAwesomeIcon
            className="IconMateriaOn"
            icon={faCheck}
            title="Recordatorios Examenes Finales"
            style={{ color: "white" }}
          />
        </Button>
      </Grid>
    </>
  );
}
