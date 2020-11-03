import { combineReducers } from "redux";

import MenuSwitchReducer from "./MenuSwitchReducer";
import AdministrarUsuariosReducer from "./AdministrarUsuariosReducer"
import InformacionPersonalReducer from "./InformacionPersonalReducer"
import MateriasReducer from "./MateriasReducer"
import ModalReducer from "./ModalReducer"
import ExamenesReducer from "./ExamenesReducer"
//combino los states de los reducers en 1 solo para poder accederlo desde los componentes
export default combineReducers({
  menuSelected: MenuSwitchReducer,
  administrarUsuarios : AdministrarUsuariosReducer,
  informacionPersonal:InformacionPersonalReducer,
  modalReducer: ModalReducer,
  materiasReducer:MateriasReducer,
  examenesReducer:ExamenesReducer
});
