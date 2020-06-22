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
  setProfesional,
  eliminarProfesional,
} from "actions/ProfesionalActions";
import { confirmAlert } from "react-confirm-alert"; // Import

export default function ProfesionalTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listaProfesionales = useSelector(
    (state) => state.profesional.listaProfesionales
  );

  const editProfesional = (profesional) => {
    dispatch(setProfesional(profesional));
  };

  const deleteProfesional = (dni) => {
    confirmAlert({
      title: `¿Eliminar profesional DNI: ${dni}?`,
      message: "",
      buttons: [
        {
          label: "Confirmar",
          onClick: () => dispatch(eliminarProfesional(dni)),
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
            <TableCell className={classes.titleTable}>DNI</TableCell>
            <TableCell className={classes.titleTable}>Profesional</TableCell>
            <TableCell className={classes.titleTable}>CUIT</TableCell>
            <TableCell className={classes.titleTable}>Matrícula</TableCell>
            <TableCell className={classes.titleTable}>Dirección</TableCell>
            <TableCell className={classes.titleTable}>Teléfono</TableCell>
            <TableCell className={classes.titleTable}>Sexo</TableCell>
            <TableCell className={classes.titleTable}>
              Correo Electrónico
            </TableCell>
            <TableCell className={classes.titleTable}>
              Reg. Nac. Prestadores
            </TableCell>
            <TableCell className={classes.titleTable}>Seguro</TableCell>
            <TableCell className={classes.titleTable}>Especialidad</TableCell>

            <TableCell className={classes.titleTable}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaProfesionales &&
            listaProfesionales.map((profesional) => {
              return (
                <TableRow
                  key={profesional.dni}
                  className={classes.rowTable}
                  onClick={() => editProfesional(profesional)}
                >
                  <TableCell component="th" scope="row">
                    {profesional.dni}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {`${profesional.nombre} ${profesional.apellido}`}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {profesional.cuit}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {profesional.matricula}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {profesional.direccion}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {profesional.telefono}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {profesional.sexo}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {profesional.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {profesional.registroNacPrestadores}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {profesional.seguroMalaPraxis}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {profesional.especialidad.nombre}
                  </TableCell>

                  <TableCell align="right">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteProfesional(profesional.dni)}
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
