import React from "react";
import "../Css/Login.css";
import { TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setLogged, selectMenu } from "../actions/MenuSwitchActions";
import { MenuOptions } from "../actions/types";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { apiCalls } from "../api/apiCalls";
import { loggedStates } from "../actions/types";

export default function Login() {
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

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      cambiarPassword();
    }
  };

  return (
    <div className="background">
      <div className="centerForm">
        <label className="titleLogin">Cambiar Contraseña</label>
        <div className="inputsLogin">
          <TextField
            type="password"
            style={{ display: "flex", justifyContent: "center" }}
            id="outlined-basic"
            placeholder="Nueva Contraseña"
            variant="outlined"
            className="InputsDato"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div className="inputsLogin">
          <TextField
            type="password"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            id="outlined-basic"
            placeholder="Repetir Contraseña"
            variant="outlined"
            className="InputsDato"
            value={password}
            onKeyPress={_handleKeyDown}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="buttonLogin">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={cambiarPassword}
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
