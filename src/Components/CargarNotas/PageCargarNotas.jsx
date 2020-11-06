import React, { useEffect } from "react";
import CargarNotas from "./CargarNotas";
import { apiCalls } from "../../api/apiCalls";
import { useDispatch } from "react-redux";
import { setMateriasExamen } from "../../actions/ExamenesActions";
import { useSnackbar } from "notistack";
import {
  setAlumnosNotasMateria,
  setAlumnosNotasMateriaExamen,
} from "../../actions/CargarNotasActions";

export default function PageCargarNotas() {
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
      dispatch(setAlumnosNotasMateriaExamen([]));
      dispatch(setAlumnosNotasMateria([]));
    };
  });

  return <CargarNotas />;
}
