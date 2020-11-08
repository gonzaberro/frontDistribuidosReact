import React from "react";
import "../../../Css/MenuItems.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
  faBook,
  faFileAlt,
  faUserPlus,
  faMarker,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu } from "../../../actions/MenuSwitchActions";
import { MenuOptions, loggedStates } from "../../../actions/types";
import { setLogged } from "../../../actions/MenuSwitchActions";

export default function MenuItems() {
  const disptach = useDispatch();
  const rolUsuario = useSelector((state) => state.informacionPersonal.idRol);
  const menuSelected = useSelector((state) => state.menuSelected.menuSelected);
  const switchMenu = (menuSelected) => {
    disptach(selectMenu(menuSelected));
  };
  const cerrarSesion = () => {
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("idUsuario");
    disptach(setLogged(loggedStates.login));
  };
  console.log(rolUsuario);
  return (
    <div style={{ overflowY: "auto", maxHeight: "90vh" }}>
      <div
        className={
          menuSelected === MenuOptions.InformacionPersonal
            ? "MenuItems-Selected MenuItems"
            : "MenuItems"
        }
        onClick={() => switchMenu(MenuOptions.InformacionPersonal)}
      >
        <FontAwesomeIcon className="Icon" icon={faUserAlt} />
        <label className="LabelIcon">Información Personal</label>
      </div>
      <div
        className={
          menuSelected === MenuOptions.Materias
            ? "MenuItems-Selected MenuItems"
            : "MenuItems"
        }
        onClick={() => switchMenu(MenuOptions.Materias)}
      >
        <FontAwesomeIcon className="Icon" icon={faBook} />
        <label className="LabelIcon">Materias</label>
      </div>

      <div
        className={
          menuSelected === MenuOptions.ExamenesFinales
            ? "MenuItems-Selected MenuItems"
            : "MenuItems"
        }
        onClick={() => switchMenu(MenuOptions.ExamenesFinales)}
      >
        <FontAwesomeIcon className="Icon" icon={faFileAlt} />
        <label className="LabelIcon">Exámenes Finales</label>
      </div>

      {rolUsuario === 1 && (
        <div
          className={
            menuSelected === MenuOptions.AdministrarUsuarios
              ? "MenuItems-Selected MenuItems"
              : "MenuItems"
          }
          onClick={() => switchMenu(MenuOptions.AdministrarUsuarios)}
        >
          <FontAwesomeIcon className="Icon" icon={faUserPlus} />
          <label className="LabelIcon">Administrar Usuarios</label>
        </div>
      )}
      {rolUsuario === 2 && (
        <div
          className={
            menuSelected === MenuOptions.CargarNotas
              ? "MenuItems-Selected MenuItems"
              : "MenuItems"
          }
          onClick={() => switchMenu(MenuOptions.CargarNotas)}
        >
          <FontAwesomeIcon className="Icon" icon={faMarker} />
          <label className="LabelIcon">Cargar Notas</label>
        </div>
      )}
      <div
        className={
          menuSelected === MenuOptions.CargarNotas
            ? "MenuItems-Selected MenuItems"
            : "MenuItems"
        }
        onClick={cerrarSesion}
      >
        <FontAwesomeIcon className="Icon" icon={faSignOutAlt} />
        <label className="LabelIcon">Cerrar Sesión</label>
      </div>
    </div>
  );
}
