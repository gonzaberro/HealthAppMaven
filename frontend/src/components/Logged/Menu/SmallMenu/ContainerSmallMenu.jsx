import React from "react";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileMedical,
  faSearch,
  faUserMd,
  faUser,
  faCalendarAlt,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { SWITCH_MENU } from "actions/types";
import { useDispatch, useSelector } from "react-redux";
import { menuOptions } from "Utils/constants";
import AgendaSmallMenu from "./AgendaSmallMenu";
import InformacionEmpresaSmallMenu from "./InformacionEmpresaSmallMenu";

const AgendaSeleccionada = (menuSelected) => {
  switch (menuSelected) {
    case menuOptions.Agenda_DIARIA:
      return true;

    case menuOptions.Agenda_MENSUAL:
      return true;

    case menuOptions.Agenda_SEMANAL:
      return true;
    case menuOptions.AGENDA:
      return true;

    default:
      return false;
  }
};
const InformacionEmpresaSeleccionada = (menuSelected) => {
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

export default function ContainerSmallMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const menuSelected = useSelector((state) => state.globalReducer.menuSelected);

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
          onClick={() => gotoMenu(menuOptions.AGENDA)}
        >
          <Grid container>
            <Grid item xs={3}>
              <FontAwesomeIcon icon={faCalendarAlt} style={{ width: "100%" }} />
            </Grid>

            <Grid item xs={9} className={classes.textMenu}>
              {menuOptions.AGENDA}
            </Grid>
          </Grid>
        </Grid>
        {AgendaSeleccionada(menuSelected) ? (
          <Grid item xs={12} style={{ padding: 10 }}>
            <AgendaSmallMenu />
          </Grid>
        ) : null}
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
            <Grid item xs={3}>
              <FontAwesomeIcon icon={faSearch} style={{ width: "100%" }} />
            </Grid>

            <Grid item xs={9} className={classes.textMenu}>
              {menuOptions.BUSCAR_TURNO}
            </Grid>
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
            <Grid item xs={3}>
              <FontAwesomeIcon icon={faUserMd} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={9} className={classes.textMenu}>
              {menuOptions.PROFESIONALES}
            </Grid>
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
            <Grid item xs={3}>
              <FontAwesomeIcon icon={faUser} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={9} className={classes.textMenu}>
              {menuOptions.PACIENTES}
            </Grid>
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
            <Grid item xs={3}>
              <FontAwesomeIcon icon={faFileMedical} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={9} className={classes.textMenu}>
              {menuOptions.HISTORIA_CLINICA}
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          className={[
            classes.gridItemMenu,
            InformacionEmpresaSeleccionada(menuSelected)
              ? classes.gridSelected
              : "",
          ]}
          onClick={() => gotoMenu(menuOptions.INFORMACION_EMPRESA)}
        >
          <Grid container>
            <Grid item xs={3}>
              <FontAwesomeIcon icon={faBook} style={{ width: "100%" }} />
            </Grid>

            <Grid item xs={9} className={classes.textMenu}>
              {menuOptions.INFORMACION_EMPRESA}
            </Grid>
          </Grid>
        </Grid>
        {InformacionEmpresaSeleccionada(menuSelected) ? (
          <Grid item xs={12} style={{ padding: 10 }}>
            <InformacionEmpresaSmallMenu />
          </Grid>
        ) : null}
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
    fontSize: 35,
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
    textAlign: "left",
    fontSize: 35,
  },

  mainContainer: {
    border: "2px solid #de3444",
    minHeight: "100vh",

    backgroundColor: "#de3444",
  },
}));
