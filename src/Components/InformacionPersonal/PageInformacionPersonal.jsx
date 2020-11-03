import React, { useEffect } from "react";
import InformacionPersonal from "./InformacionPersonal";
import { useDispatch } from "react-redux";
import { setUsuario } from "../../actions/InformacionPersonal";
import { apiCalls } from "../../api/apiCalls";

export default function PageAdministrarUsuarios() {
  const dispatch = useDispatch();

  useEffect(() => {
    apiCalls
      .getUsuario(1)
      .then((response) => {
        dispatch(setUsuario(response.data.data));
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  return <InformacionPersonal />;
}
