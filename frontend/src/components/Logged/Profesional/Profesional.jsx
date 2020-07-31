import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getListaProfesionales } from "actions/ProfesionalActions";
import { getListaEspecialidad } from "actions/EspecialidadActions";
import ProfesionalTable from "./ProfesionalTable";
import ProfesionalForm from "./ProfesionalForm";
import { useDispatch } from "react-redux";

export default function Profesional() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListaProfesionales());
    dispatch(getListaEspecialidad());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={9} className={classes.lista}>
        <ProfesionalTable />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={3}
        style={{ width: "100%" }}
        className={classes.borderForm}
      >
        <ProfesionalForm />
      </Grid>
    </Grid>
  );
}
const useStyles = makeStyles(() => ({
  borderForm: {
    height: "100%",
  },
  lista: {
    maxHeight: "95vh",
    overflowY: "auto",
    borderRight: "1px solid #e4e4e4",
  },
}));
