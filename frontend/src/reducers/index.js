import { combineReducers } from "redux";

import LoginReducer from "./LoginReducer";
import globalReducer from "./globalReducer";
import AgendaReducer from "./AgendaReducer";
import EditTurnoReducer from "./EditTurnoReducer";
import VistaMensualySemanalReducer from "./VistaMensualySemanalReducer";
import { reducer as toastrReducer } from "react-redux-toastr";

import ObraSocialReducer from "./obraSocialReducer";

export default combineReducers({
  login_state: LoginReducer,
  globalReducer: globalReducer,
  agenda_reducer: AgendaReducer,
  editTurnoReducer: EditTurnoReducer,
  vista_mensual_semanal: VistaMensualySemanalReducer,
  obra_social: ObraSocialReducer,
  toastr: toastrReducer,
});
