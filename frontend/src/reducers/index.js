import { combineReducers } from "redux";

import LoginReducer from "./LoginReducer";
import globalReducer from "./GlobalReducer";
import AgendaReducer from "./AgendaReducer";
import EditTurnoReducer from "./EditTurnoReducer";
import VistaMensualySemanalReducer from "./VistaMensualySemanalReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import PlanReducer from "./PlanReducer";
import obraSocialReducer from "./ObraSocialReducer";
import EspecialidadReducer from "./EspecialidadReducer";
import PrestadoraReducer from "./PrestadoraReducer";
import ServicioReducer from "./ServicioReducer";
import TipoServicioReducer from "./TipoServicioReducer";
import CostoServicioReducer from "./CostoServicioReducer";
import ProfesionalReducer from "./ProfesionalReducer";
import PacienteReducer from "./PacienteReducer";
import HistoriaClinicaReducer from "./HistoriaClinicaReducer";
import BuscarTurnos from "./BuscarTurnoReducer";
import ProgramarAgenda from "./ProgramarAgendaReducer";

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
  servicio: ServicioReducer,
  tipoServicio: TipoServicioReducer,
  costoServicio: CostoServicioReducer,
  profesional: ProfesionalReducer,
  paciente: PacienteReducer,
  historiaClinica: HistoriaClinicaReducer,
  buscarTurnos: BuscarTurnos,
  programarAgenda: ProgramarAgenda,
});
