import React from "react";
import Grid from "@material-ui/core/Grid";
import EditAgendaItem from "./EditAgendaItem";
import ItemAgendaContainer from "./ItemsAgendaContainer";
import { makeStyles } from "@material-ui/core/styles";
export default function Agenda() {
  const classes = useStyles();

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={12} md={5} className={classes.gridContainer}>
        <EditAgendaItem />
      </Grid>
      <Grid item xs={12} md={7} style={{ height: "100%" }}>
        <ItemAgendaContainer />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 10,
  },
  container: {
    margin: 10,
    marginRight: 0,
    paddingRight: 0,
    width: "100%",
  },
  textField: {
    width: "100%",
  },
  spanRepetir: {
    paddingTop: 20,
  },
  checkBoxContainer: {
    margin: 10,
    color: "#0000008a",
    borderTop: "1px solid #ccc",
    width: "100%",
  },
  textArea: {
    width: "100%",
    minHeight: 100,
    maxHeight: 100,
    borderColor: "#c4c4c4",
    borderRadius: 5,
    marginTop: 5,
  },

  gridContainer: {
    border: "1px solid #ccc",
    padding: 30,
    paddingTop: 0,
    height: "100%",
  },
}));
