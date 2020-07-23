import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import PlanForm from "./PlanForm";
import { makeStyles } from "@material-ui/core/styles";
import { getListaPlanes } from "actions/PlanActions";
import { getListaObrasSocial } from "actions/ObraSocialActions";
import PlanTable from "./PlanTable";
import { useDispatch } from "react-redux";
export default function ObraSocial() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListaPlanes());
    dispatch(getListaObrasSocial());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={8} className={classes.lista}>
        <PlanTable />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} className={classes.borderForm}>
        <PlanForm />
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
