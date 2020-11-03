import React from "react";
import { Grid, TextField } from "@material-ui/core";
import "../../Css/InformacionPersonal.css";

export default function DatosPersonales(props) {
  return (
    <Grid container className="ColumInformacionPersonal">
      <Grid item md={12}>
        <h3 className="TitleDatosContacto">Datos Personales</h3>
      </Grid>
      <Grid item md={12}>
        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            disabled={true}
            id="outlined-basic"
            placeholder="Nombre"
            variant="outlined"
            className="InputsDato"
            value={props.usuario.nombre}
          />
          <TextField
            fullWidth
            disabled={true}
            id="outlined-basic"
            placeholder="Apellido"
            variant="outlined"
            className="InputsDato"
            value={props.usuario.apellido}
          />
          <TextField
            fullWidth
            disabled={true}
            id="outlined-basic"
            placeholder="Documento"
            variant="outlined"
            className="InputsDato"
            value={props.usuario.dni}
          />
          <h3>Cambiar Contraseña</h3>
          <TextField
            fullWidth
            type="password"
            id="outlined-basic"
            placeholder="Clave"
            variant="outlined"
            className="InputsDato"
          />
          <TextField
            fullWidth
            type="password"
            id="outlined-basic"
            placeholder="Confirmar Clave"
            variant="outlined"
            className="InputsDato"
          />
        </form>
      </Grid>
    </Grid>
  );
}
