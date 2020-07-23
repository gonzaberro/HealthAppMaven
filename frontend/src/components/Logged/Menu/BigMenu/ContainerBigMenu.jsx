import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileMedical,
  faSearch,
  faUserMd,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { menuOptions } from "Utils/constants";
import InformacionEmpresaMenu from "./InformacionEmpresaMenu";
import AgendaMenu from "./AgendaMenu";
import {
  gotoMenu,
  agendaSeleccionada,
  informacionEmpresaSeleccionada,
  closeSession,
} from "../MenuFunctions";

export default function ContainerBigMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openAgenda, setOpenAgenda] = useState(false);
  const [openInformacionEmpresa, setOpenInformacionEmpresa] = useState(false);
  const menuSelected = useSelector((state) => state.globalReducer.menuSelected);

  useEffect(() => {
    setOpenAgenda(false);
    setOpenInformacionEmpresa(false);
  }, [menuSelected]);

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
          onClick={() => gotoMenu(menuOptions.BUSCAR_TURNO, dispatch)}
        >
          <Grid container>
            <Grid item xs={12}>
              <FontAwesomeIcon icon={faSearch} style={{ width: "100%" }} />
            </Grid>

            <Grid item xs={12} className={classes.textMenu}>
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
            <Grid item xs={12}>
              <FontAwesomeIcon icon={faUserMd} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={12} className={classes.textMenu}>
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
            <Grid item xs={12}>
              <FontAwesomeIcon icon={faUser} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={12} className={classes.textMenu}>
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
            <Grid item xs={12}>
              <FontAwesomeIcon icon={faFileMedical} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={12} className={classes.textMenu}>
              {menuOptions.HISTORIA_CLINICA}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          onMouseLeave={() => setOpenInformacionEmpresa(false)}
          onMouseOver={() => setOpenInformacionEmpresa(true)}
          className={[
            classes.gridItemMenu,
            informacionEmpresaSeleccionada(menuSelected)
              ? classes.gridSelected
              : "",
          ]}
        >
          <InformacionEmpresaMenu
            open={openInformacionEmpresa}
            classes={classes}
          />
        </Grid>
        <Grid
          item
          xs={12}
          className={classes.gridItemMenu}
          onClick={() => closeSession(dispatch)}
        >
          <Grid container>
            <Grid item xs={12}>
              <FontAwesomeIcon icon={faSignOutAlt} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={12} className={classes.textMenu}>
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
