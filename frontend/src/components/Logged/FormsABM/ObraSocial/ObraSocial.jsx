import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ObraSocialForm from "./ObraSocialForm";
import { makeStyles } from "@material-ui/core/styles";
import { getListaObrasSocial } from "actions/ObraSocialActions";
import ObraSocialTable from "./ObraSocialTable";
import { useDispatch } from "react-redux";
export default function ObraSocial() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListaObrasSocial());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={8} lg={8} className={classes.listaOS}>
        <ObraSocialTable />
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4} className={classes.borderForm}>
        <ObraSocialForm />
      </Grid>
    </Grid>
  );
}
const useStyles = makeStyles((theme) => ({
  borderForm: {
    height: "100%",
  },
  listaOS: {
    maxHeight: "100vh",
    overflowY: "auto",
    borderRight: "1px solid #e4e4e4",
  },
}));
