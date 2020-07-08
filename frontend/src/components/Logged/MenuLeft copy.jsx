import React from "react";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faBook,
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
export default function MenuLeft() {
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
    <div
      style={{
        border: "2px solid #de3444",
        minHeight: "100vh",
        borderRadius: 5,
        backgroundColor: "#de3444",
      }}
    >
      <Grid container>
        <Grid item xs={12} className={classes.gridItemMenu}>
          <Grid container>
            <Grid item xs={12}>
              <FontAwesomeIcon icon={faCalendarAlt} style={{ width: "100%" }} />
            </Grid>
            <MediaQuery minDeviceWidth={1300}>
              <Grid item xs={12} className={classes.textMenu}>
                Agenda
              </Grid>
            </MediaQuery>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          className={classes.gridItemMenu}
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
          className={classes.gridItemMenu}
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
          className={classes.gridItemMenu}
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
          className={classes.gridItemMenu}
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
        <Grid item xs={12} className={classes.gridItemMenu}>
          <Grid container>
            <Grid item xs={12}>
              <FontAwesomeIcon icon={faBook} style={{ width: "100%" }} />
            </Grid>
            <MediaQuery minDeviceWidth={1300}>
              <Grid item xs={12} className={classes.textMenu}>
                Información
              </Grid>
            </MediaQuery>
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

    borderRadius: 5,
    "&:Hover": {
      backgroundColor: "#333",
      cursor: "pointer",
      color: "#fff",
    },
  },
  textMenu: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 11,
  },
}));
