import React, { useEffect } from "react";
import Logged from "./Logged";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { loggedStates } from "../actions/types";
import CambiarPassFirstLogin from "./CambiarPassFirstLogin";
import { setUserLogged } from "../actions/InformacionPersonal";
import { setLogged } from "../actions/MenuSwitchActions";

export default function LoginSwitch() {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.menuSelected.isLogged);

  useEffect(() => {
    if (
      localStorage.getItem("idUsuario") &&
      localStorage.getItem("idUsuario") !== ""
    ) {
      dispatch(setLogged(loggedStates.logged));
      dispatch(
        setUserLogged({
          idUsuario: parseInt(localStorage.getItem("idUsuario")),
          idRol: parseInt(localStorage.getItem("idRol")),
        })
      );
    }
  });

  return (
    <>
      {logged === loggedStates.logged && <Logged />}
      {logged === loggedStates.firstLogin && <CambiarPassFirstLogin />}
      {logged === loggedStates.login && <Login />}
    </>
  );
}
