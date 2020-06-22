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
  setCostoServicio,
  eliminarCostoServicio,
} from "actions/CostoServicioActions";
import { confirmAlert } from "react-confirm-alert"; // Import

export default function CostoServicioTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listaCostoServicios = useSelector(
    (state) => state.costoServicio.listaCostoServicios
  );

  const editCostoServicio = (costoServicio) => {
    dispatch(setCostoServicio(costoServicio));
  };

  const deleteCostoServicio = (costoServicio) => {
    confirmAlert({
      title: "¿Está seguro que desea eliminar?",
      message: "",
      buttons: [
        {
          label: "Confirmar",
          onClick: () =>
            dispatch(
              eliminarCostoServicio(
                costoServicio.id.cdServicio,
                costoServicio.id.cdPlan,
                costoServicio.id.tipoServicio.cdTipoServicio
              )
            ),
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
            <TableCell className={classes.titleTable}>Plan</TableCell>
            <TableCell className={classes.titleTable}>Servicio</TableCell>
            <TableCell className={classes.titleTable}>Tipo Servicio</TableCell>
            <TableCell className={classes.titleTable}>Costo</TableCell>
            <TableCell className={classes.titleTable}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaCostoServicios &&
            listaCostoServicios.map((costoServicio, index) => {
              return (
                <TableRow
                  key={index}
                  className={classes.rowTable}
                  onClick={() => editCostoServicio(costoServicio)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {costoServicio.plan.obraSocial.nombre} -{" "}
                    {costoServicio.plan.nombre}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {costoServicio.servicio.nombre}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {costoServicio.id.tipoServicio.nombre}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    ${costoServicio.costo}
                  </TableCell>
                  <TableCell align="right">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteCostoServicio(costoServicio)}
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
