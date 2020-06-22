import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getListaHistoriaClinica } from "actions/HistoriaClinicaActions";
import { getListaProfesionales } from "actions/ProfesionalActions";
import { getListaPacientes } from "actions/PacienteActions";
import HistoriaClinicaTable from "./HistoriaClinicaTable";
import HistoriaClinicaForm from "./HistoriaClinicaForm";
import { useDispatch } from "react-redux";

export default function HistoriaClinica() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListaHistoriaClinica());
    dispatch(getListaProfesionales());
    dispatch(getListaPacientes());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8} lg={9} className={classes.lista}>
        <HistoriaClinicaTable />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={3}
        style={{ width: "100%" }}
        className={classes.borderForm}
      >
        <HistoriaClinicaForm />
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
