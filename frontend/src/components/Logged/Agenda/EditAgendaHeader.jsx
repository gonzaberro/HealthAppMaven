import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
export default function EditAgendaHeader() {
  const classes = useStyles();

  return (
    <Grid className={classes.headerGrid}>
      <div className={classes.headerSpan}>Crear/Modificar Turnos</div>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  headerGrid: {
    borderBottom: "1px solid #ccc",
    height: "5vh",
    textAlign: "center",
    color: "#0000008a",
    fontWeight: "bold",
  },
  headerSpan: {
    paddingTop: 15,
  },
}));
