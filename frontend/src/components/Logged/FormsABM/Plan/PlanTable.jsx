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
import { setPlan, eliminarPlan } from "actions/PlanActions";
import { confirmAlert } from "react-confirm-alert"; // Import

export default function PlanTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listaPlanes = useSelector((state) => state.plan.listaPlanes);

  const editObraSocial = (cd_plan, nombre, cd_os, nombre_os) => {
    dispatch(
      setPlan({
        cd_plan: cd_plan,
        nombre: nombre,
        obraSocial: {
          cd_os: cd_os,
          nombre: nombre_os,
        },
      })
    );
  };

  const deleteObraSocial = (cd_plan, nombre) => {
    confirmAlert({
      title: "¿Eliminar " + nombre + "?",
      message: "",
      buttons: [
        {
          label: "Eliminar",
          onClick: () => dispatch(eliminarPlan(cd_plan)),
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
            <TableCell className={classes.titleTable}>Obra Social</TableCell>
            <TableCell className={classes.titleTable}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaPlanes &&
            listaPlanes.map((plan) => {
              return (
                <TableRow
                  key={plan.nombre}
                  className={classes.rowTable}
                  onClick={() =>
                    editObraSocial(
                      plan.cd_plan,
                      plan.nombre,
                      plan.obraSocial.cd_os,
                      plan.obraSocial.nombre
                    )
                  }
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {plan.nombre}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {plan.obraSocial.nombre}
                  </TableCell>
                  <TableCell align="right">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() =>
                        deleteObraSocial(plan.cd_plan, plan.nombre)
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
