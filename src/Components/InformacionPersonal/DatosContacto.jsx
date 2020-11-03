import React from "react";
import { Grid, TextField } from "@material-ui/core";
import "../../Css/InformacionPersonal.css";

export default function DatosContacto(props) {
  return (
    <Grid container className="ColumInformacionPersonal">
      <Grid item md={12}>
        <h3 className="TitleDatosContacto">Datos de Contacto</h3>
      </Grid>
      <Grid item md={12}>
        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Teléfono"
            variant="outlined"
            className="InputsDato"
            value={props.usuario.telefono}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Email"
            variant="outlined"
            className="InputsDato"
            value={props.usuario.email}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Dirección"
            variant="outlined"
            className="InputsDato"
            value={props.usuario.direccion?.calle}
          />
        </form>
      </Grid>
    </Grid>
  );
}
