import React from "react";
import HeaderMaterias from "./HeaderMaterias";
import DataMaterias from "./DataMaterias";
import ToolBarMaterias from "./ToolBarMaterias";
import { useSelector } from "react-redux";

import "../../Css/Materias.css";

export default function Materias() {
  const listMaterias = useSelector((state) => state.materiasReducer.materias);
  const searchField = useSelector((state) => state.materiasReducer.searchField);

  return (
    <div className="Materias">
      <ToolBarMaterias />
      <HeaderMaterias />
      <div className="OverflowTable">
        {listMaterias
          .filter(
            (materia) =>
              materia.nombre
                .toUpperCase()
                .includes(searchField.toUpperCase()) || "" === searchField
          )
          .map((materia) => {
            return <DataMaterias materia={materia} />;
          })}
      </div>
    </div>
  );
}
