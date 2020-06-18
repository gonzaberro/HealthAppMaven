import React from "react";
import Grid from "@material-ui/core/Grid";
import AgendaSemanalContainer from "./AgendaSemanalContainer";
export default function AgendaSemanal() {
  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={12} md={12} style={{ height: "100%" }}>
        <AgendaSemanalContainer />
      </Grid>
    </Grid>
  );
}
