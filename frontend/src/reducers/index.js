import { combineReducers } from "redux";

import LoginReducer from "./LoginReducer";
import globalReducer from "./GlobalReducer";
import AgendaReducer from "./AgendaReducer";
import EditTurnoReducer from "./EditTurnoReducer";
import VistaMensualySemanalReducer from "./VistaMensualySemanalReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import PlanReducer from "./PlanReducer";
import ObraSocialReducer from "./ObraSocialReducer";
import EspecialidadReducer from "./EspecialidadReducer";
import PrestadoraReducer from "./PrestadoraReducer";
import ServicioReducer from "./ServicioReducer";
import TipoServicioReducer from "./TipoServicioReducer";

export default combineReducers({
  login_state: LoginReducer,
  globalReducer: globalReducer,
  agenda_reducer: AgendaReducer,
  editTurnoReducer: EditTurnoReducer,
  vista_mensual_semanal: VistaMensualySemanalReducer,
  obra_social: ObraSocialReducer,
  toastr: toastrReducer,
  plan: PlanReducer,
  especialidad: EspecialidadReducer,
  prestadora: PrestadoraReducer,
  servicio: ServicioReducer,
  tipoServicio: TipoServicioReducer,
});
