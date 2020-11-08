import React, { useEffect } from "react";
import InformacionPersonal from "./InformacionPersonal";
import { useDispatch, useSelector } from "react-redux";
import { setUsuario } from "../../actions/InformacionPersonal";
import { apiCalls } from "../../api/apiCalls";
import { useSnackbar } from "notistack";

export default function PageAdministrarUsuarios() {
  const dispatch = useDispatch();
  const idUsuario = useSelector((state) => state.informacionPersonal.idUsuario);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    apiCalls
      .getUsuario(idUsuario)
      .then((response) => {
        dispatch(setUsuario(response.data.data));
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  });

  useEffect(() => {
    return () => dispatch(setUsuario({}));
  });

  return <InformacionPersonal />;
}
