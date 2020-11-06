import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import "../../Css/ExamenesFinales.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchExamen,
  setMateriasExamen,
} from "../../actions/ExamenesActions";
import { setModal } from "../../actions/ModalActions";
import { apiCalls } from "../../api/apiCalls";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { apiUrl } from "../../api/api";

export default function ToolBarExamenesFinales() {
  const { enqueueSnackbar } = useSnackbar();
  const rolUsuario = useSelector((state) => state.informacionPersonal.idRol);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchExamen(search));
    }
  };
  const newExamen = () => {
    apiCalls
      .getMaterias()
      .then((response) => {
        dispatch(setMateriasExamen(response.data.data));
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
    dispatch(setModal(true));
  };

  const planillaExamenes = () => {
    window.open(apiUrl + "/modulo-admin/finales/finales-pdf", "_blank");
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={3} className="ToolBarExamenesFinales">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Buscar Examen Final"
          variant="outlined"
          onChange={(event) => setSearch(event.target.value)}
          onKeyPress={_handleKeyDown}
        />
      </Grid>
      <Grid item xs={12} sm={5}></Grid>
      {rolUsuario === 1 && (
        <Grid item xs={12} sm={2} className="ToolBarExamenesFinales">
          <Button
            variant="contained"
            className="ButtonNuevoExamenFinal"
            onClick={newExamen}
          >
            Nuevo Examen Final
          </Button>
        </Grid>
      )}
      <Grid item xs={12} sm={2} className="ToolBarMaterias">
        <Button variant="contained" color="primary" onClick={planillaExamenes}>
          Descargar en PDF
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
