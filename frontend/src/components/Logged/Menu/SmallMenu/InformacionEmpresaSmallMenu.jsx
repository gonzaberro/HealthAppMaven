import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { menuOptions } from "Utils/constants";
import Grid from "@material-ui/core/Grid";
import { gotoMenu } from "../MenuFunctions";

export default function InformacionEmpresaSmallMenu(props) {
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
          onClick={() => gotoMenu(menuOptions.COSTO_SERVICIO, dispatch)}
          className={
            menuSelected === menuOptions.COSTO_SERVICIO
              ? classes.selectedSubMenu
              : classes.textSubMenu
          }
        >
          {menuOptions.COSTO_SERVICIO}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid
          item
          xs={9}
          onClick={() => gotoMenu(menuOptions.ESPECIALIDADES, dispatch)}
          className={
            menuSelected === menuOptions.ESPECIALIDADES
              ? classes.selectedSubMenu
              : classes.textSubMenu
          }
        >
          {menuOptions.ESPECIALIDADES}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>

        <Grid
          item
          xs={9}
          onClick={() => gotoMenu(menuOptions.OBRAS_SOCIALES, dispatch)}
          className={
            menuSelected === menuOptions.OBRAS_SOCIALES
              ? classes.selectedSubMenu
              : classes.textSubMenu
          }
        >
          {menuOptions.OBRAS_SOCIALES}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>

        <Grid
          item
          xs={9}
          onClick={() => gotoMenu(menuOptions.PERFIL, dispatch)}
          className={
            menuSelected === menuOptions.PERFIL
              ? classes.selectedSubMenu
              : classes.textSubMenu
          }
        >
          {menuOptions.PERFIL}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>

        <Grid
          item
          xs={9}
          onClick={() => gotoMenu(menuOptions.PLAN, dispatch)}
          className={
            menuSelected === menuOptions.PLAN
              ? classes.selectedSubMenu
              : classes.textSubMenu
          }
        >
          {menuOptions.PLAN}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>

        <Grid
          item
          xs={9}
          onClick={() => gotoMenu(menuOptions.PRESTADORA, dispatch)}
          className={
            menuSelected === menuOptions.PRESTADORA
              ? classes.selectedSubMenu
              : classes.textSubMenu
          }
        >
          {menuOptions.PRESTADORA}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>

        <Grid
          item
          xs={9}
          onClick={() => gotoMenu(menuOptions.SERVICIOS, dispatch)}
          className={
            menuSelected === menuOptions.SERVICIOS
              ? classes.selectedSubMenu
              : classes.textSubMenu
          }
        >
          {menuOptions.SERVICIOS}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>

        <Grid
          item
          xs={9}
          onClick={() => gotoMenu(menuOptions.TIPO_SERVICIO, dispatch)}
          className={
            menuSelected === menuOptions.TIPO_SERVICIO
              ? classes.selectedSubMenu
              : classes.textSubMenu
          }
        >
          {menuOptions.TIPO_SERVICIO}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}></Grid>

        <Grid
          item
          xs={9}
          onClick={() => gotoMenu(menuOptions.USUARIOS, dispatch)}
          className={
            menuSelected === menuOptions.USUARIOS
              ? classes.selectedSubMenu
              : classes.textSubMenu
          }
        >
          {menuOptions.USUARIOS}
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
