import React, { useEffect } from "react";
import AdministrarUsuarios from "./AdministrarUsuarios";
import { useDispatch, useSelector } from "react-redux";
import { setUsuarios } from "../../actions/AdministrarUsuariosActions";
import { apiCalls } from "../../api/apiCalls";
import Modal from "@material-ui/core/Modal";
import { setModal } from "../../actions/ModalActions";
import FormInfoUsuario from "./FormInfoUsuario";

export default function PageAdministrarUsuarios() {
  const dispatch = useDispatch();
  const open_modal = useSelector((state) => state.modalReducer.open_modal);

  useEffect(() => {
    apiCalls
      .getUsuarios()
      .then((response) => {
        dispatch(setUsuarios(response.data.data));
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
      <AdministrarUsuarios />
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
          <FormInfoUsuario />
        </div>
      </Modal>
    </>
  );
}
