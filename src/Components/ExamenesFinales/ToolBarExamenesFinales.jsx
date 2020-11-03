import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import "../../Css/ExamenesFinales.css";
import { useSelector } from "react-redux";
export default function ToolBarExamenesFinales() {
  const rolUsuario = useSelector((state) => state.informacionPersonal.idRol);

  return (
    <Grid container>
      <Grid item xs={12} sm={3} className="ToolBarExamenesFinales">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Buscar Examen Final"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={7}></Grid>
      {rolUsuario === 1 && (
        <Grid item xs={12} sm={2} className="ToolBarExamenesFinales">
          <Button variant="contained" className="ButtonNuevoExamenFinal">
            Nuevo Examen Final +
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
