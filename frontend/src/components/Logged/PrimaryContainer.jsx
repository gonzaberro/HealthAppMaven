import React from "react";
import Agenda from "./Agenda/Agenda";

import Wrapper from "components/Logged/Wrapper";
import ObraSocial from "./FormsABM/ObraSocial/ObraSocial";
import Plan from "./FormsABM/Plan/Plan";
import { useSelector } from "react-redux";
import { menuOptions } from "Utils/constants";
import AgendaMensual from "./Agenda Mensual/AgendaMensual";
import AgendaSemanal from "./Agenda Semanal/AgendaSemanal";
import {
  columnsPacientes,
  formPacientes,
  obraSocialOptions,
  columnsPersonalMedico,
  formPersonalMedico,
  columnsInstituciones,
  formInstituciones,
  columnsEspecialidades,
  formEspecialidades,
} from "Utils/formInputs";

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
      case menuOptions.PESONAL_SALUD:
        return (
          <Wrapper
            columns={columnsPersonalMedico}
            inputs={formPersonalMedico}
          />
        );
      case menuOptions.PACIENTES:
        return (
          <Wrapper
            columns={columnsPacientes}
            inputs={formPacientes}
            options={obraSocialOptions}
          />
        );
      case menuOptions.INSTITUCIONES:
        return (
          <Wrapper columns={columnsInstituciones} inputs={formInstituciones} />
        );
      case menuOptions.ESPECIALIDADES:
        return (
          <Wrapper
            columns={columnsEspecialidades}
            inputs={formEspecialidades}
          />
        );
      default:
        return <></>;
    }
  };

  return switchMenu();
}
