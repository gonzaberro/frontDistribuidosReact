import React, { useState } from "react";
import "../../Css/CargarNotas.css";
import {
  InputLabel,
  Select,
  FormControl,
  Grid,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { apiCalls } from "../../api/apiCalls";
import { useSnackbar } from "notistack";
import { setInscripcionesMateria } from "../../actions/InscripcionesActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NotasMateria() {
  const materias = useSelector((state) => state.examenesReducer.materias);
  const alumnos = useSelector((state) => state.inscripciones.alumnosMateria);

  const [materia, setMateria] = useState();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const searchAlumnosMateria = (idMateria) => {
    apiCalls
      .getAlumnosMateriaInscripcion(idMateria)
      .then((response) => {
        dispatch(setInscripcionesMateria(response.data.data));
        setMateria(idMateria);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

  const inscribir = (idUsuario) => {
    apiCalls
      .setInscribirAlumnoMateria(materia, idUsuario)
      .then((response) => {
        searchAlumnosMateria(materia);
        enqueueSnackbar("Se inscribió el usuario a la Materia", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };
  const anularInscripcion = (idUsuarioMateria) => {
    apiCalls
      .deleteInscripcionMateriaAdmin(idUsuarioMateria)
      .then((response) => {
        searchAlumnosMateria(materia);
        enqueueSnackbar("Se anuló la inscripción del usuario a la Materia", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

  return (
    <div className="containerNotasExamen">
      <FormControl fullWidth variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Materias</InputLabel>
        <Select
          native
          value={materia}
          label="Materias"
          onChange={(event) => searchAlumnosMateria(event.target.value)}
        >
          <option aria-label="None" value="" />
          {materias.map((materia) => {
            return (
              <option value={materia.id}>
                {materia.nombre +
                  " - " +
                  materia.turno.descripcion.toUpperCase()}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <Grid container style={{ marginLeft: "15px" }}>
        {alumnos.map((alumno) => {
          return (
            <>
              <Grid
                item
                md={3}
                style={{ marginTop: "10px", paddingTop: "10px" }}
              >
                {alumno.usuario?.nombre + " " + alumno.usuario?.apellido}
              </Grid>
              <Grid
                item
                md={2}
                style={{ marginTop: "10px", paddingTop: "10px" }}
              >
                {alumno.usuario?.dni}
              </Grid>
              <Grid
                item
                md={4}
                style={{ marginTop: "10px", paddingTop: "10px" }}
              >
                {alumno.usuario?.email}
              </Grid>
              <Grid item md={3} style={{ paddingTop: "10px" }}>
                {alumno.inscripto ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => anularInscripcion(alumno.idInscripcion)}
                  >
                    Anular
                  </Button>
                ) : (
                  <div>
                    <Button
                      variant="contained"
                      color="secondary"
                      className="ButtonNuevaMateria"
                      onClick={() => inscribir(alumno.usuario?.id)}
                    >
                      Inscribir
                    </Button>
                  </div>
                )}
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
}
