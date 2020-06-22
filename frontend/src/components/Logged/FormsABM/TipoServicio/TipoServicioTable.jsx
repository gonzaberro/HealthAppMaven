import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setTipoServicio,
  eliminarTipoServicio,
} from "actions/TipoServicioActions";
import { confirmAlert } from "react-confirm-alert"; // Import

export default function TipoServicioTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listaTipoServicios = useSelector(
    (state) => state.tipoServicio.listaTipoServicios
  );

  const editTipoServicio = (servicio) => {
    dispatch(setTipoServicio(servicio));
  };

  const deleteTipoServicio = (tipoServicio) => {
    confirmAlert({
      title: "¿Eliminar " + tipoServicio.nombre + "?",
      message: "",
      buttons: [
        {
          label: "Confirmar",
          onClick: () =>
            dispatch(eliminarTipoServicio(tipoServicio.cdTipoServicio)),
        },
        {
          label: "Cancelar",
        },
      ],
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.titleTable}>
              Tipo de Servicio
            </TableCell>
            <TableCell className={classes.titleTable}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaTipoServicios &&
            listaTipoServicios.map((tipoServicio) => {
              return (
                <TableRow
                  key={tipoServicio.cdTipoServicio}
                  className={classes.rowTable}
                  onClick={() => editTipoServicio(tipoServicio)}
                >
                  <TableCell component="th" scope="row">
                    {tipoServicio.nombre}
                  </TableCell>
                  <TableCell align="right">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteTipoServicio(tipoServicio)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  titleTable: {
    fontSize: 16,
    textAlign: "center",
  },
  rowTable: {
    "&:hover": {
      backgroundColor: "#eeeeee",
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  },
}));
