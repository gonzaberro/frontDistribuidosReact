import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import "../../Css/InformacionPersonal.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogged, selectMenu } from "../../actions/MenuSwitchActions";
import { MenuOptions } from "../../actions/types";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { apiCalls } from "../../api/apiCalls";
import { loggedStates } from "../../actions/types";

export default function DatosPersonales(props) {
  const dispatch = useDispatch();
  const idUsuario = useSelector((state) => state.informacionPersonal.idUsuario);

  const { enqueueSnackbar } = useSnackbar();
  const [newPassword, setNewPassword] = useState();
  const [password, setPassword] = useState();

  const cambiarPassword = () => {
    if (newPassword !== password) {
      enqueueSnackbar("Las contraseñas tienen que coincidir", {
        variant: "error",
      });
    } else {
      apiCalls
        .changePassword({ idUsuario: idUsuario, password: newPassword })
        .then((response) => {
          enqueueSnackbar("Se actualizó la contraseña correctamente.", {
            variant: "success",
          });
          dispatch(setLogged(loggedStates.logged));
          dispatch(selectMenu(MenuOptions.InformacionPersonal));
        })
        .catch((error) => {
          enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
            variant: "error",
          });
        });
    }
  };

  return (
    <Grid container className="ColumInformacionPersonal">
      <Grid item md={12}>
        <h3 className="TitleDatosContacto">Datos Personales</h3>
      </Grid>
      <Grid item md={12}>
        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            disabled={true}
            id="outlined-basic"
            placeholder="Nombre"
            variant="outlined"
            className="InputsDato"
            value={props.usuario.nombre}
          />
          <TextField
            fullWidth
            disabled={true}
            id="outlined-basic"
            placeholder="Apellido"
            variant="outlined"
            className="InputsDato"
            value={props.usuario.apellido}
          />
          <TextField
            fullWidth
            disabled={true}
            id="outlined-basic"
            placeholder="Documento"
            variant="outlined"
            className="InputsDato"
            value={props.usuario.dni}
          />
          <h3>Cambiar Contraseña</h3>
          <TextField
            fullWidth
            type="password"
            id="outlined-basic"
            placeholder="Clave"
            variant="outlined"
            className="InputsDato"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            id="outlined-basic"
            placeholder="Confirmar Clave"
            variant="outlined"
            className="InputsDato"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
        <Button
          variant="contained"
          color="primary"
          className="ButtonGuardarInformacionPersonal"
          onClick={cambiarPassword}
        >
          Cambiar Contraseña
        </Button>
      </Grid>
    </Grid>
  );
}
