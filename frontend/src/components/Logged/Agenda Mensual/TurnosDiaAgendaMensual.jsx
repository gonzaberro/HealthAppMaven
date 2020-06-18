import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
export default function TurnosDiaAgendaMensual(props) {
  const classes = useStyles();
  const turnos = useSelector((state) => state.vista_mensual_semanal.turnos);
  const turnosDiadelMes = (mes_actual, dia_mes) => {
    if (mes_actual === turnos.mes) {
      return turnos.dias
        .filter((turno) => {
          return turno.dia === dia_mes;
        })
        .map((dia, index_dia) => {
          return (
            <Grid
              key={"grid_container_" + index_dia}
              container
              style={{ marginBottom: 2 }}
            >
              <Grid key={"grid_row_" + index_dia} item md={12} xs={12}>
                <div key={"turno" + index_dia} className={classes.divTurno}>
                  <span key={"span_horario_" + index_dia}>
                    Hs: {dia.horario} |
                  </span>
                  <span key={"span_paciente_" + index_dia}>
                    {" "}
                    {dia.paciente}
                  </span>
                </div>
              </Grid>
            </Grid>
          );
        });
    } else return <></>;
  };

  return turnosDiadelMes(props.mes_calendario, props.dia_mes);
}
const useStyles = makeStyles((theme) => ({
  divTurno: {
    minWidth: "100%",
    backgroundColor: "#e0e0e0",
    minHeight: "1vh",
    borderRadius: 5,
    fontSize: 8,
    color: "#272727",
    fontWeight: "bold",
    padding: 1,
  },
}));
