import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import LeftSideLogin from "./LeftSideLogin";

export default function Login() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <LeftSideLogin />
      </Grid>
      <Grid item xs={12} sm={8} md={6}></Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: "url(" + require("../../imagenes/fondo.png") + ")",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20%",
  },
  colorText: {
    color: "#de3444",
  },
  colorBorder: {
    borderColor: theme.palette.secondary.main + " !important",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    paddingLeft: "20%",
    paddingRight: "20%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
