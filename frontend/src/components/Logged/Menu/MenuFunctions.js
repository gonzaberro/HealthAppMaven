import { SWITCH_MENU } from "actions/types";
import { menuOptions } from "Utils/constants";
import { setLogin } from "actions/LoginActions";

export const gotoMenu = (selected, dispatch) => {
  dispatch({
    type: SWITCH_MENU,
    payload: { menu: selected, limpiar: true },
  });
};
export const agendaSeleccionada = (menuSelected) => {
  switch (menuSelected) {
    case menuOptions.AGENDA:
      return true;

    case menuOptions.Agenda_DIARIA:
      return true;

    case menuOptions.Agenda_MENSUAL:
      return true;

    case menuOptions.Agenda_SEMANAL:
      return true;

    default:
      return false;
  }
};
export const informacionEmpresaSeleccionada = (menuSelected) => {
  switch (menuSelected) {
    case menuOptions.INFORMACION_EMPRESA:
      return true;
    case menuOptions.ESPECIALIDADES:
      return true;

    case menuOptions.OBRAS_SOCIALES:
      return true;

    case menuOptions.PLAN:
      return true;

    case menuOptions.SERVICIOS:
      return true;

    case menuOptions.TIPO_SERVICIO:
      return true;

    case menuOptions.PRESTADORA:
      return true;

    case menuOptions.COSTO_SERVICIO:
      return true;

    default:
      return false;
  }
};
export const closeSession = (dispatch) => {
  localStorage.removeItem("token");
  dispatch(setLogin(0));
};
