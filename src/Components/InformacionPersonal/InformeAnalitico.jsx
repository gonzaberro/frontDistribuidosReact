import React from "react";
import { Grid, Button } from "@material-ui/core";
import "../../Css/InformacionPersonal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { apiUrl } from "../../api/api";
import { useSelector } from "react-redux";

export default function InformeAnalitico() {
  const idUsuario = useSelector((state) => state.informacionPersonal.idUsuario);

  const planillaMaterias = () => {
    window.open(
      apiUrl + "/modulo-admin/usuarios/analitico-pdf?idUsuario=" + idUsuario,
      "_blank"
    );
  };

  return (
    <Grid container className="ColumInformacionPersonal">
      <Grid item md={12}>
        <h4>Informe Analítico</h4>
      </Grid>

      <Grid item md={12}>
        <Button variant="contained" color="primary" onClick={planillaMaterias}>
          Descargar
          <FontAwesomeIcon
            className="IconMateriaOn"
            icon={faDownload}
            title="Recordatorios Examenes Finales"
            style={{ color: "white" }}
          />
        </Button>
      </Grid>
    </Grid>
  );
}
