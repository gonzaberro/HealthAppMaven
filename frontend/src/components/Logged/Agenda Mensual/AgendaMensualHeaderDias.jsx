import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Hidden } from "@material-ui/core";
export default function ItemsAgendaHeader() {
  const classes = useStyles();

  return (
    <Hidden only={["sm", "xs"]}>
      <Grid container style={{ textAlign: "center" }}>
        <Grid item md={2} className={classes.borderGridDias}>
          Lunes
        </Grid>
        <Grid item md={2} className={classes.borderGridDias}>
          Martes
        </Grid>
        <Grid item md={2} className={classes.borderGridDias}>
          Miércoles
        </Grid>
        <Grid item md={2} className={classes.borderGridDias}>
          Jueves
        </Grid>
        <Grid item md={2} className={classes.borderGridDias}>
          Viernes
        </Grid>
        <Grid item md={2} className={classes.borderGridDias}>
          Sábado
        </Grid>
      </Grid>
    </Hidden>
  );
}
const useStyles = makeStyles((theme) => ({
  borderGridDias: {
    borderBottom: "1px solid #eeeeee",
    padding: 10,
    borderLeft: "1px solid #eeeeee",

    color: "#0000008a",
    fontWeight: "bold",
    userSelect: "none",
  },
}));
