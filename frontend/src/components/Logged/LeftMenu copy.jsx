import React, { useState } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faBook,
  faFileMedical,
  faSearch,
  faUserMd,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { SWITCH_MENU } from "actions/types";
import { menuOptions } from "Utils/constants";

export default function LeftMenu() {
  const dispatch = useDispatch();
  const menuSelected = useSelector((state) => state.globalReducer.menuSelected);
  const [expanded, setExpanded] = useState(false);
  const selectOptionMenu = (selected) => {
    setExpanded(false);
    dispatch({
      type: SWITCH_MENU,
      payload: { menu: selected, limpiar: true },
    });
  };
  return (
    <SideNav
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
      onSelect={(selected) => selectOptionMenu(selected)}
    >
      <SideNav.Toggle expanded={expanded} />
      <SideNav.Nav expanded={expanded} selected={menuSelected}>
        <NavItem expanded={expanded}>
          <NavIcon>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </NavIcon>

          <NavText>Agenda</NavText>

          <NavItem eventKey={menuOptions.Agenda_DIARIA}>
            <NavText>Agenda Diaria</NavText>
          </NavItem>
          <NavItem eventKey={menuOptions.Agenda_SEMANAL}>
            <NavText>Agenda Semanal</NavText>
          </NavItem>
          <NavItem eventKey={menuOptions.Agenda_MENSUAL}>
            <NavText>Agenda Mensual</NavText>
          </NavItem>
        </NavItem>
        <NavItem eventKey={menuOptions.BUSCAR_TURNO}>
          <NavIcon>
            <FontAwesomeIcon icon={faSearch} />
          </NavIcon>
          <NavText>Buscar Turno</NavText>
        </NavItem>
        <NavItem eventKey={menuOptions.PROFESIONALES}>
          <NavIcon>
            <FontAwesomeIcon icon={faUserMd} />
          </NavIcon>
          <NavText>Profesionales</NavText>
        </NavItem>
        <NavItem eventKey={menuOptions.PACIENTES}>
          <NavIcon>
            <FontAwesomeIcon icon={faUser} />
          </NavIcon>
          <NavText>Pacientes</NavText>
        </NavItem>
        <NavItem eventKey={menuOptions.HISTORIA_CLINICA}>
          <NavIcon>
            <FontAwesomeIcon icon={faFileMedical} />
          </NavIcon>
          <NavText>Historia Clínica</NavText>
        </NavItem>
        <NavItem eventKey={menuOptions.CHARTS}>
          <NavIcon>
            <FontAwesomeIcon icon={faBook} />
          </NavIcon>
          <NavText>Información Empresa</NavText>
          <NavItem eventKey={menuOptions.COSTO_SERVICIO}>
            <NavText>Costo Servicio</NavText>
          </NavItem>
          <NavItem eventKey={menuOptions.ESPECIALIDADES}>
            <NavText>Especialidades</NavText>
          </NavItem>
          <NavItem eventKey={menuOptions.OBRAS_SOCIALES}>
            <NavText>Obras Sociales</NavText>
          </NavItem>
          <NavItem eventKey={menuOptions.PLAN}>
            <NavText>Planes</NavText>
          </NavItem>
          <NavItem eventKey={menuOptions.PRESTADORA}>
            <NavText>Prestadoras</NavText>
          </NavItem>

          <NavItem eventKey={menuOptions.SERVICIOS}>
            <NavText>Servicios</NavText>
          </NavItem>
          <NavItem eventKey={menuOptions.TIPO_SERVICIO}>
            <NavText>Tipo Servicio</NavText>
          </NavItem>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}
