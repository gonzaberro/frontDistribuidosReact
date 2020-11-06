import React, { useState } from "react";
import "../../Css/CargarNotas.css";
import { InputLabel, Select, FormControl, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { apiCalls } from "../../api/apiCalls";
import { setAlumnosNotasMateriaExamen } from "../../actions/CargarNotasActions";
import { useSnackbar } from "notistack";
import AlumnoNotaExamenItem from "./AlumnoNotaExamenItem";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NotasExamen() {
  const materias = useSelector((state) => state.examenesReducer.materias);
  const [materia, setMateria] = useState();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const alumnosNotasExamen = useSelector(
    (state) => state.cargarNotas.alumnosNotasExamen
  );
  const alumnosExamen = (materia) => {
    setMateria(materia);
    apiCalls
      .getAlumnosExamenxMateria(materia)
      .then((response) => {
        dispatch(setAlumnosNotasMateriaExamen(response.data.data));
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

  return (
    <div className="containerNotasMaterias">
      <FormControl fullWidth variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Materias</InputLabel>
        <Select
          native
          value={materia}
          label="Materias"
          onChange={(event) => alumnosExamen(event.target.value)}
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
        {alumnosNotasExamen.length > 0 && (
          <>
            <Grid container style={{ marginTop: "8px" }}>
              <Grid item xs={12} sm={4} className="DataGrid cargarNotasHeader">
                Nombre
              </Grid>
              <Grid item xs={12} sm={4} className="DataGrid cargarNotasHeader">
                Documento
              </Grid>
              <Grid item xs={12} sm={2} className="DataGrid cargarNotasHeader">
                Parcial
              </Grid>
              <Grid item xs={12} sm={2} className="DataGrid cargarNotasHeader">
                Acción
              </Grid>

              {alumnosNotasExamen[0].alumnos.map((alumno) => {
                return (
                  <AlumnoNotaExamenItem
                    alumno={alumno}
                    examenFinal={alumnosNotasExamen[0].examenFinal}
                  />
                );
              })}
            </Grid>
          </>
        )}
      </FormControl>
    </div>
  );
}
