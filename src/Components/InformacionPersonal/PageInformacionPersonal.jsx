import React, { useEffect } from "react";
import InformacionPersonal from "./InformacionPersonal";
import { useDispatch, useSelector } from "react-redux";
import { setUsuario } from "../../actions/InformacionPersonal";
import { apiCalls } from "../../api/apiCalls";
import { useSnackbar } from "notistack";
import { setModal } from "../../actions/ModalActions";
import Modal from "@material-ui/core/Modal";
import AnaliticoAlumno from "./AnaliticoAlumno";

export default function PageAdministrarUsuarios() {
  const dispatch = useDispatch();
  const open_modal = useSelector((state) => state.modalReducer.open_modal);

  const idUsuario = useSelector((state) => state.informacionPersonal.idUsuario);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    apiCalls
      .getUsuario(idUsuario)
      .then((response) => {
        dispatch(setUsuario(response.data.data));
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  });

  useEffect(() => {
    return () => dispatch(setUsuario({}));
  });
  const handleClose = () => {
    dispatch(setModal(false));
  };

  return (
    <>
      <InformacionPersonal />
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
          <AnaliticoAlumno />
        </div>
      </Modal>
    </>
  );
}
