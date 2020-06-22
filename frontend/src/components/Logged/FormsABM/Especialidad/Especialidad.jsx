import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import EspecialidadForm from "./EspecialidadForm";
import { makeStyles } from "@material-ui/core/styles";
import { getListaEspecialidad } from "actions/EspecialidadActions";
import EspecialidadTable from "./EspecialidadTable";
import { useDispatch } from "react-redux";
export default function ObraSocial() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListaEspecialidad());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.lista}>
        <EspecialidadTable />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} className={classes.borderForm}>
        <EspecialidadForm />
      </Grid>
    </Grid>
  );
}
const useStyles = makeStyles((theme) => ({
  borderForm: {
    height: "100%",
  },
  lista: {
    maxHeight: "100vh",
    overflowY: "auto",
    borderRight: "1px solid #e4e4e4",
  },
}));
