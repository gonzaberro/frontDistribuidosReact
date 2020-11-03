import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import "../../Css/Materias.css";
import { useSelector } from "react-redux";

export default function ToolBarMaterias() {
  const rolUsuario = useSelector((state) => state.informacionPersonal.idRol);

  const planillaMaterias = () => {
    window.open(
      "localhost:8080/modulo-admin/materias/cuatrimestres-pdf",
      "_blank"
    );
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={3} className="ToolBarMaterias">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Buscar Materia"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={4}></Grid>

      <Grid item xs={12} sm={2} className="ToolBarMaterias">
        <Button variant="contained" color="primary" onClick={planillaMaterias}>
          Planilla de Materias
        </Button>
      </Grid>
      {rolUsuario === 1 && (
        <Grid item xs={12} sm={2} className="ToolBarMaterias">
          <Button variant="contained" className="ButtonNuevaMateria">
            Nueva Materia +
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
