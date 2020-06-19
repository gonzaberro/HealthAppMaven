import { combineReducers } from "redux";

import LoginReducer from "./LoginReducer";
import globalReducer from "./globalReducer";
import AgendaReducer from "./AgendaReducer";
import EditTurnoReducer from "./EditTurnoReducer";
import VistaMensualySemanalReducer from "./VistaMensualySemanalReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import PlanReducer from "./PlanReducer";
import obraSocialReducer from "./obraSocialReducer";
import EspecialidadReducer from "./EspecialidadReducer";
import PrestadoraReducer from "./PrestadoraReducer";
import ProfesionalReducer from "./ProfesionalReducer";
import PacienteReducer from "./PacienteReducer";

export default combineReducers({
  login_state: LoginReducer,
  globalReducer: globalReducer,
  agenda_reducer: AgendaReducer,
  editTurnoReducer: EditTurnoReducer,
  vista_mensual_semanal: VistaMensualySemanalReducer,
  obra_social: obraSocialReducer,
  toastr: toastrReducer,
  plan: PlanReducer,
  especialidad: EspecialidadReducer,
  prestadora: PrestadoraReducer,
  profesional: ProfesionalReducer,
  paciente: PacienteReducer,
});
