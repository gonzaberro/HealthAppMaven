import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { url_servidor, error_generico } from "Utils/constants";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import {
  getFuncionesAsignadas,
  getFuncionesDisponibles,
} from "actions/FuncionesPerfilActions";

export default function LiFuncionPerfil({ funcion, tipoFuncion, perfil }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const asignarFuncion = () => {
    fetch(url_servidor + "funcionPerfil", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        perfil: { cdPerfil: perfil, dsPerfil: "" },
        funcion: funcion,
      }),
    })
      .then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se editó las funciones del perfil", {
            variant: "success",
          });
          reloadFunciones();
        } else {
          enqueueSnackbar(
            "Error " + response.status + " al editar las funciones del perfil",
            {
              variant: "error",
            }
          );
        }
      })
      .catch(() => {
        enqueueSnackbar(error_generico, {
          variant: "error",
        });
      });
  };
  const reloadFunciones = () => {
    dispatch(getFuncionesAsignadas(perfil));
    dispatch(getFuncionesDisponibles(perfil));
  };
  const desAsignarFuncion = () => {
    fetch(url_servidor + "funcionPerfil/" + perfil + "/" + funcion.cdFuncion, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar("Se editó las funciones del perfil", {
            variant: "success",
          });
          reloadFunciones();
        } else {
          enqueueSnackbar(
            "Error " + response.status + " al editar las funciones del perfil",
            {
              variant: "error",
            }
          );
        }
      })
      .catch(() => {
        enqueueSnackbar(error_generico, {
          variant: "error",
        });
      });
  };

  return (
    <li className={classes.itemList}>
      {funcion.dsFuncion}
      <Button
        className={classes.buttonList}
        variant="contained"
        color="primary"
        onClick={
          tipoFuncion === "Asignada" ? desAsignarFuncion : asignarFuncion
        }
      >
        {tipoFuncion === "Asignada" ? "Desasignar" : "Asignar"}
      </Button>
    </li>
  );
}
const useStyles = makeStyles(() => ({
  buttonList: { float: "right", bottom: 10 },
  itemList: {
    margin: 5,
    padding: 15,
    borderRadius: 5,
    textAlign: "left",
    background: "#eee",
    listStyleType: "none",
  },
}));
