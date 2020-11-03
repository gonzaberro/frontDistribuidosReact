import React from "react";
import HeaderMaterias from "./HeaderMaterias";
import DataMaterias from "./DataMaterias";
import ToolBarMaterias from "./ToolBarMaterias";
import { useSelector } from "react-redux";

import "../../Css/Materias.css";

export default function Materias() {
  const materias = useSelector((state) => state.materiasReducer.materias);

  return (
    <div className="Materias">
      <ToolBarMaterias />
      <HeaderMaterias />
      <div className="OverflowTable">
        {materias.map((materia) => {
          return <DataMaterias materia={materia} />;
        })}
      </div>
    </div>
  );
}
