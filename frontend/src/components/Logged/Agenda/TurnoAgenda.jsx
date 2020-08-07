import React from "react";
import Chip from "@material-ui/core/Chip";
import { editTurnoComplete } from "../../../actions/EditTurnoActions";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { useDispatch, useSelector } from "react-redux";
import { url_servidor, error_generico } from "Utils/constants";
import { fechaString } from "Utils/functions";
import { ERROR_MESSAGE } from "actions/types";
import { getTurnos } from "actions/AgendaActions";

export default function TurnoAgenda(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const listaEstadosTurno = useSelector(
    (state) => state.estadosTurno.listaEstadosTurno
  );
  const fechaCalendario = useSelector(
    (state) => state.agenda_reducer.fecha_agenda
  );
  const profesional_seleccionado = useSelector(
    (state) => state.agenda_reducer.profesional_seleccionado
  );

  const editTurno = () => {
    let turno = props.turno;
    dispatch(editTurnoComplete(turno));
  };

  const handleClick = (e, data) => {
    if (fechaString(fechaCalendario) >= fechaString(new Date())) {
      fetch(
        url_servidor +
          "turnos/cambiarEstado/" +
          props.turno.cdTurno +
          "/" +
          data.cdEstado,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar("Se guardó el turno.", {
              variant: "success",
            });

            dispatch(
              getTurnos(fechaString(fechaCalendario), profesional_seleccionado)
            );
          } else {
            enqueueSnackbar("Error al cambiar el estado del turno.", {
              variant: "error",
            });
          }
        })
        .catch(() => {
          dispatch({
            type: ERROR_MESSAGE,
            payload: {
              message: error_generico,
              tipo: "error",
            },
          });
        });
    } else {
      enqueueSnackbar("No puede modificar un turno que ya pasó.", {
        variant: "warning",
      });
    }
  };

  return (
    <div style={{ display: "inline-block", zIndex: 100 }}>
      <ContextMenuTrigger id={props.turno.cdTurno}>
        <Chip
          clickable={true}
          key={props.index}
          style={{ background: props.turno.estadoTurno.colorHexa }}
          className={classes.chipTurnos}
          onClick={() => editTurno()}
          label={
            props.turno.paciente.dni +
            " - " +
            props.turno.paciente.nombre +
            " " +
            props.turno.paciente.apellido +
            " (" +
            props.turno.tipoServicio.nombre +
            ")"
          }
        ></Chip>
      </ContextMenuTrigger>
      <ContextMenu id={props.turno.cdTurno} className={classes.menuContainer}>
        {listaEstadosTurno.map((estado) => {
          return (
            <MenuItem
              data={{ cdEstado: estado.cdEstado }}
              className={classes.itemMenu}
              onClick={handleClick}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: 10,
                  background: `${estado.colorHexa}`,
                }}
              ></span>
              <span style={{ borderLeft: "1px solid #ddd", paddingLeft: 5 }}>
                Turno {estado.dsEstado}
              </span>
            </MenuItem>
          );
        })}
      </ContextMenu>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  chipTurnos: {
    margin: 5,
    zIndex: 0,
    color: "#fff",
    boxShadow: "2px 2px 3px 1px #cdcdcd",
    "&:hover": {
      color: "#fff",
      border: "1px solid #eee",
    },
  },
  menuContainer: {
    background: "#fff",
    color: "#111",
    borderRadius: 5,
    zIndex: 100,
  },
  itemMenu: {
    padding: 10,
    borderRadius: 5,
    "&:hover": {
      background: "#eee",
    },
  },
}));
