import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { apiCalls } from "../../api/apiCalls";
import {
  setMateriasUsuario,
  setMateriaSeleccionada,
} from "../../actions/MateriasActions";
import { setModal } from "../../actions/ModalActions";
import { useSnackbar } from "notistack";

import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FormMateria(props) {
  const { enqueueSnackbar } = useSnackbar();
  const materia = useSelector(
    (state) => state.materiasReducer.materiaSeleccionada
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const docentes = useSelector((state) => state.materiasReducer.docentes);
  const [turno, setTurno] = useState(1);
  const [docente, setDocente] = useState("");
  const [fechaInicioInscripcion, setFechaInicioInscripcion] = useState(
    "2020-11-10"
  );
  const [fechaFinInscripcion, setFechaFinInscripcion] = useState("2020-11-10");
  const [fechaNotas, setFechaNotas] = useState("2020-11-10");
  const [anioCarrera, setAnioCarrera] = useState();
  const [cuatrimestre, setCuatrimestre] = useState();
  const [nombre, setNombre] = useState();

  const [lunes, setLunes] = useState(false);
  const [martes, setMartes] = useState(false);
  const [miercoles, setMiercoles] = useState(false);
  const [jueves, setJueves] = useState(false);
  const [viernes, setViernes] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [cargoInfo, setCargoInfo] = useState(false);

  useEffect(() => {
    if (materia.id && !cargoInfo) {
      setTurno(materia.turno.id);
      setDocente(materia.profesor.id);
      setFechaFinInscripcion(materia.periodoInscripcion.fechaHasta);
      setFechaInicioInscripcion(materia.periodoInscripcion.fechaDesde);
      setFechaNotas(materia.periodoInscripcion.fechaLimiteNota);
      setNombre(materia.nombre);
      setCuatrimestre(materia.cuatrimestre);
      setAnioCarrera(materia.anioCarrera);

      materia.dias.forEach((dia) => setDiaTrue(dia.id));

      setCargoInfo(true);
    }
  });

  const setDiaTrue = (dia) => {
    console.log(dia);
    switch (dia) {
      case 1:
        setLunes(true);
        break;
      case 2:
        setMartes(true);
        break;
      case 3:
        setMiercoles(true);
        break;
      case 4:
        setJueves(true);
        break;
      case 5:
        setViernes(true);
        break;
      case 6:
        setSabado(true);
        break;
    }
  };

  const editarMateria = () => {
    const diasCursada = [];

    if (lunes) diasCursada.push(1);
    if (martes) diasCursada.push(2);
    if (miercoles) diasCursada.push(3);
    if (jueves) diasCursada.push(4);
    if (viernes) diasCursada.push(5);
    if (sabado) diasCursada.push(6);

    const editMateria = {
      nombre: nombre,
      idProfesor: docente,
      cuatrimestre: cuatrimestre,
      anioCarrera: anioCarrera,
      idTurno: turno,
      periodoInscripcion: {
        fechaDesde: fechaInicioInscripcion,
        fechaHasta: fechaFinInscripcion,
        fechaLimiteNota: fechaNotas,
      },
      dias: diasCursada,
    };
    apiCalls
      .editarMateria(materia.id, editMateria)
      .then((response) => {
        apiCalls
          .getUsuarios()
          .then((response) => {
            dispatch(setMateriasUsuario(response.data.data));
            dispatch(setModal(false));
            enqueueSnackbar("Se guardaron los cambios de la materia", {
              variant: "success",
            });
          })
          .catch((error) => {
            enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
              variant: "error",
            });
          });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

  const guardarMateria = () => {
    const diasCursada = [];

    if (lunes) diasCursada.push(1);
    if (martes) diasCursada.push(2);
    if (miercoles) diasCursada.push(3);
    if (jueves) diasCursada.push(4);
    if (viernes) diasCursada.push(5);
    if (sabado) diasCursada.push(6);

    const nuevaMateria = {
      nombre: nombre,
      idProfesor: docente,
      cuatrimestre: cuatrimestre,
      anioCarrera: anioCarrera,
      idTurno: turno,
      periodoInscripcion: {
        fechaDesde: fechaInicioInscripcion,
        fechaHasta: fechaFinInscripcion,
        fechaLimiteNota: fechaNotas,
      },
      dias: diasCursada,
    };
    apiCalls
      .createMateria(nuevaMateria)
      .then((response) => {
        apiCalls
          .getUsuarios()
          .then((response) => {
            dispatch(setMateriasUsuario(response.data.data));
            dispatch(setModal(false));
            dispatch(setMateriaSeleccionada({}));
            enqueueSnackbar("Se creó la materia", {
              variant: "success",
            });
          })
          .catch((error) => {
            enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
              variant: "error",
            });
          });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  };

  return (
    <>
      <Grid container className="ColumInformacionPersonal">
        <Grid item md={12}>
          <h3 className="TitleDatosContacto">Datos de la Materia</h3>
        </Grid>
        <Grid item md={5}>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Nombre"
              placeholder="Nombre"
              variant="outlined"
              className="InputsDato"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Nro Cuatrimestre"
              placeholder="Cuatrimestre"
              variant="outlined"
              className="InputsDato"
              value={cuatrimestre}
              onChange={(event) => setCuatrimestre(event.target.value)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Año de Carrera"
              label="Año de Carrera"
              variant="outlined"
              className="InputsDato"
              value={anioCarrera}
              onChange={(event) => setAnioCarrera(event.target.value)}
            />
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Turno
              </InputLabel>
              <Select
                native
                value={turno}
                label="Turno"
                onChange={(event) => setTurno(event.target.value)}
              >
                <option aria-label="None" value="" />
                <option value={1}>MAÑANA</option>
                <option value={2}>TARDE</option>
                <option value={3}>NOCHE</option>
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Profesor
              </InputLabel>
              <Select
                native
                value={docente}
                label="Profesor"
                onChange={(event) => setDocente(event.target.value)}
              >
                <option aria-label="None" value="" />
                {docentes.map((docente) => {
                  return (
                    <option value={docente.id}>
                      {docente.nombre + " " + docente.apellido}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </form>
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={5}>
          <form noValidate autoComplete="off">
            <TextField
              style={{ marginTop: "10px" }}
              fullWidth
              format="dd/MM/YYYY"
              id="date"
              label="Fecha Inicio de Inscripción"
              type="date"
              value={fechaInicioInscripcion}
              className={classes.textField}
              onChange={(event) =>
                setFechaInicioInscripcion(event.target.value)
              }
            />
            <TextField
              style={{ marginTop: "10px" }}
              fullWidth
              format="dd/MM/YYYY"
              id="date"
              label="Fecha Límite de Inscripción"
              type="date"
              value={fechaFinInscripcion}
              className={classes.textField}
              onChange={(event) => setFechaFinInscripcion(event.target.value)}
            />
            <TextField
              style={{ marginTop: "10px", marginBottom: "10px" }}
              fullWidth
              format="dd/MM/YYYY"
              id="date"
              label="Fecha Límite de Notas"
              type="date"
              value={fechaNotas}
              className={classes.textField}
              onChange={(event) => setFechaNotas(event.target.value)}
            />
            <label>Dias de Clase</label>
            <Grid container>
              <Grid item md={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={lunes}
                      name="gilad"
                      onChange={() => setLunes(lunes ? false : true)}
                    />
                  }
                  label="Lunes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={martes}
                      name="gilad"
                      onChange={() => setMartes(martes ? false : true)}
                    />
                  }
                  label="Martes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={miercoles}
                      name="gilad"
                      onChange={() => setMiercoles(miercoles ? false : true)}
                    />
                  }
                  label="Miercoles"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jueves}
                      name="gilad"
                      onChange={() => setJueves(jueves ? false : true)}
                    />
                  }
                  label="Jueves"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={viernes}
                      name="gilad"
                      onChange={() => setViernes(viernes ? false : true)}
                    />
                  }
                  label="Viernes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sabado}
                      name="gilad"
                      onChange={() => setSabado(sabado ? false : true)}
                    />
                  }
                  label="Sabado"
                />
              </Grid>
            </Grid>
            {materia.id ? (
              <Button
                variant="contained"
                className="ButtonNuevoUsuario"
                onClick={editarMateria}
              >
                Guardar Cambios
              </Button>
            ) : (
              <Button
                variant="contained"
                className="ButtonNuevoUsuario"
                onClick={guardarMateria}
              >
                Guardar Cambios
              </Button>
            )}
          </form>
        </Grid>
      </Grid>
    </>
  );
}
