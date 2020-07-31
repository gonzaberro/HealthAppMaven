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
import { setPerfil, eliminarPerfil } from "actions/PerfilActions";
import { confirmAlert } from "react-confirm-alert"; // Import

export default function PerfilTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listaPerfiles = useSelector((state) => state.perfil.listaPerfiles);

  const editPerfil = (cdPerfil, dsPerfil) => {
    dispatch(
      setPerfil({
        cdPerfil: cdPerfil,
        dsPerfil: dsPerfil,
      })
    );
  };

  const deletePerfil = (cdPerfil, dsPerfil) => {
    confirmAlert({
      title: "¿Eliminar " + dsPerfil + "?",
      message: "",
      buttons: [
        {
          label: "Eliminar",
          onClick: () => dispatch(eliminarPerfil(cdPerfil)),
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
            <TableCell className={classes.titleTable}>Perfiles</TableCell>
            <TableCell className={classes.titleTable}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaPerfiles &&
            listaPerfiles.map((perfil) => {
              return (
                <TableRow
                  key={perfil.dsPerfil}
                  className={classes.rowTable}
                  onClick={() => editPerfil(perfil.cdPerfil, perfil.dsPerfil)}
                >
                  <TableCell component="th" scope="row">
                    {perfil.dsPerfil}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      button
                      onClick={() =>
                        deletePerfil(perfil.cdPerfil, perfil.dsPerfil)
                      }
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
