import React from "react";
import { Grid, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import "../../Css/Materias.css";

import { apiCalls } from "../../api/apiCalls";
import {
  setUsuarios,
  setSeleccionarUsuario,
} from "../../actions/AdministrarUsuariosActions";
import { setModal } from "../../actions/ModalActions";
import { useSnackbar } from "notistack";

export default function DataMaterias(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const eliminarUsuario = () => {
    apiCalls
      .deleteUsuario(props.usuario.id)
      .then((response) => {
        apiCalls
          .getUsuarios()
          .then((response) => {
            dispatch(setUsuarios(response.data.data));
            enqueueSnackbar("Se eliminó el usuario", {
              variant: "success",
            });
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

  const editarUsuario = (usuario) => {
    dispatch(setSeleccionarUsuario(usuario));
    dispatch(setModal(true));
  };

  return (
    <Grid container className="ContainerDataGrid">
      <Grid item xs={12} sm={2} className="DataGrid">
        {props.usuario.nombre}
      </Grid>
      <Grid item xs={12} sm={2} className="DataGrid">
        {props.usuario.apellido}
      </Grid>
      <Grid item xs={12} sm={1} className="DataGrid">
        {props.usuario.dni}
      </Grid>
      <Grid item xs={12} sm={2} className="DataGrid">
        {props.usuario.email}
      </Grid>
      <Grid item xs={12} sm={2} className="DataGrid">
        {props.usuario.rol?.descripcion.toUpperCase()}
      </Grid>
      <Grid item xs={12} sm={1} className="DataGrid">
        <Button
          variant="contained"
          color="primary"
          onClick={() => editarUsuario(props.usuario)}
        >
          Editar
        </Button>
      </Grid>
      <Grid item xs={12} sm={2} className="DataGrid">
        <Button variant="contained" color="secondary" onClick={eliminarUsuario}>
          Eliminar Usuario
        </Button>
      </Grid>
    </Grid>
  );
}
