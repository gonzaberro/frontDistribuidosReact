import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { apiCalls } from "../../api/apiCalls";
import { setExamen, setExamenesUsuario } from "../../actions/ExamenesActions";
import { setModal } from "../../actions/ModalActions";
import { useSnackbar } from "notistack";

import {
  Grid,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FormExamen(props) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const materias = useSelector((state) => state.examenesReducer.materias);
  const examenSeleccionado = useSelector(
    (state) => state.examenesReducer.examenSeleccionado
  );

  const idUsuario = useSelector((state) => state.informacionPersonal.idUsuario);

  const [materia, setMateria] = useState("");
  const [fechaExamen, setFechaExamen] = useState("2020-11-10");
  const [fechaInicioInscripcion, setFechaInicioInscripcion] = useState(
    "2020-11-10"
  );
  const [fechaFinInscripcion, setFechaFinInscripcion] = useState("2020-11-10");
  const [fechaNotas, setFechaNotas] = useState("2020-11-10");
  const [cargoInfo, setCargoInfo] = useState(false);
  useEffect(() => {
    if (examenSeleccionado.id && !cargoInfo) {
      setFechaNotas(examenSeleccionado.periodoInscripcion.fechaLimiteNota);
      setFechaInicioInscripcion(
        examenSeleccionado.periodoInscripcion.fechaDesde
      );
      setFechaFinInscripcion(examenSeleccionado.periodoInscripcion.fechaHasta);
      setMateria(examenSeleccionado.materia.id);
      setCargoInfo(true);
    }
  });

  const guardarMateria = () => {
    const examen = {
      idMateria: materia,
      fecha: fechaExamen,
      periodoInscripcion: {
        fechaDesde: fechaInicioInscripcion,
        fechaHasta: fechaFinInscripcion,
        fechaLimiteNota: fechaNotas,
      },
    };
    apiCalls
      .createExamen(examen)
      .then((response) => {
        apiCalls
          .getExamenesUsuario(idUsuario)
          .then((response) => {
            dispatch(setExamenesUsuario(response.data.data));
            dispatch(setModal(false));
            enqueueSnackbar("Se creó el examen final", {
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
  const editarMateria = () => {
    const examen = {
      idMateria: materia,
      fecha: fechaExamen,
      periodoInscripcion: {
        fechaDesde: fechaInicioInscripcion,
        fechaHasta: fechaFinInscripcion,
        fechaLimiteNota: fechaNotas,
      },
    };
    apiCalls
      .editarExamen(examenSeleccionado.id, examen)
      .then((response) => {
        apiCalls
          .getExamenesUsuario(idUsuario)
          .then((response) => {
            dispatch(setExamenesUsuario(response.data.data));
            dispatch(setExamen({}));
            dispatch(setModal(false));
            enqueueSnackbar("Se guardaron los cambios del examen final", {
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
          <h3 className="TitleDatosContacto">Datos del Exámen Final</h3>
        </Grid>

        <Grid item md={12}>
          <form noValidate autoComplete="off">
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Materias
              </InputLabel>
              <Select
                native
                disabled={examenSeleccionado.id ? true : false}
                value={materia}
                label="Materias"
                onChange={(event) => setMateria(event.target.value)}
              >
                <option aria-label="None" value="" />
                {materias.map((materia) => {
                  return (
                    <option value={materia.id}>
                      {materia.nombre +
                        " - " +
                        materia.turno.descripcion.toUpperCase()}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              style={{ marginTop: "10px" }}
              fullWidth
              format="dd/MM/YYYY"
              id="date"
              label="Fecha del Exámen"
              type="date"
              value={fechaExamen}
              className={classes.textField}
              onChange={(event) => setFechaExamen(event.target.value)}
            />
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

            <Button
              variant="contained"
              className="ButtonNuevoUsuario"
              onClick={examenSeleccionado.id ? editarMateria : guardarMateria}
            >
              Guardar Cambios
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
