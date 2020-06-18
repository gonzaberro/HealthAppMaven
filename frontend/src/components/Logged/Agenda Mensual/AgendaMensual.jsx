import React from "react";
import Grid from "@material-ui/core/Grid";
import AgendaMensualContainer from "./AgendaMensualContainer";
export default function AgendaMensual() {
  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={12} md={12} style={{ height: "100%" }}>
        <AgendaMensualContainer />
      </Grid>
    </Grid>
  );
}
