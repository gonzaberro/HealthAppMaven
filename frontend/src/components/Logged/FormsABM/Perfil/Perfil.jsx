import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import PerfilForm from "./PerfilForm";
import { makeStyles } from "@material-ui/core/styles";
import { getListaPerfil } from "actions/PerfilActions";
import PerfilTable from "./PerfilTable";
import { useDispatch } from "react-redux";
export default function ObraSocial() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListaPerfil());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={8} className={classes.lista}>
        <PerfilTable />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} className={classes.borderForm}>
        <PerfilForm />
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
