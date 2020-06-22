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
  setHistoriaClinica,
  eliminarHistoriaClinica,
} from "actions/HistoriaClinicaActions";
import { parseISOString } from "Utils/functions";
import { confirmAlert } from "react-confirm-alert"; // Import

export default function HistoriaClinicaTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listaHistoriaClinica = useSelector(
    (state) => state.historiaClinica.listaHistoriaClinica
  );

  const editHistoriaClinica = (historiaClinica) => {
    dispatch(setHistoriaClinica(historiaClinica));
  };

  const deleteHistoriaClinica = (id) => {
    confirmAlert({
      title: `¿Eliminar Historia Clínica ID: ${id}?`,
      message: "",
      buttons: [
        {
          label: "Confirmar",
          onClick: () => dispatch(eliminarHistoriaClinica(id)),
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
            <TableCell className={classes.titleTable}>ID</TableCell>
            <TableCell className={classes.titleTable}>
              Fecha Quirúrgica
            </TableCell>
            <TableCell className={classes.titleTable}>
              Fecha de Ingreso
            </TableCell>
            <TableCell className={classes.titleTable}>
              Cantidad de Sesiones
            </TableCell>
            <TableCell className={classes.titleTable}>
              Fecha de Autorización
            </TableCell>
            <TableCell className={classes.titleTable}>Paciente</TableCell>
            <TableCell className={classes.titleTable}>Profesional</TableCell>
            <TableCell className={classes.titleTable}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaHistoriaClinica &&
            listaHistoriaClinica.map((historiaClinica) => {
              return (
                <TableRow
                  key={historiaClinica.id_historia_clinica}
                  className={classes.rowTable}
                  onClick={() => editHistoriaClinica(historiaClinica)}
                >
                  <TableCell component="th" scope="row">
                    {historiaClinica.id_historia_clinica}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parseISOString(historiaClinica.fechaQuirurgica, 2)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parseISOString(historiaClinica.fechaIngreso, 2)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {historiaClinica.cantidadSesiones}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parseISOString(historiaClinica.fechaAutorizacion, 2)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {`${historiaClinica.paciente.nombre} ${historiaClinica.paciente.apellido}`}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {`${historiaClinica.profesional.nombre} ${historiaClinica.profesional.apellido}`}
                  </TableCell>

                  <TableCell align="right">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() =>
                        deleteHistoriaClinica(
                          historiaClinica.id_historia_clinica
                        )
                      }
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
