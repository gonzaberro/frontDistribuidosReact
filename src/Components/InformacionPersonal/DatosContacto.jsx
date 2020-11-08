import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import "../../Css/InformacionPersonal.css";
import { useSnackbar } from "notistack";
import { apiCalls } from "../../api/apiCalls";
import FotoUpload from "../AdministrarUsuarios/FotoUpload";

export default function DatosContacto(props) {
  const [telefono, setTelefono] = useState();
  const [email, setEmail] = useState();
  const [direccion, setDireccion] = useState();
  const [localidad, setLocalidad] = useState();
  const [provincia, setProvincia] = useState();
  const [cargoInfo, setCargoInfo] = useState(false);
  const [pais, setPais] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    if (props.usuario.direccion && !cargoInfo) {
      setTelefono(props.usuario.telefono);
      setEmail(props.usuario.email);
      setDireccion(props.usuario.direccion?.calle);
      setLocalidad(props.usuario.direccion?.localidad);
      setProvincia(props.usuario.direccion?.provincia);
      setPais(props.usuario.direccion?.pais);
      setCargoInfo(true);
      setBase64Image(props.usuario.imagen);
    }
  });

  const actualizarInfo = () => {
    apiCalls
      .updateUsuario(props.usuario.id, {
        email: email,
        telefono: telefono,
        direccion: {
          pais: pais,
          provincia: provincia,
          localidad: localidad,
          calle: direccion,
        },
        imagen: base64Image,
      })
      .then((response) => {
        enqueueSnackbar("Se actualizaron tus datos de contacto", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

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
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Email"
            variant="outlined"
            className="InputsDato"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Dirección"
            variant="outlined"
            className="InputsDato"
            value={direccion}
            onChange={(event) => setDireccion(event.target.value)}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Dirección"
            variant="outlined"
            className="InputsDato"
            value={localidad}
            onChange={(event) => setLocalidad(event.target.value)}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Dirección"
            variant="outlined"
            className="InputsDato"
            value={provincia}
            onChange={(event) => setProvincia(event.target.value)}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Dirección"
            variant="outlined"
            className="InputsDato"
            value={pais}
            onChange={(event) => setPais(event.target.value)}
          />
        </form>
        <FotoUpload setBase64Image={setBase64Image} base64Image={base64Image} />
        <Button
          variant="contained"
          color="primary"
          className="ButtonGuardarInformacionPersonal"
          onClick={actualizarInfo}
        >
          Guardar Cambios
        </Button>
      </Grid>
    </Grid>
  );
}
