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
  setEspecialidad,
  eliminarEspecialidad,
} from "actions/EspecialidadActions";
import { confirmAlert } from "react-confirm-alert"; // Import

export default function EspecialidadTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listaEspecialidades = useSelector(
    (state) => state.especialidad.listaEspecialidades
  );

  const editEspecialidad = (cd_especialidad, nombre) => {
    dispatch(
      setEspecialidad({
        cd_especialidad: cd_especialidad,
        nombre: nombre,
      })
    );
  };

  const deleteEspecialidad = (cd_especialidad, nombre) => {
    confirmAlert({
      title: "¿Eliminar " + nombre + "?",
      message: "",
      buttons: [
        {
          label: "Confirmar",
          onClick: () => dispatch(eliminarEspecialidad(cd_especialidad)),
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
            <TableCell className={classes.titleTable}>Especialidades</TableCell>
            <TableCell className={classes.titleTable}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaEspecialidades &&
            listaEspecialidades.map((especialidad) => {
              return (
                <TableRow
                  key={especialidad.nombre}
                  className={classes.rowTable}
                  onClick={() =>
                    editEspecialidad(
                      especialidad.cd_especialidad,
                      especialidad.nombre
                    )
                  }
                >
                  <TableCell component="th" scope="row">
                    {especialidad.nombre}
                  </TableCell>
                  <TableCell align="right">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() =>
                        deleteEspecialidad(
                          especialidad.cd_especialidad,
                          especialidad.nombre
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
