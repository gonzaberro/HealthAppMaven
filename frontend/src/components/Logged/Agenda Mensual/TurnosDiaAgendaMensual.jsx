import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

export default function TurnosDiaAgendaMensual(props) {
  const classes = useStyles();

  const turnos = useSelector((state) => state.vista_mensual_semanal.turnos);

  const turnosDiadelMes = (mes_actual, dia_mes) => {
    if (turnos[dia_mes] !== undefined) {
      return turnos[dia_mes].map((turno, index_dia) => {
        return (
          <Grid
            key={"grid_container_" + index_dia}
            container
            style={{ marginBottom: 2 }}
          >
            <Grid key={"grid_row_" + index_dia} item md={12} xs={12}>
              <div key={"turno" + index_dia} className={classes.divTurno}>
                <Grid container>
                  <Grid item lg={2} md={2} sm={4} xs={4}>
                    <span key={"span_horario_" + index_dia}>{turno.hora}</span>
                  </Grid>
                  <Grid item lg={10} md={10} sm={8} xs={8}>
                    <span key={"span_paciente_" + index_dia}>
                      {turno.paciente.dni} - {turno.paciente.nombre}{" "}
                      {turno.paciente.apellido} ({turno.tipoServicio.nombre})
                    </span>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        );
      });
    } else {
      return <></>;
    }
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
    "&:hover": {
      backgroundColor: "#d0d0d0",
    },
  },
}));
