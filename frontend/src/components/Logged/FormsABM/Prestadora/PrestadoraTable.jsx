import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import { setPrestadora, eliminarPrestadora } from "actions/PrestadoraActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function PrestadoraTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const prestadoras = useSelector((state) => state.prestadora.listaPrestadoras);

  const editPrestadora = (prestadora) => {
    dispatch(setPrestadora(prestadora));
  };

  const deletePrestadora = (prestadora) => {
    confirmAlert({
      title: "¿Eliminar " + prestadora.nombre + "?",
      message: "",
      buttons: [
        {
          label: "Eliminar",
          onClick: () => dispatch(eliminarPrestadora(prestadora.cd_prestadora)),
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
            <TableCell className={classes.titleTable}>Nombre</TableCell>
            <TableCell className={classes.titleTable}>Direccion</TableCell>
            <TableCell className={classes.titleTable}>Telefono</TableCell>
            <TableCell className={classes.titleTable}>Intervalo</TableCell>
            <TableCell className={classes.titleTable}>Hora Inicio</TableCell>
            <TableCell className={classes.titleTable}>Hora Fin</TableCell>
            <TableCell className={classes.titleTable}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prestadoras &&
            prestadoras.map((prestadora) => {
              return (
                <TableRow
                  key={prestadora.cd_prestadora}
                  className={classes.rowTable}
                  onClick={() => editPrestadora(prestadora)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {prestadora.nombre}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {prestadora.direccion}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {prestadora.telefono}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {prestadora.intervalo}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {prestadora.horaDesde}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {prestadora.horaHasta}
                  </TableCell>
                  <TableCell align="right">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deletePrestadora(prestadora)}
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
