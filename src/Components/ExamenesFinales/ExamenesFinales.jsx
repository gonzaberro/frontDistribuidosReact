import React from "react";
import HeaderExamenesFinales from "./HeaderExamenesFinales";
import DataExamenesFinales from "./DataExamenesFinales";
import ToolBarExamenesFinales from "./ToolBarExamenesFinales";
import { useSelector } from "react-redux";

import "../../Css/Materias.css";

export default function ExamenesFinales() {
  const examenes = useSelector((state) => state.examenesReducer.examenes);
  const searchField = useSelector((state) => state.examenesReducer.searchField);

  return (
    <div className="Materias">
      <ToolBarExamenesFinales />
      <HeaderExamenesFinales />
      <div className="OverflowTable">
        {examenes
          .filter(
            (examen) =>
              examen.materia.nombre
                .toUpperCase()
                .includes(searchField.toUpperCase()) || "" === searchField
          )
          .map((examen) => {
            return <DataExamenesFinales examen={examen} />;
          })}
      </div>
    </div>
  );
}
