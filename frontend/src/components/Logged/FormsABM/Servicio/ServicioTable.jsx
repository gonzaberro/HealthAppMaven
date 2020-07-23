import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setServicio, eliminarServicio } from "actions/ServicioActions";
import { confirmAlert } from "react-confirm-alert"; // Import

export default function ServicioTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listaServicios = useSelector((state) => state.servicio.listaServicios);

  const editServicio = (servicio) => {
    dispatch(setServicio(servicio));
  };

  const deleteServicio = (servicio) => {
    confirmAlert({
      title: "¿Eliminar " + servicio.nombre + "?",
      message: "",
      buttons: [
        {
          label: "Eliminar",
          onClick: () => dispatch(eliminarServicio(servicio.cd_servicio)),
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
              Código Servicio
            </TableCell>
            <TableCell className={classes.titleTable}>Servicio</TableCell>
            <TableCell className={classes.titleTable}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaServicios &&
            listaServicios.map((servicio) => {
              return (
                <TableRow
                  key={servicio.cd_servicio}
                  className={classes.rowTable}
                  onClick={() => editServicio(servicio)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {servicio.cd_servicio}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {servicio.nombre}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      button
                      onClick={() => deleteServicio(servicio)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
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
