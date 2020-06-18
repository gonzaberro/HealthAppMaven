import React from "react";
import Grid from "@material-ui/core/Grid";
import AgendaSemanalHeader from "./AgendaSemanalHeader";
import AgendaMensualHeaderDias from "../Agenda Mensual/AgendaMensualHeaderDias";
import AgendaSemanalDias from "./AgendaSemanalDias";

export default function AgendaMensualContainer() {
  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={12} md={12} style={{ minHeight: "5%" }}>
        <AgendaSemanalHeader />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        style={{ overflowY: "auto", minHeight: "95%", height: "95%" }}
      >
        <AgendaMensualHeaderDias />
        <AgendaSemanalDias />
      </Grid>
    </Grid>
  );
}
