import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

export default function WrapperForm({ children }) {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <form id="form">
        <Grid container spacing={1}>
          {children}
        </Grid>
      </form>
    </Paper>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    padding: 15,
    marginTop: "1em",
  },
}));
