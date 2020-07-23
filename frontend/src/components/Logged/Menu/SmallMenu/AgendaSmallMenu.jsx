import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { menuOptions } from "Utils/constants";
import Grid from "@material-ui/core/Grid";
import { gotoMenu } from "../MenuFunctions";

export default function AgendaMenu(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const menuSelected = useSelector((state) => state.globalReducer.menuSelected);

  return (
    <>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid
          item
          xs={9}
          onClick={() => gotoMenu(menuOptions.Agenda_DIARIA, dispatch)}
          className={
            menuSelected === menuOptions.Agenda_DIARIA
              ? classes.selectedSubMenu
              : classes.textSubMenu
          }
        >
          {menuOptions.Agenda_DIARIA}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>

        <Grid
          item
          xs={9}
          onClick={() => gotoMenu(menuOptions.Agenda_SEMANAL, dispatch)}
          className={
            menuSelected === menuOptions.Agenda_SEMANAL
              ? classes.selectedSubMenu
              : classes.textSubMenu
          }
        >
          {menuOptions.Agenda_SEMANAL}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>

        <Grid
          item
          xs={9}
          onClick={() => gotoMenu(menuOptions.Agenda_MENSUAL, dispatch)}
          className={
            menuSelected === menuOptions.Agenda_MENSUAL
              ? classes.selectedSubMenu
              : classes.textSubMenu
          }
        >
          {menuOptions.Agenda_MENSUAL}
        </Grid>
      </Grid>
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  textSubMenu: {
    textAlign: "left",
    fontSize: 25,
    color: "white",
    padding: 20,
  },
  selectedSubMenu: {
    borderLeft: "4px solid #333",
    textAlign: "left",
    fontSize: 25,
    color: "white",
    padding: 20,
    backgroundColor: "#bf2231",
  },
}));
