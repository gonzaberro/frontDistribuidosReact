import React from "react";
import "../../../Css/RightContainer.css";
import { useSelector } from "react-redux";
import { MenuOptions } from "../../../actions/types";
import PageMaterias from "../../Materias/PageMaterias";
import PageExamenesFinales from "../../ExamenesFinales/PageExamenesFinales";
import PageInformacionPersonal from "../../InformacionPersonal/PageInformacionPersonal";
import PageAdministrarUsuarios from "../../AdministrarUsuarios/PageAdministrarUsuarios";
import PageCargarNotas from "../../CargarNotas/PageCargarNotas";
export default function RightContainer() {
  const menuSelected = useSelector((state) => state.menuSelected.menuSelected);

  const SwitchMenu = () => {
    switch (menuSelected) {
      case MenuOptions.Materias:
        return <PageMaterias />;
      case MenuOptions.ExamenesFinales:
        return <PageExamenesFinales />;
      case MenuOptions.InformacionPersonal:
        return <PageInformacionPersonal />;
      case MenuOptions.AdministrarUsuarios:
        return <PageAdministrarUsuarios />;
      case MenuOptions.CargarNotas:
        return <PageCargarNotas />;
      default:
        return <div></div>;
    }
  };

  return (
    <div className="RightContainer">
      <SwitchMenu />
    </div>
  );
}
