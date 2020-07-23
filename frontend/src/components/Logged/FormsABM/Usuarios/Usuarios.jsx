import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import UsuariosForm from "./UsuariosForm";
import TablaUsuarios from "./UsuariosTable";
import { useDispatch } from "react-redux";
import { getListaUsuarios } from "actions/UsuariosActions";

export default function Usuarios() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListaUsuarios());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={8} className={classes.lista}>
        <TablaUsuarios />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} className={classes.borderForm}>
        <UsuariosForm />
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
