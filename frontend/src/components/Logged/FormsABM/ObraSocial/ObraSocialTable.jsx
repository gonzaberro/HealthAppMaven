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
import { setObraSocial, eliminarObraSocial } from "actions/ObraSocialActions";
import { confirmAlert } from "react-confirm-alert"; // Import

export default function SimpleTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listaObrasSociales = useSelector(
    (state) => state.obra_social.listaObrasSociales
  );

  const editObraSocial = (cd_os, nombre) => {
    dispatch(
      setObraSocial({
        cd_os: cd_os,
        nombre: nombre,
      })
    );
  };

  const deleteObraSocial = (cd_os, nombre) => {
    console.log("HOLA");
    confirmAlert({
      title: "¿Eliminar " + nombre + "?",
      message: "",
      buttons: [
        {
          label: "Cancelar",
        },
        {
          label: "Confirmar",
          onClick: () => dispatch(eliminarObraSocial(cd_os)),
        },
      ],
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.titleTable}>Obras Sociales</TableCell>
            <TableCell className={classes.titleTable}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaObrasSociales &&
            listaObrasSociales.map((obraSocial) => {
              return (
                <TableRow
                  key={obraSocial.nombre}
                  className={classes.rowTable}
                  onClick={() =>
                    editObraSocial(obraSocial.cd_os, obraSocial.nombre)
                  }
                >
                  <TableCell component="th" scope="row">
                    {obraSocial.nombre}
                  </TableCell>
                  <TableCell align="right">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() =>
                        deleteObraSocial(obraSocial.cd_os, obraSocial.nombre)
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
