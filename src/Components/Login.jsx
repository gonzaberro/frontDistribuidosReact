import React from "react";
import "../Css/Login.css";
import { TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setLogged, selectMenu } from "../actions/MenuSwitchActions";
import { MenuOptions } from "../actions/types";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { apiCalls } from "../api/apiCalls";
import { setUserLogged } from "../actions/InformacionPersonal";
import { loggedStates } from "../actions/types";

export default function Login() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const Login = () => {
    apiCalls
      .loginUsuario({ email: email, password: password })
      .then((response) => {
        dispatch(
          setUserLogged({
            idUsuario: response.data.data.id,
            idRol: response.data.data.rol.id,
          })
        );
        if (response.data.data.primerIngreso) {
          dispatch(setLogged(loggedStates.firstLogin));
        } else {
          localStorage.setItem("idRol", response.data.data.rol.id);
          localStorage.setItem("idUsuario", response.data.data.id);
          dispatch(setLogged(loggedStates.logged));
        }

        dispatch(selectMenu(MenuOptions.InformacionPersonal));
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      Login();
    }
  };

  return (
    <div className="background">
      <div className="centerForm">
        <label className="titleLogin">Sui Guarani 2.0</label>
        <div className="inputsLogin">
          <TextField
            style={{ display: "flex", justifyContent: "center" }}
            id="outlined-basic"
            placeholder="Email"
            variant="outlined"
            className="InputsDato"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            placeholder="Contraseña"
            variant="outlined"
            className="InputsDato"
            value={password}
            onKeyPress={_handleKeyDown}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="buttonLogin">
          <Button fullWidth variant="contained" color="primary" onClick={Login}>
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
