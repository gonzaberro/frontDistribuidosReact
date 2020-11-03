import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExamenesFinales from "./ExamenesFinales";
import { apiCalls } from "../../api/apiCalls";
import { setExamenesUsuario } from "../../actions/ExamenesActions";
import { setModal } from "../../actions/ModalActions";
import Modal from "@material-ui/core/Modal";

export default function PageMaterias() {
  const dispatch = useDispatch();
  const open_modal = useSelector((state) => state.modalReducer.open_modal);

  useEffect(() => {
    apiCalls
      .getExamenesUsuario(1)
      .then((response) => {
        dispatch(setExamenesUsuario(response.data.data));
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  const handleClose = () => {
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
        ></div>
      </Modal>
    </>
  );
}
