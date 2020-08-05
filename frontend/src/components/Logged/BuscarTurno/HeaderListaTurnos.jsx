import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import { setEstadosTurno } from "actions/BuscarTurnosActions";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderListaTurnos() {
  const classes = useStyles();
  const [estadoRecepcionado, setEstadoRecepcionado] = useState(false);
  const [estadoAsignado, setEstadoAsignado] = useState(false);
  const [estadoAtendido, setEstadoAtendido] = useState(false);
  const [estadoCancelado, setEstadoCancelado] = useState(false);
  const listaEstadosTurno = useSelector(
    (state) => state.estadosTurno.listaEstadosTurno
  );

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
  const getColorEstadoTurno = (cdEstado) => {
    let estadoTurno = listaEstadosTurno.find(
      (estadoTurno) => estadoTurno.cdEstado === cdEstado
    );

    return estadoTurno.colorHexa;
  };

  return listaEstadosTurno.length > 0 ? (
    <Grid container style={{ height: "5vh" }}>
      <Grid md={3} sm={12} className={classes.gridItems}>
        <Checkbox
          checked={estadoAsignado}
          name="checkedB"
          onChange={() => setEstadoAsignado(estadoAsignado ? false : true)}
          color="primary"
        />
        <span
          style={{
            borderBottom: `2px solid ${getColorEstadoTurno(1)}`,
            paddingRight: 5,
          }}
        >
          Asignados
        </span>
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
        <span
          style={{
            borderBottom: `2px solid ${getColorEstadoTurno(2)}`,
            paddingRight: 5,
          }}
        >
          Recepcionados
        </span>
      </Grid>
      <Grid md={3} sm={12} className={classes.gridItems}>
        <Checkbox
          checked={estadoAtendido}
          name="checkedB"
          onChange={() => setEstadoAtendido(estadoAtendido ? false : true)}
          color="primary"
        />
        <span
          style={{
            borderBottom: `2px solid ${getColorEstadoTurno(3)}`,
            paddingRight: 5,
          }}
        >
          Atendidos
        </span>
      </Grid>
      <Grid md={3} sm={12} className={classes.gridItems}>
        <Checkbox
          checked={estadoCancelado}
          name="checkedB"
          onChange={() => setEstadoCancelado(estadoCancelado ? false : true)}
          color="primary"
        />
        <span
          style={{
            borderBottom: `2px solid ${getColorEstadoTurno(4)}`,
            paddingRight: 5,
          }}
        >
          Cancelados
        </span>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}

const useStyles = makeStyles((theme) => ({
  gridItems: { paddingTop: 5, textAlign: "center" },
}));
