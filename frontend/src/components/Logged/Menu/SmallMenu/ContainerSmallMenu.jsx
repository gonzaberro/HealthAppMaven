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
  faSignOutAlt,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { menuOptions } from "Utils/constants";
import AgendaSmallMenu from "./AgendaSmallMenu";
import InformacionEmpresaSmallMenu from "./InformacionEmpresaSmallMenu";
import {
  gotoMenu,
  agendaSeleccionada,
  informacionEmpresaSeleccionada,
  closeSession,
} from "../MenuFunctions";

export default function ContainerSmallMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const menuSelected = useSelector((state) => state.globalReducer.menuSelected);

  return (
    <div className={classes.mainContainer}>
      <Grid container>
        <Grid
          item
          xs={12}
          className={[
            classes.gridItemMenu,
            agendaSeleccionada(menuSelected) ? classes.gridSelected : "",
          ]}
          onClick={() => gotoMenu(menuOptions.AGENDA, dispatch)}
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
        {agendaSeleccionada(menuSelected) ? (
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
          onClick={() => gotoMenu(menuOptions.BUSCAR_TURNO, dispatch)}
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
          onClick={() => gotoMenu(menuOptions.PROFESIONALES, dispatch)}
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
          onClick={() => gotoMenu(menuOptions.PACIENTES, dispatch)}
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
          onClick={() => gotoMenu(menuOptions.HISTORIA_CLINICA, dispatch)}
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
            informacionEmpresaSeleccionada(menuSelected)
              ? classes.gridSelected
              : "",
          ]}
          onClick={() => gotoMenu(menuOptions.INFORMACION_EMPRESA, dispatch)}
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
        {informacionEmpresaSeleccionada(menuSelected) ? (
          <Grid item xs={12} style={{ padding: 10 }}>
            <InformacionEmpresaSmallMenu />
          </Grid>
        ) : null}
        <Grid
          item
          xs={12}
          className={[
            classes.gridItemMenu,
            menuOptions.HISTORIA_CLINICA === menuSelected
              ? classes.gridSelected
              : "",
          ]}
          onClick={() => closeSession(dispatch)}
        >
          <Grid container>
            <Grid item xs={3}>
              <FontAwesomeIcon icon={faFileAlt} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={9} className={classes.textMenu}>
              {menuOptions.REPORTES}
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
          onClick={() => closeSession(dispatch)}
        >
          <Grid container>
            <Grid item xs={3}>
              <FontAwesomeIcon icon={faSignOutAlt} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={9} className={classes.textMenu}>
              {menuOptions.CERRAR_SESION}
            </Grid>
          </Grid>
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
