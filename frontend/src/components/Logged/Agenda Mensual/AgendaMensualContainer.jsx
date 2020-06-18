import React from "react";
import Grid from "@material-ui/core/Grid";
import AgendaMensualHeader from "./AgendaMensualHeader";
import AgendaMensualHeaderDias from "./AgendaMensualHeaderDias";
import AgendaMensualDias from "./AgendaMensualDias";

export default function AgendaMensualContainer() {
  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={12} md={12} style={{ minHeight: "5%" }}>
        <AgendaMensualHeader />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        style={{ overflowY: "auto", minHeight: "95%", height: "95%" }}
      >
        <AgendaMensualHeaderDias />
        <AgendaMensualDias />
      </Grid>
    </Grid>
  );
}
