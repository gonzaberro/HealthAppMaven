import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setDiaMesSeleccionado } from "actions/AgendaActions";
import { useSelector, useDispatch } from "react-redux";
import { menuOptions } from "Utils/constants";
import { SWITCH_MENU } from "actions/types";
import TurnosDiaAgendaSemanal from "./TurnosDiaAgendaSemanal";
import { getTurnosSemana } from "actions/VistaMensualYSemanalActions";
import { fechaString } from "Utils/functions";

export default function AgendaSemanalDias() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const fechaCalendario = useSelector(
    (state) => state.agenda_reducer.fecha_agenda
  );
  const profesional_seleccionado = useSelector(
    (state) => state.agenda_reducer.profesional_seleccionado
  );
  useEffect(() => {
    if (profesional_seleccionado > 0) {
      dispatch(
        getTurnosSemana(fechaString(fechaCalendario), profesional_seleccionado)
      );
    }
  }, [fechaCalendario, profesional_seleccionado, dispatch]);

  const gotoDiaCalendario = (fecha_seleccionada) => {
    const ye = new Intl.DateTimeFormat("es", { year: "numeric" }).format(
      fecha_seleccionada
    ); //Anio en formato YYYY de la fecha que seleccione
    const mo = new Intl.DateTimeFormat("es", { month: "2-digit" }).format(
      fecha_seleccionada
    ); //MES en formato MM de la fecha que seleccione

    dispatch(
      setDiaMesSeleccionado(new Date(ye, mo - 1, fecha_seleccionada.getDate()))
    ); //Seteo la fecha del calendario con la fecha que seleccione
    dispatch({
      type: SWITCH_MENU,
      payload: { menu: menuOptions.Agenda_DIARIA, limpiar: true },
    }); //Voy a ver la visual del calendario por DIA*/
  };
  const getMonday = () => {
    let dia = fechaCalendario;
    var day = dia.getDay(),
      diff = dia.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday

    return new Date(dia.setDate(diff));
  };
  const renderDiasCalendario = () => {
    let fecha_semana = getMonday(); //Obtengo la fecha del lunes anterior

    let dias_calendario = []; //RETURN DEL CALENDARIO

    for (let dias = 1; dias <= 6; dias++) {
      if (
        fecha_semana.getDay() > 0 //Me aseguro que el dia no sea domingo
      ) {
        let badge_fecha = new Date(fecha_semana); //Lo necesito para poder saber el dia cuando hago click sobre la fecha
        dias_calendario.push(
          <Grid
            item
            key={"grid_" + dias}
            md={2}
            xs={12}
            className={classes.gridDias}
            onClick={() => gotoDiaCalendario(badge_fecha)}
          >
            <Grid container key={"badge_container_" + dias}>
              <Grid item md={1} xs={1} key={"grid_nro_dia_" + dias}>
                <Badge
                  color="primary"
                  key={"badge_nro_dia_" + dias}
                  badgeContent={badge_fecha.getDate()}
                  showZero
                ></Badge>
              </Grid>
              <Grid
                item
                md={11}
                xs={11}
                key={"grid_nro_turnos_" + dias}
                style={{ marginTop: 5 }}
                className={classes.gridTurnosDia}
              >
                <TurnosDiaAgendaSemanal
                  key={"turnos_dia_semanal_" + dias}
                  dia_mes={badge_fecha.getDate()}
                />
              </Grid>
            </Grid>
          </Grid>
        );
      }
      fecha_semana.setDate(fecha_semana.getDate() + 1);
    }

    return dias_calendario;
  };

  return (
    <div style={{ height: "100%" }}>
      <Grid container>{renderDiasCalendario()}</Grid>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  gridDias: {
    border: "1px solid #eeeeee",
    padding: 10,
    paddingLeft: 15,
    borderLeft: "1px solid #eeeeee",
    minHeight: "85vh",
    "&:hover": {
      border: "1px solid #2c41b5",
      // backgroundColor: "#eeeeee",
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  },
  gridTurnosDia: {
    maxHeight: "85vh",
    overflowY: "auto",
    overflowX: "hidden",
  },
}));
