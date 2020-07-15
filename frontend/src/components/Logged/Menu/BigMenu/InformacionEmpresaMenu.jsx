import React from "react";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core/styles";
import { SWITCH_MENU } from "actions/types";
import { useDispatch, useSelector } from "react-redux";
import { menuOptions } from "Utils/constants";
import MediaQuery from "react-responsive";
import Grid from "@material-ui/core/Grid";
export default function InformacionEmpresaMenu(props) {
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
    <Grid container style={{ zIndex: 10000 }}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <FontAwesomeIcon icon={faBook} style={{ width: "100%" }} />
          </Grid>
          <MediaQuery minDeviceWidth={1300}>
            <Grid item xs={12} className={props.classes.textMenu}>
              Información
            </Grid>
          </MediaQuery>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {props.open ? (
          <div className={classes.subMenuContainer}>
            <Grid container style={{ width: "auto", display: "block" }}>
              <Grid
                item
                xs={12}
                className={[
                  classes.subMenuOptions,
                  menuOptions.COSTO_SERVICIO === menuSelected
                    ? classes.subMenuSelected
                    : "",
                ]}
                onClick={() => gotoMenu(menuOptions.COSTO_SERVICIO)}
              >
                {menuOptions.COSTO_SERVICIO}
              </Grid>
              <Grid
                item
                xs={12}
                className={[
                  classes.subMenuOptions,
                  menuOptions.ESPECIALIDADES === menuSelected
                    ? classes.subMenuSelected
                    : "",
                ]}
                onClick={() => gotoMenu(menuOptions.ESPECIALIDADES)}
              >
                {menuOptions.ESPECIALIDADES}
              </Grid>
              <Grid
                item
                xs={12}
                className={[
                  classes.subMenuOptions,
                  menuOptions.OBRAS_SOCIALES === menuSelected
                    ? classes.subMenuSelected
                    : "",
                ]}
                onClick={() => gotoMenu(menuOptions.OBRAS_SOCIALES)}
              >
                {menuOptions.OBRAS_SOCIALES}
              </Grid>
              <Grid
                item
                xs={12}
                className={[
                  classes.subMenuOptions,
                  menuOptions.PLAN === menuSelected
                    ? classes.subMenuSelected
                    : "",
                ]}
                onClick={() => gotoMenu(menuOptions.PLAN)}
              >
                {menuOptions.PLAN}
              </Grid>
              <Grid
                item
                xs={12}
                className={[
                  classes.subMenuOptions,
                  menuOptions.PRESTADORA === menuSelected
                    ? classes.subMenuSelected
                    : "",
                ]}
                onClick={() => gotoMenu(menuOptions.PRESTADORA)}
              >
                {menuOptions.PRESTADORA}
              </Grid>
              <Grid
                item
                xs={12}
                className={[
                  classes.subMenuOptions,
                  menuOptions.SERVICIOS === menuSelected
                    ? classes.subMenuSelected
                    : "",
                ]}
                onClick={() => gotoMenu(menuOptions.SERVICIOS)}
              >
                {menuOptions.SERVICIOS}
              </Grid>
              <Grid
                item
                xs={12}
                className={[
                  classes.subMenuOptions,
                  menuOptions.TIPO_SERVICIO === menuSelected
                    ? classes.subMenuSelected
                    : "",
                ]}
                onClick={() => gotoMenu(menuOptions.TIPO_SERVICIO)}
              >
                {menuOptions.TIPO_SERVICIO}
              </Grid>
            </Grid>
          </div>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
}
const useStyles = makeStyles((theme) => ({
  subMenuOptions: {
    padding: 10,
    color: "#333",
    fontSize: 12,
    fontWeight: "normal",
    "&:hover": {
      fontWeight: "bold",
      borderBottom: "2px solid #de3444",
    },
  },
  subMenuSelected: {
    fontWeight: "bold",
    borderLeft: "4px solid #de3444",
  },
  subMenuContainer: {
    borderTopLeftRadius: 0,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
    position: "absolute",
    left: "5vw",
    top: "42vh",
    border: "1px solid #ccc",
    borderRadius: 5,
  },
}));
