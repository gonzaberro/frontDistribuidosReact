import React, { useState } from "react";
import "../../Css/CargarNotas.css";
import {
  InputLabel,
  Select,
  FormControl,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { apiCalls } from "../../api/apiCalls";
import { setAlumnosNotasMateria } from "../../actions/CargarNotasActions";
import { useSnackbar } from "notistack";
import AlumnoNotaMateriaItem from "./AlumnoNotaMateriaItem";

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
  const alumnosNotasMateria = useSelector(
    (state) => state.cargarNotas.alumnosNotasMateria
  );
  const [materia, setMateria] = useState();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const alumnosMateria = (materia) => {
    setMateria(materia);
    apiCalls
      .getAlumnosMateria(materia)
      .then((response) => {
        dispatch(setAlumnosNotasMateria(response.data.data));
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
          onChange={(event) => alumnosMateria(event.target.value)}
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

      <Grid container>
        {alumnosNotasMateria.length > 0 && (
          <>
            <Grid container>
              <Grid item xs={12} sm={3} className="DataGrid cargarNotasHeader">
                Nombre
              </Grid>
              <Grid item xs={12} sm={3} className="DataGrid cargarNotasHeader">
                Documento
              </Grid>
              <Grid item xs={12} sm={2} className="DataGrid cargarNotasHeader">
                Parcial
              </Grid>
              <Grid item xs={12} sm={2} className="DataGrid cargarNotasHeader">
                Tp
              </Grid>
              <Grid item xs={12} sm={2} className="DataGrid cargarNotasHeader">
                Acción
              </Grid>
              {alumnosNotasMateria[0].alumnos.map((alumno) => {
                return (
                  <AlumnoNotaMateriaItem
                    alumno={alumno}
                    materia={alumnosNotasMateria[0].materia}
                  />
                );
              })}
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}
