import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import "../../Css/Materias.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash, faBell } from "@fortawesome/free-solid-svg-icons";
import { apiCalls } from "../../api/apiCalls";
import {
  setUsuarios,
  setSeleccionarUsuario,
} from "../../actions/AdministrarUsuariosActions";
import { setModal } from "../../actions/ModalActions";

export default function DataMaterias(props) {
  const dispatch = useDispatch();

  const [tipoBell, setTipoBell] = useState(faBell);

  const eliminarUsuario = () => {
    apiCalls
      .deleteUsuario(props.usuario.id)
      .then((response) => {
        apiCalls
          .getUsuarios()
          .then((response) => {
            dispatch(setUsuarios(response.data.data));
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
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
        {props.usuario.rol?.descripcion}
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
