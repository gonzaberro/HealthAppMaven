import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getListaProfesionales } from "actions/ProfesionalActions";
import { getListaPacientes } from "actions/PacienteActions";
import { cleanTurnos } from "actions/BuscarTurnosActions";
import BuscarTurnoTabla from "./BuscarTurnoTabla";
import ListaTurnos from "./ListaTurnos";
import HeaderListaTurnos from "./HeaderListaTurnos";
import { useDispatch } from "react-redux";
import { getEstadosTurno } from "actions/EstadosTurnoActions";

export default function BuscarTurno() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleanTurnos());
    dispatch(getListaProfesionales());
    dispatch(getEstadosTurno());
    dispatch(getListaPacientes());
  }, [dispatch]);

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={12} md={5} className={classes.gridContainer}>
        <BuscarTurnoTabla />
      </Grid>
      <Grid item xs={12} md={7} style={{ height: "100%" }}>
        <HeaderListaTurnos />
        <ListaTurnos />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    border: "1px solid #ccc",
    borderBottom: "none",
    paddingTop: 0,
    height: "94vh",
    maxHeight: "94vh",
    overflowY: "auto",
  },
}));
