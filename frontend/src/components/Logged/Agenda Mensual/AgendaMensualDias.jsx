import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setDiaMesSeleccionado } from "actions/AgendaActions";
import { useSelector, useDispatch } from "react-redux";
import { menuOptions } from "Utils/constants";
import { SWITCH_MENU } from "actions/types";
import TurnosDiaAgendaMensual from "./TurnosDiaAgendaMensual";
import { getTurnosMensual } from "actions/VistaMensualYSemanalActions";
import { fechaString } from "Utils/functions";

export default function AgendaMensualDias() {
  const fechaCalendario = useSelector(
    (state) => state.agenda_reducer.fecha_agenda
  );

  const classes = useStyles();
  const dispatch = useDispatch();

  const profesional_seleccionado = useSelector(
    (state) => state.agenda_reducer.profesional_seleccionado
  );
  useEffect(() => {
    if (profesional_seleccionado > 0) {
      dispatch(
        getTurnosMensual(fechaString(fechaCalendario), profesional_seleccionado)
      );
    }
  }, [fechaCalendario, profesional_seleccionado, dispatch]);

  const gotoDiaCalendario = (numero_dia) => {
    const ye = new Intl.DateTimeFormat("es", { year: "numeric" }).format(
      fechaCalendario
    ); //Anio en formato YYYY de la fecha que seleccione
    const mo = new Intl.DateTimeFormat("es", { month: "2-digit" }).format(
      fechaCalendario
    ); //MES en formato MM de la fecha que seleccione

    dispatch(setDiaMesSeleccionado(new Date(ye, mo - 1, numero_dia))); //Seteo la fecha del calendario con la fecha que seleccione
    dispatch({
      type: SWITCH_MENU,
      payload: { menu: menuOptions.Agenda_DIARIA, limpiar: true },
    }); //Voy a ver la visual del calendario por DIA
  };

  const renderDiasCalendario = () => {
    let mo = fechaCalendario.getMonth(); //MES Que seleccione en el calendario

    const ye = new Intl.DateTimeFormat("es", { year: "numeric" }).format(
      fechaCalendario
    ); //Anio en formato YYYY de la fecha que seleccione

    let fecha_semana = new Date(ye, mo, 1); //Creo el dia 1 del mes
    let dia_primer_dia = fecha_semana.getDay(); //Obtengo si empieza un LUNES,MARTES,MIERCOLES,ETC

    let dias_calendario = []; //RETURN DEL CALENDARIO

    for (let dias = 1; dias <= 40; dias++) {
      if (
        dias >= dia_primer_dia && //Me aseguro que la casilla que estoy dibujando sea parte del mes seleccionado
        fecha_semana.getMonth() === mo && //Me aseguro que este dibujando siempre el mismo mes
        fecha_semana.getDay() > 0 //Me aseguro que el dia no sea domingo
      ) {
        let badge_numero = fecha_semana.getDate(); //Lo necesito para poder saber el dia cuando hago click sobre la fecha

        dias_calendario.push(
          <Grid
            item
            key={"grid_" + dias}
            md={2}
            xs={12}
            className={classes.gridDias}
            onClick={() => gotoDiaCalendario(badge_numero)}
          >
            <Grid container key={"badge_container_" + dias}>
              <Grid item md={1} xs={1} key={"grid_nro_dia_" + dias}>
                <Badge
                  color="primary"
                  key={"badge_nro_dia_" + dias}
                  badgeContent={fecha_semana.getDate()}
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
                <TurnosDiaAgendaMensual
                  key={"turnos_dia_mensual_" + dias}
                  dia_mes={badge_numero}
                  mes_calendario={mo + 1}
                />
              </Grid>
            </Grid>
          </Grid>
        );
        fecha_semana.setDate(fecha_semana.getDate() + 1); //Sumo 1 dia a la fecha que muestro en el calendario
      } else {
        if (fecha_semana.getDay() > 0) {
          //Dibujo solo dias vacios que no sean domingo
          dias_calendario.push(
            <Grid
              item
              key={dias}
              md={2}
              xs={12}
              className={classes.gridDias}
            ></Grid>
          );
        } else {
          fecha_semana.setDate(fecha_semana.getDate() + 1); //Si es domingo, igualmente sumo un dia al dia del mes
        }
      }
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
    minHeight: "14vh",
    "&:hover": {
      border: "1px solid #2c41b5",
      // backgroundColor: "#eeeeee",
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  },
  gridTurnosDia: {
    maxHeight: "12vh",
    overflowY: "auto",
    overflowX: "hidden",
  },
}));
