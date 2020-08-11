import React, { useEffect } from "react";
import Agenda from "./Agenda/Agenda";
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
import BuscarTurno from "./BuscarTurno/BuscarTurno";
import CostoServicio from "./FormsABM/CostoServicio/CostoServicio";
import Usuarios from "./FormsABM/Usuarios/Usuarios";
import Profesional from "./Profesional/Profesional";
import Paciente from "./Paciente/Paciente";
import Perfil from "./FormsABM/Perfil/Perfil";
import FuncionPerfil from "./FormsABM/FuncionPerfil/FuncionPerfil";
import HistoriaClinica from "./HistoriaClinica/HistoriaClinica";
import { useSnackbar } from "notistack";

export default function PrimaryContainer() {
  const { enqueueSnackbar } = useSnackbar();

  const menuSelected = useSelector((state) => state.globalReducer.menuSelected);
  const errorMessage = useSelector((state) => state.errorMessage.error);

  useEffect(() => {
    if (errorMessage.tipo !== undefined) {
      enqueueSnackbar(errorMessage.message, {
        variant: errorMessage.tipo,
      });
    }
  }, [enqueueSnackbar, errorMessage]);

  const switchMenu = () => {
    switch (menuSelected) {
      case menuOptions.Agenda_DIARIA:
        return (
          <div style={{ height: "100%" }}>
            <Agenda limpiar={menuSelected.limpiar} />
          </div>
        );
      case menuOptions.Agenda_MENSUAL:
        return (
          <div style={{ height: "100%" }}>
            <AgendaMensual limpiar={menuSelected.limpiar} />
          </div>
        );
      case menuOptions.Agenda_SEMANAL:
        return (
          <div style={{ height: "100%" }}>
            <AgendaSemanal limpiar={menuSelected.limpiar} />
          </div>
        );
      case menuOptions.BUSCAR_TURNO:
        return (
          <div style={{ height: "100%" }}>
            <BuscarTurno limpiar={menuSelected.limpiar} />
          </div>
        );
      case menuOptions.OBRAS_SOCIALES:
        return (
          <div style={{ height: "100%" }}>
            <ObraSocial limpiar={menuSelected.limpiar} />
          </div>
        );
      case menuOptions.PLAN:
        return (
          <div style={{ height: "100%" }}>
            <Plan limpiar={menuSelected.limpiar} />
          </div>
        );
      case menuOptions.SERVICIOS:
        return (
          <div style={{ height: "100%" }}>
            <Servicio limpiar={menuSelected.limpiar} />
          </div>
        );
      case menuOptions.TIPO_SERVICIO:
        return (
          <div style={{ height: "100%" }}>
            <TipoServicio limpiar={menuSelected.limpiar} />
          </div>
        );
      case menuOptions.PRESTADORA:
        return (
          <div style={{ height: "100%" }}>
            <Prestadora limpiar={menuSelected.limpiar} />
          </div>
        );

      case menuOptions.COSTO_SERVICIO:
        return (
          <div style={{ height: "100%" }}>
            <CostoServicio limpiar={menuSelected.limpiar} />
          </div>
        );

      case menuOptions.PROFESIONALES:
        return (
          <div style={{ height: "100%" }}>
            <Profesional limpiar={menuSelected.limpiar} />
          </div>
        );

      case menuOptions.PACIENTES:
        return (
          <div style={{ height: "100%" }}>
            <Paciente limpiar={menuSelected.limpiar} />
          </div>
        );

      case menuOptions.ESPECIALIDADES:
        return (
          <div style={{ height: "100%" }}>
            <Especialidad limpiar={menuSelected.limpiar} />
          </div>
        );
      case menuOptions.HISTORIA_CLINICA:
        return (
          <div style={{ height: "100%" }}>
            <HistoriaClinica limpiar={menuSelected.limpiar} />
          </div>
        );
      case menuOptions.USUARIOS:
        return (
          <div style={{ height: "100%" }}>
            <Usuarios />
          </div>
        );

      case menuOptions.PERFIL:
        return (
          <div style={{ height: "100%" }}>
            <Perfil />
          </div>
        );
      case menuOptions.FUNCIONES_PERFIL:
        return (
          <div style={{ height: "100%" }}>
            <FuncionPerfil />
          </div>
        );

      default:
        return <></>;
    }
  };

  return (
    <div>{localStorage.getItem("token") !== null ? switchMenu() : ""}</div>
  );
}
