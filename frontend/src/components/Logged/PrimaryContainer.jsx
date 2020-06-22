import React from "react";
import Agenda from "./Agenda/Agenda";

import Wrapper from "components/Logged/Wrapper";
import ObraSocial from "./FormsABM/ObraSocial/ObraSocial";
import Plan from "./FormsABM/Plan/Plan";
import Servicio from "./FormsABM/Servicio/Servicio";
import { useSelector } from "react-redux";
import { menuOptions } from "Utils/constants";
import AgendaMensual from "./Agenda Mensual/AgendaMensual";
import AgendaSemanal from "./Agenda Semanal/AgendaSemanal";
import Especialidad from "./FormsABM/Especialidad/Especialidad";
import Prestadora from "./FormsABM/Prestadora/Prestadora";
import TipoServicio from "./FormsABM/TipoServicio/TipoServicio";
import Profesional from "./FormsABM/Profesional/Profesional";
import Paciente from "./FormsABM/Paciente/Paciente";

export default function PrimaryContainer() {
  const menuSelected = useSelector((state) => state.globalReducer.menuSelected);

  const switchMenu = () => {
    switch (menuSelected) {
      case menuOptions.Agenda_DIARIA:
        return (
          <div style={{ height: "100%" }}>
            <Agenda />
          </div>
        );
      case menuOptions.Agenda_MENSUAL:
        return (
          <div style={{ height: "100%" }}>
            <AgendaMensual />
          </div>
        );
      case menuOptions.Agenda_SEMANAL:
        return (
          <div style={{ height: "100%" }}>
            <AgendaSemanal />
          </div>
        );

      case menuOptions.OBRAS_SOCIALES:
        return <ObraSocial />;
      case menuOptions.PLAN:
        return <Plan />;
      case menuOptions.SERVICIOS:
        return <Servicio />;
      case menuOptions.TIPO_SERVICIO:
        return <TipoServicio />;
      case menuOptions.PRESTADORA:
        return <Prestadora />;
      case menuOptions.PROFESIONALES:
        return <Profesional />;
      case menuOptions.PACIENTES:
        return <Paciente />;

      case menuOptions.ESPECIALIDADES:
        return <Especialidad />;
      default:
        return <></>;
    }
  };

  return switchMenu();
}
