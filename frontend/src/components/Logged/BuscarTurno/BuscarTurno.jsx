import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getListaProfesionales } from "actions/ProfesionalActions";
import { getListaPacientes } from "actions/PacienteActions";
import { buscarTurnosProfesinal } from "actions/BuscarTurnosActions";
import BuscarTurnoTabla from "./BuscarTurnoTabla";
import ListaTurnos from "./ListaTurnos";
import { useDispatch } from "react-redux";
export default function BuscarTurno() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListaProfesionales());
    dispatch(getListaPacientes());
    dispatch(buscarTurnosProfesinal(0, 1));
  }, [dispatch]);

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={12} md={5} className={classes.gridContainer}>
        <BuscarTurnoTabla />
      </Grid>
      <Grid item xs={12} md={7} style={{ height: "100%" }}>
        <ListaTurnos />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    border: "1px solid #ccc",

    paddingTop: 0,
    height: "100vh",
    maxHeight: "100vh",
    overflowY: "auto",
  },
}));
