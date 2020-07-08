import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { setDefault } from "../../../actions/EditTurnoActions";
import { useDispatch } from "react-redux";

export default function EditAgendaHeader() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const nuevoTurno = () => {
    dispatch(setDefault());
  };

  return (
    <Grid className={classes.headerGrid} container>
      <Grid item lg={8} md={8} sm={12} xs={12}>
        <div className={classes.headerSpan}>Crear/Modificar Turnos</div>
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <Button
          variant="contained"
          onClick={() => nuevoTurno()}
          style={{ width: "100%", marginTop: 5 }}
        >
          Nuevo
        </Button>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  headerGrid: {
    borderBottom: "1px solid #ccc",
    paddingBottom: 17,
    minHeight: "5%",
    textAlign: "center",
    color: "#0000008a",
    fontWeight: "bold",
  },
  headerSpan: {
    paddingTop: 15,
  },
}));
