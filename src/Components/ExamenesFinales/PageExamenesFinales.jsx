import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExamenesFinales from "./ExamenesFinales";
import { apiCalls } from "../../api/apiCalls";
import { setExamenesUsuario, setExamen } from "../../actions/ExamenesActions";
import { setModal } from "../../actions/ModalActions";
import Modal from "@material-ui/core/Modal";
import FormExamen from "./FormExamen";
import { useSnackbar } from "notistack";

export default function PageMaterias() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const open_modal = useSelector((state) => state.modalReducer.open_modal);
  const idUsuario = useSelector((state) => state.informacionPersonal.idUsuario);

  useEffect(() => {
    apiCalls
      .getExamenesUsuario(idUsuario)
      .then((response) => {
        dispatch(setExamenesUsuario(response.data.data));
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
          variant: "error",
        });
      });
  });

  const handleClose = () => {
    dispatch(setExamen({}));
    dispatch(setModal(false));
  };

  return (
    <>
      <ExamenesFinales />

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
        >
          <FormExamen />
        </div>
      </Modal>
    </>
  );
}
