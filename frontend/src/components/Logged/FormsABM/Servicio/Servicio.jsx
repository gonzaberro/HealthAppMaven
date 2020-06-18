import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ServicioForm from "./ServicioForm";
import { makeStyles } from "@material-ui/core/styles";
import { getListaServicios } from "actions/ServicioActions";
import ServicioTable from "./ServicioTable";
import { useDispatch } from "react-redux";
export default function ObraSocial() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListaServicios());
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={8} lg={8} className={classes.lista}>
        <ServicioTable />
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4} className={classes.borderForm}>
        <ServicioForm />
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
