import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileMedical,
  faSearch,
  faUserMd,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import MediaQuery from "react-responsive";
import { SWITCH_MENU } from "actions/types";
import { useDispatch, useSelector } from "react-redux";
import { menuOptions } from "Utils/constants";
import InformacionEmpresaMenu from "./InformacionEmpresaMenu";
import AgendaMenu from "./AgendaMenu";

const AgendaSeleccionada = (menuSelected) => {
  switch (menuSelected) {
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
const InformacionEmpresaSeleccionada = (menuSelected) => {
  switch (menuSelected) {
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

export default function MenuLeft() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openAgenda, setOpenAgenda] = useState(false);
  const [openInformacionEmpresa, setOpenInformacionEmpresa] = useState(false);
  const menuSelected = useSelector((state) => state.globalReducer.menuSelected);

  useEffect(() => {
    setOpenAgenda(false);
    setOpenInformacionEmpresa(false);
  }, [menuSelected]);

  const gotoMenu = (selected) => {
    dispatch({
      type: SWITCH_MENU,
      payload: { menu: selected, limpiar: true },
    });
  };

  return (
    <div className={classes.mainContainer}>
      <Grid container>
        <Grid
          item
          xs={12}
          className={[
            classes.gridItemMenu,
            AgendaSeleccionada(menuSelected) ? classes.gridSelected : "",
          ]}
          onMouseLeave={() => setOpenAgenda(false)}
          onMouseOver={() => setOpenAgenda(true)}
        >
          <AgendaMenu open={openAgenda} classes={classes} />
        </Grid>
        <Grid
          item
          xs={12}
          className={[
            classes.gridItemMenu,
            menuOptions.BUSCAR_TURNO === menuSelected
              ? classes.gridSelected
              : "",
          ]}
          onClick={() => gotoMenu(menuOptions.BUSCAR_TURNO)}
        >
          <Grid container>
            <Grid item xs={12}>
              <FontAwesomeIcon icon={faSearch} style={{ width: "100%" }} />
            </Grid>
            <MediaQuery minDeviceWidth={1300}>
              <Grid item xs={12} className={classes.textMenu}>
                Turnos
              </Grid>
            </MediaQuery>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          className={[
            classes.gridItemMenu,
            menuOptions.PROFESIONALES === menuSelected
              ? classes.gridSelected
              : "",
          ]}
          onClick={() => gotoMenu(menuOptions.PROFESIONALES)}
        >
          <Grid container>
            <Grid item xs={12}>
              <FontAwesomeIcon icon={faUserMd} style={{ width: "100%" }} />
            </Grid>
            <MediaQuery minDeviceWidth={1300}>
              <Grid item xs={12} className={classes.textMenu}>
                Profesionales
              </Grid>
            </MediaQuery>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          className={[
            classes.gridItemMenu,
            menuOptions.PACIENTES === menuSelected ? classes.gridSelected : "",
          ]}
          onClick={() => gotoMenu(menuOptions.PACIENTES)}
        >
          <Grid container>
            <Grid item xs={12}>
              <FontAwesomeIcon icon={faUser} style={{ width: "100%" }} />
            </Grid>
            <MediaQuery minDeviceWidth={1300}>
              <Grid item xs={12} className={classes.textMenu}>
                Pacientes
              </Grid>
            </MediaQuery>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          className={[
            classes.gridItemMenu,
            menuOptions.HISTORIA_CLINICA === menuSelected
              ? classes.gridSelected
              : "",
          ]}
          onClick={() => gotoMenu(menuOptions.HISTORIA_CLINICA)}
        >
          <Grid container>
            <Grid item xs={12}>
              <FontAwesomeIcon icon={faFileMedical} style={{ width: "100%" }} />
            </Grid>
            <MediaQuery minDeviceWidth={1300}>
              <Grid item xs={12} className={classes.textMenu}>
                Historia Clínica
              </Grid>
            </MediaQuery>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          onMouseLeave={() => setOpenInformacionEmpresa(false)}
          onMouseOver={() => setOpenInformacionEmpresa(true)}
          className={[
            classes.gridItemMenu,
            InformacionEmpresaSeleccionada(menuSelected)
              ? classes.gridSelected
              : "",
          ]}
        >
          <InformacionEmpresaMenu
            open={openInformacionEmpresa}
            classes={classes}
          />
        </Grid>
      </Grid>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  gridItemMenu: {
    height: "8vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",

    "&:Hover": {
      fontWeight: "bold",
      backgroundColor: "#bf2231",
      cursor: "pointer",
      color: "#fff",
    },
  },
  gridSelected: {
    fontWeight: "bold",
    borderLeft: "3px solid #333",
    backgroundColor: "#bf2231",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    cursor: "pointer",
    color: "#fff",
  },
  textMenu: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 10,
  },
  mainContainer: {
    border: "2px solid #de3444",
    minHeight: "100vh",

    backgroundColor: "#de3444",
  },
}));
