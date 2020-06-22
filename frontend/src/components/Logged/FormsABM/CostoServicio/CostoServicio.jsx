import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CostoServicioForm from "./CostoServicioForm";
import { makeStyles } from "@material-ui/core/styles";
import { getListaPlanes } from "actions/PlanActions";
import { getListaServicios } from "actions/ServicioActions";
import { getListaTipoServicios } from "actions/TipoServicioActions";
import { getListaCostoServicios } from "actions/CostoServicioActions";
import CostoServicioTable from "./CostoServicioTable";
import { useDispatch } from "react-redux";
export default function ObraSocial() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListaPlanes());
    dispatch(getListaServicios());
    dispatch(getListaTipoServicios());
    dispatch(getListaCostoServicios());
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8} lg={8} className={classes.lista}>
        <CostoServicioTable />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} className={classes.borderForm}>
        <CostoServicioForm />
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
