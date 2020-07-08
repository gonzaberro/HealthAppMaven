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
  const [clickedMenu, setClickedMenu] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const clickOnMenu = (menu) => {
    if (clickedMenu === menu) {
      setExpanded(expanded ? false : true);
    } else {
      setExpanded(true);
    }
    setClickedMenu(menu);
  };

  return (
    <SideNav
      onMouseLeave={() => setExpanded(false)}
      onSelect={(selected) => {
        dispatch({
          type: SWITCH_MENU,
          payload: { menu: selected, limpiar: true },
        });
        setExpanded(false);
      }}
      expanded={false}
    >
      <SideNav.Nav selected={menuSelected}>
        <NavItem
          eventKey={menuSelected}
          navitemStyle={{ backgroundColor: "#db3d44" }}
        ></NavItem>
        <NavItem
          onMouseOver={() => clickOnMenu(1)}
          navitemStyle={{ cursor: "pointer" }}
          subnavStyle={
            clickedMenu === 1 && expanded
              ? { display: "block" }
              : { display: "none" }
          }
          eventKey={menuOptions.AGENDA}
          title="Agenda"
        >
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
        <NavItem eventKey={menuOptions.BUSCAR_TURNO} title="Buscar Turno">
          <NavIcon eventKey={menuOptions.BUSCAR_TURNO}>
            <FontAwesomeIcon icon={faSearch} />
          </NavIcon>
          <NavText>Buscar Turno</NavText>
        </NavItem>
        <NavItem eventKey={menuOptions.PROFESIONALES} title="Profesionales">
          <NavIcon eventKey={menuOptions.PROFESIONALES}>
            <FontAwesomeIcon icon={faUserMd} />
          </NavIcon>
          <NavText>Profesionales</NavText>
        </NavItem>
        <NavItem eventKey={menuOptions.PACIENTES} title="Pacientes">
          <NavIcon eventKey={menuOptions.PACIENTES}>
            <FontAwesomeIcon icon={faUser} />
          </NavIcon>
          <NavText>Pacientes</NavText>
        </NavItem>
        <NavItem
          eventKey={menuOptions.HISTORIA_CLINICA}
          title="Historia Clínica"
        >
          <NavIcon eventKey={menuOptions.HISTORIA_CLINICA}>
            <FontAwesomeIcon icon={faFileMedical} />
          </NavIcon>
          <NavText>Historia Clínica</NavText>
        </NavItem>
        <NavItem
          onMouseOver={() => clickOnMenu(2)}
          navitemStyle={{ cursor: "pointer" }}
          subnavStyle={
            clickedMenu === 2 && expanded
              ? { display: "block" }
              : { display: "none" }
          }
          title="Información Empresa"
        >
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
