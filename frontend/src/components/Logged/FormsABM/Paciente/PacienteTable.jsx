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
import { setPaciente, eliminarPaciente } from "actions/PacienteActions";
import { confirmAlert } from "react-confirm-alert"; // Import
import { parseISOString } from "Utils/functions";
export default function PacienteTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listaPacientes = useSelector((state) => state.paciente.listaPacientes);

  const editPaciente = (paciente) => {
    dispatch(setPaciente(paciente));
  };

  const deletePaciente = (dni) => {
    confirmAlert({
      title: `¿Eliminar paciente DNI: ${dni}?`,
      message: "",
      buttons: [
        {
          label: "Confirmar",
          onClick: () => dispatch(eliminarPaciente(dni)),
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
            <TableCell className={classes.titleTable}>Paciente</TableCell>
            <TableCell className={classes.titleTable}>Dirección</TableCell>
            <TableCell className={classes.titleTable}>Teléfono</TableCell>
            <TableCell className={classes.titleTable}>Sexo</TableCell>
            <TableCell className={classes.titleTable}>
              Fecha de Naciemiento
            </TableCell>
            <TableCell className={classes.titleTable}>
              Correo Electrónico
            </TableCell>
            <TableCell className={classes.titleTable}>
              Nro de Afiliado
            </TableCell>
            <TableCell className={classes.titleTable}>Plan</TableCell>

            <TableCell className={classes.titleTable}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaPacientes &&
            listaPacientes.map((paciente) => {
              return (
                <TableRow
                  key={paciente.dni}
                  className={classes.rowTable}
                  onClick={() => editPaciente(paciente)}
                >
                  <TableCell component="th" scope="row">
                    {paciente.dni}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {`${paciente.nombre} ${paciente.apellido}`}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {paciente.direccion}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {paciente.telefono}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {paciente.sexo}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {parseISOString(paciente.fecha_nacimiento, 2)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {paciente.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {paciente.nroAfiliado}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {paciente.plan.nombre}
                  </TableCell>

                  <TableCell align="right">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deletePaciente(paciente.dni)}
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
