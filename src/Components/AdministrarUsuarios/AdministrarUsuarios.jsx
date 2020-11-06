import React from "react";
import { useSelector } from "react-redux";
import HeaderAdministrarUsuarios from "./HeaderAdministrarUsuarios";
import DataAdministrarUsuarios from "./DataAdministrarUsuarios";
import ToolBarMaterias from "./ToolBarAdministrarUsuarios";
import "../../Css/Materias.css";

export default function AdministrarUsuarios() {
  const administrarUsuarios = useSelector((state) => state.administrarUsuarios);
  const searchField = useSelector(
    (state) => state.administrarUsuarios.searchField
  );

  return (
    <div className="Materias">
      <ToolBarMaterias />
      <HeaderAdministrarUsuarios />
      <div className="OverflowTable">
        {administrarUsuarios.usuarios
          .filter(
            (usuario) =>
              usuario.nombre
                .toUpperCase()
                .includes(searchField.toUpperCase()) ||
              usuario.apellido
                .toUpperCase()
                .includes(searchField.toUpperCase()) ||
              "" === searchField
          )
          .map((usuario, index) => {
            return <DataAdministrarUsuarios key={index} usuario={usuario} />;
          })}
      </div>
    </div>
  );
}
