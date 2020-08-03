import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import { setEstadosTurno } from "actions/BuscarTurnosActions";
import { useDispatch } from "react-redux";

export default function HeaderListaTurnos() {
  const classes = useStyles();
  const [estadoRecepcionado, setEstadoRecepcionado] = useState(false);
  const [estadoAsignado, setEstadoAsignado] = useState(false);
  const [estadoAtendido, setEstadoAtendido] = useState(false);
  const [estadoCancelado, setEstadoCancelado] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setEstadosTurno({
        estadoRecepcionado: estadoRecepcionado,
        estadoAsignado: estadoAsignado,
        estadoAtendido: estadoAtendido,
        estadoCancelado: estadoCancelado,
      })
    );
  }, [
    dispatch,
    estadoRecepcionado,
    estadoAsignado,
    estadoAtendido,
    estadoCancelado,
  ]);

  return (
    <Grid container style={{ height: "5vh" }}>
      <Grid md={3} sm={12} className={classes.gridItems}>
        <Checkbox
          checked={estadoAsignado}
          name="checkedB"
          onChange={() => setEstadoAsignado(estadoAsignado ? false : true)}
          color="primary"
        />
        Asignados
      </Grid>
      <Grid md={3} sm={12} className={classes.gridItems}>
        <Checkbox
          checked={estadoRecepcionado}
          name="checkedB"
          onChange={() =>
            setEstadoRecepcionado(estadoRecepcionado ? false : true)
          }
          color="primary"
        />
        Recepcionados
      </Grid>
      <Grid md={3} sm={12} className={classes.gridItems}>
        <Checkbox
          checked={estadoAtendido}
          name="checkedB"
          onChange={() => setEstadoAtendido(estadoAtendido ? false : true)}
          color="primary"
        />
        Atendidos
      </Grid>
      <Grid md={3} sm={12} className={classes.gridItems}>
        <Checkbox
          checked={estadoCancelado}
          name="checkedB"
          onChange={() => setEstadoCancelado(estadoCancelado ? false : true)}
          color="primary"
        />
        Cancelados
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  gridItems: { paddingTop: 5, textAlign: "center" },
}));
