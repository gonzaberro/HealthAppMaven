import React from "react";
import Grid from "@material-ui/core/Grid";
import ItemsAgendaHeader from "./ItemsAgendaHeader";
import ItemsAgenda from "./ItemsAgenda";
export default function ItemsAgendaContainer() {
  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={12} md={12} style={{ minHeight: "5%" }}>
        <ItemsAgendaHeader />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        style={{ overflowY: "auto", maxHeight: "84vh" }}
      >
        <ItemsAgenda />
      </Grid>
    </Grid>
  );
}
