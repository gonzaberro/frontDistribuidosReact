import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

export default function FormInfoUsuario(props) {
  const [estudiante, setEstudiante] = useState(false);
  const [maestro, setMaestro] = useState(false);
  const [administrador, setAdministrador] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [provincia, setProvincia] = useState("");
  const [pais, setPais] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("1234");

  const administrarUsuarios = useSelector((state) => state.administrarUsuarios);

  useEffect(() => {
    if (administrarUsuarios.usuarioSeleccionado) {
      const usuario = administrarUsuarios.usuarioSeleccionado;
      setTelefono(usuario.telefono);
      setNombre(usuario.nombre);
      setApellido(usuario.apellido);
      setDocumento(usuario.dni);
      setEmail(usuario.email);
      setProvincia(usuario.direccion?.provincia);
      setPais(usuario.direccion?.pais);
      setLocalidad(usuario.direccion?.localidad);
      setDireccion(usuario.direccion?.calle);

      if (usuario.rol?.id === 1) {
        setAdministrador(true);
      } else if (usuario.rol?.id === 2) {
        setMaestro(true);
      } else {
        setEstudiante(true);
      }
    }
  });

  const handleChange = (idRol) => {
    switch (idRol) {
      case 1:
        setEstudiante(false);
        setMaestro(false);
        setAdministrador(true);
        break;
      case 2:
        setEstudiante(false);
        setAdministrador(false);
        setMaestro(true);
        break;
      case 3:
        setEstudiante(true);
        setAdministrador(false);
        setMaestro(false);
        break;
    }
  };

  return (
    <>
      <Grid container className="ColumInformacionPersonal">
        <Grid item md={12}>
          <h3 className="TitleDatosContacto">Datos del Usuario</h3>
        </Grid>
        <Grid item md={5}>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Teléfono"
              variant="outlined"
              className="InputsDato"
              value={telefono}
              onChange={(value) => setTelefono(value.value)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Email"
              variant="outlined"
              className="InputsDato"
              value={email}
              onChange={(value) => setEmail(value.value)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Dirección"
              variant="outlined"
              className="InputsDato"
              value={direccion}
              onChange={(value) => setDireccion(value.value)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Pais"
              variant="outlined"
              className="InputsDato"
              value={pais}
              onChange={(value) => setPais(value.value)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Provincia"
              variant="outlined"
              className="InputsDato"
              value={provincia}
              onChange={(value) => setProvincia(value.value)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Localidad"
              variant="outlined"
              className="InputsDato"
              value={localidad}
              onChange={(value) => setLocalidad(value.value)}
            />
          </form>
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={5}>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Nombre"
              variant="outlined"
              className="InputsDato"
              value={nombre}
              onChange={(value) => setNombre(value.value)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Apellido"
              variant="outlined"
              className="InputsDato"
              value={apellido}
              onChange={(value) => setApellido(value.value)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Documento"
              variant="outlined"
              className="InputsDato"
              value={documento}
              onChange={(value) => setDocumento(value.value)}
            />
            <label>Rol del Usuario</label>
            <Grid container>
              <Grid item md={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={administrador}
                      onChange={() => handleChange(1)}
                      name="gilad"
                    />
                  }
                  label="Administrador"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={maestro}
                      onChange={() => handleChange(2)}
                      name="gilad"
                    />
                  }
                  label="Maestro"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={estudiante}
                      onChange={() => handleChange(3)}
                      name="gilad"
                    />
                  }
                  label="Estudiante"
                />
              </Grid>
            </Grid>
            <Button variant="contained" className="ButtonNuevoUsuario">
              Guardar Cambios
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
