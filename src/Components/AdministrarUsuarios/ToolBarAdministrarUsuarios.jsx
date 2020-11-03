import React from "react";
import { useDispatch } from "react-redux";
import { Grid, Button, TextField } from "@material-ui/core";
import "../../Css/AdministrarUsuarios.css";
import { setModal } from "../../actions/ModalActions";

export default function ToolBarAdministrarUsuarios() {
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(setModal(true));
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={3} className="ToolBarUsuarios">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Buscar Usuario"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={7}></Grid>
      <Grid item xs={12} sm={2} className="ToolBarUsuarios">
        <Button
          variant="contained"
          className="ButtonNuevoUsuario"
          onClick={openModal}
        >
          Nuevo Usuario +
        </Button>
      </Grid>
    </Grid>
  );
}
