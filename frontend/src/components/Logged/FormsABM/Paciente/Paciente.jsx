import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getListaPacientes } from "actions/PacienteActions";
import { getListaPlanes } from "actions/PlanActions";
import PacienteTable from "./PacienteTable";
import PacienteForm from "./PacienteForm";
import { useDispatch } from "react-redux";

export default function Paciente() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListaPacientes());
    dispatch(getListaPlanes());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={8} lg={8} className={classes.lista}>
        <PacienteTable />
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4} className={classes.borderForm}>
        <PacienteForm />
      </Grid>
    </Grid>
  );
}
const useStyles = makeStyles(() => ({
  borderForm: {
    height: "100%",
  },
  lista: {
    maxHeight: "100vh",
    overflowY: "auto",
    borderRight: "1px solid #e4e4e4",
  },
}));
