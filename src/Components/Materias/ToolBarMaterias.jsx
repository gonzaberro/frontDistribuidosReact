import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import "../../Css/Materias.css";
import { useSelector, useDispatch } from "react-redux";
import { setSearchFieldMateria } from "../../actions/MateriasActions";
import { setModal, modalFunction } from "../../actions/ModalActions";
import { ModalFunctions } from "../../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { apiUrl } from "../../api/api";

export default function ToolBarMaterias() {
  const rolUsuario = useSelector((state) => state.informacionPersonal.idRol);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const planillaMaterias = () => {
    window.open(apiUrl + "/modulo-admin/materias/cuatrimestres-pdf", "_blank");
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchFieldMateria(search));
    }
  };
  const nuevaMateria = () => {
    dispatch(setModal(true));
    dispatch(modalFunction(ModalFunctions.nuevaMateria));
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={3} className="ToolBarMaterias">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Buscar Materia"
          variant="outlined"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyPress={_handleKeyDown}
        />
      </Grid>
      <Grid item xs={12} sm={5}></Grid>
      {rolUsuario === 1 && (
        <Grid item xs={12} sm={2} className="ToolBarMaterias">
          <Button
            variant="contained"
            className="ButtonNuevaMateria"
            onClick={nuevaMateria}
          >
            Nueva Materia +
          </Button>
        </Grid>
      )}
      <Grid item xs={12} sm={2} className="ToolBarMaterias">
        <Button variant="contained" color="primary" onClick={planillaMaterias}>
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
