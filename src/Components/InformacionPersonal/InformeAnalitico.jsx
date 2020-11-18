import React from "react";
import { Grid, Button } from "@material-ui/core";
import "../../Css/InformacionPersonal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { apiUrlEstudiante as apiUrl } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setModal, modalFunction } from "../../actions/ModalActions";
import { ModalFunctions } from "../../actions/types";
import { setAnaliticoUsuario } from "../../actions/InformacionPersonal";
import { apiCalls } from "../../api/apiCalls";
import { useSnackbar } from "notistack";

export default function InformeAnalitico() {
  const idUsuario = useSelector((state) => state.informacionPersonal.idUsuario);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const analitico = () => {
    apiCalls
      .getAnaliticoUsuario(idUsuario)
      .then((response) => {
        dispatch(setAnaliticoUsuario(response.data.data));
        dispatch(setModal(true));
        dispatch(modalFunction(ModalFunctions.analiticoAlumno));
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };
  return (
    <Grid container className="ColumInformacionPersonal">
      <Grid item md={12} style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={analitico}>
          Ver Informe Analítico
        </Button>
      </Grid>
    </Grid>
  );
}
