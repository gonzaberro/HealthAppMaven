import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import AgendaSemanalContainer from "./AgendaSemanalContainer";

import { getListaProfesionales } from "actions/ProfesionalActions";
import { useDispatch, useSelector } from "react-redux";
export default function AgendaSemanal() {
  const dispatch = useDispatch();
  const profesional_seleccionado = useSelector(
    (state) => state.agenda_reducer.profesional_seleccionado
  );
  useEffect(() => {
    if (profesional_seleccionado === "") dispatch(getListaProfesionales());
  }, [dispatch, profesional_seleccionado]);

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={12} md={12} style={{ height: "100%" }}>
        <AgendaSemanalContainer />
      </Grid>
    </Grid>
  );
}
