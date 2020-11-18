import React, { useEffect } from "react";
import "../../Css/CargarNotas.css";
import { Grid } from "@material-ui/core";
import InscripcionesMateria from "./InscripcionesMateria";
import InscripcionesExamen from "./InscripcionesExamen";
import { apiCalls } from "../../api/apiCalls";
import { useDispatch } from "react-redux";
import { setMateriasExamen } from "../../actions/ExamenesActions";
import { useSnackbar } from "notistack";
import {
  setInscripcionesExamen,
  setInscripcionesMateria,
} from "../../actions/InscripcionesActions";

export default function Inscripciones() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    apiCalls
      .getMaterias()
      .then((response) => {
        dispatch(setMateriasExamen(response.data.data));
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });

    return () => {
      dispatch(setInscripcionesExamen([]));
      dispatch(setInscripcionesMateria([]));
    };
  });

  return (
    <div className="Materias">
      <Grid container>
        <Grid item md={5}>
          <label className="headerCargarNotas">
            <h3>Inscripciones Materias</h3>
          </label>
          <InscripcionesMateria />
        </Grid>
        <Grid md={1}></Grid>
        <Grid item md={5}>
          <label className="headerCargarNotas">
            <h3>Inscripciones a Exámenes</h3>
          </label>
          <InscripcionesExamen />
        </Grid>
      </Grid>
    </div>
  );
}
