import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Materias from "./Materias";
import { apiCalls } from "../../api/apiCalls";
import { setMateriasUsuario, setDocentes } from "../../actions/MateriasActions";
import { setModal } from "../../actions/ModalActions";
import FormMateria from "./FormMateria";
import Modal from "@material-ui/core/Modal";
import HorariosMateria from "./HorariosMateria";
import { ModalFunctions } from "../../actions/types";
import AlumnosMateria from "./AlumnosMateria";
import { useSnackbar } from "notistack";

export default function PageMaterias() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const open_modal = useSelector((state) => state.modalReducer.open_modal);
  const modalFunctionValue = useSelector(
    (state) => state.modalReducer.functionModal
  );
  const idUsuario = useSelector((state) => state.informacionPersonal.idUsuario);

  useEffect(() => {
    apiCalls
      .getMateriasUsuario(idUsuario)
      .then((response) => {
        dispatch(setMateriasUsuario(response.data.data));
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
    apiCalls
      .getDocentes()
      .then((response) => {
        dispatch(setDocentes(response.data.data));
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  });

  const handleClose = () => {
    dispatch(setModal(false));
  };

  return (
    <>
      <Materias />
      {modalFunctionValue === ModalFunctions.horariosMateria && (
        <Modal
          open={open_modal ? true : false}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{ zIndex: 11000 }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              margin: 20,
              minHeight: "50vh",
              maxWidth: "40vw",
              marginLeft: "30%",
            }}
            className="modalBackGround"
          >
            <HorariosMateria />
          </div>
        </Modal>
      )}
      {modalFunctionValue === ModalFunctions.nuevaMateria && (
        <Modal
          open={open_modal ? true : false}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{ zIndex: 11000 }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              margin: 20,
              minHeight: "50vh",
            }}
          >
            <FormMateria />
          </div>
        </Modal>
      )}
      {modalFunctionValue === ModalFunctions.alumnosMateria && (
        <Modal
          open={open_modal ? true : false}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{ zIndex: 11000 }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              margin: 20,
              minHeight: "50vh",
              maxWidth: "40vw",
              marginLeft: "30%",
            }}
            className="modalBackGround"
          >
            <AlumnosMateria />
          </div>
        </Modal>
      )}
    </>
  );
}
