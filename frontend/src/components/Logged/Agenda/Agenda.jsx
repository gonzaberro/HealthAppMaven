import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import EditAgendaItem from "./EditAgendaItem";
import { getListaProfesionales } from "actions/ProfesionalActions";
import { getListaPacientes } from "actions/PacienteActions";
import { getListaServicios } from "actions/ServicioActions";
import { getListaTipoServicios } from "actions/TipoServicioActions";
import { setHorariosAgenda } from "actions/AgendaActions";
import { setDefault, setDoctor } from "actions/EditTurnoActions";
import ItemAgendaContainer from "./ItemsAgendaContainer";
import { getEstadosTurno } from "actions/EstadosTurnoActions";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

export default function Agenda(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const profesional_seleccionado = useSelector(
    (state) => state.agenda_reducer.profesional_seleccionado
  );
  useEffect(() => {
    dispatch(setHorariosAgenda());
    if (profesional_seleccionado === "") dispatch(getListaProfesionales());
    dispatch(getListaPacientes());
    dispatch(getListaServicios());
    dispatch(getListaTipoServicios());
    dispatch(getEstadosTurno());
    dispatch(setDoctor(profesional_seleccionado));
  }, [dispatch, profesional_seleccionado]);

  useEffect(() => {
    if (props.limpiar) dispatch(setDefault());
  }, [dispatch, props.limpiar]);

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
  gridContainer: {
    border: "1px solid #ccc",
    padding: 30,
    paddingTop: 0,
    height: "100%",
  },
}));
