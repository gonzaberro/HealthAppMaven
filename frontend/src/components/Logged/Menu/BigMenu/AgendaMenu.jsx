import React from "react";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core/styles";
import { SWITCH_MENU } from "actions/types";
import { useDispatch, useSelector } from "react-redux";
import { menuOptions } from "Utils/constants";
import MediaQuery from "react-responsive";
import Grid from "@material-ui/core/Grid";
export default function AgendaMenu(props) {
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
    <div container style={{ zIndex: 10000 }}>
      <Grid container>
        <Grid item xs={12}>
          <FontAwesomeIcon icon={faCalendarAlt} style={{ width: "100%" }} />
        </Grid>
        <MediaQuery minDeviceWidth={1300}>
          <Grid item xs={12} className={props.classes.textMenu}>
            {menuOptions.AGENDA}
          </Grid>
        </MediaQuery>
      </Grid>

      {props.open ? (
        <div className={classes.subMenuContainer}>
          <Grid container style={{ width: "auto", display: "block" }}>
            <Grid
              item
              xs={12}
              className={[
                classes.subMenuOptions,
                menuOptions.Agenda_DIARIA === menuSelected
                  ? classes.subMenuSelected
                  : "",
              ]}
              onClick={() => gotoMenu(menuOptions.Agenda_DIARIA)}
            >
              {menuOptions.Agenda_DIARIA}
            </Grid>
            <Grid
              item
              xs={12}
              className={[
                classes.subMenuOptions,
                menuOptions.Agenda_SEMANAL === menuSelected
                  ? classes.subMenuSelected
                  : "",
              ]}
              onClick={() => gotoMenu(menuOptions.Agenda_SEMANAL)}
            >
              {menuOptions.Agenda_SEMANAL}
            </Grid>
            <Grid
              item
              xs={12}
              className={[
                classes.subMenuOptions,
                menuOptions.Agenda_MENSUAL === menuSelected
                  ? classes.subMenuSelected
                  : "",
              ]}
              onClick={() => gotoMenu(menuOptions.Agenda_MENSUAL)}
            >
              {menuOptions.Agenda_MENSUAL}
            </Grid>
          </Grid>
        </div>
      ) : (
        ""
      )}
    </div>
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
    top: "2vh",
    border: "1px solid #ccc",
    borderRadius: 5,
  },
}));
