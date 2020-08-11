import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

import ReactSelect from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import {
  getFuncionesAsignadas,
  getFuncionesDisponibles,
} from "actions/FuncionesPerfilActions";
import LiFuncionPerfil from "./LiFuncionPerfil";

export default function ContentFuncionPerfil() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listaPerfiles = useSelector((state) => state.perfil.listaPerfiles);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(1);
  const funcionesPerfil = useSelector((state) => state.funcionesPerfil);

  useEffect(() => {
    dispatch(getFuncionesAsignadas(perfilSeleccionado));
    dispatch(getFuncionesDisponibles(perfilSeleccionado));
  }, [dispatch, perfilSeleccionado]);

  const optionsPerfil = (listaPerfiles) => {
    const options = [];

    listaPerfiles.map((perfil) => {
      return options.push({
        value: perfil.cdPerfil,
        label: perfil.dsPerfil,
      });
    });
    return options;
  };

  return (
    <div>
      <Grid container className={classes.containerFuncionPerfil}>
        <Grid item xs={6} md={3}>
          <ReactSelect
            options={optionsPerfil(listaPerfiles)}
            isSearchable={true}
            placeholder={<div>Paciente</div>}
            styles={colourStyles}
            onChange={(value) => setPerfilSeleccionado(value.value)}
            value={optionsPerfil(listaPerfiles).filter(
              (option) => option.value === perfilSeleccionado
            )}
          />
        </Grid>
      </Grid>

      <Grid container className={classes.containerFuncionPerfil}>
        <Grid item xs={12} md={5} className={classes.containerLists}>
          <div className={classes.titlesLists}>
            Funciones Asignadas al perfil
          </div>
          <ul className={classes.ulList}>
            {funcionesPerfil.funcionesAsignadas.length > 0
              ? funcionesPerfil.funcionesAsignadas.map((funcion, index) => {
                  return (
                    <LiFuncionPerfil
                      key={index}
                      tipoFuncion="Asignada"
                      funcion={funcion}
                      perfil={perfilSeleccionado}
                    />
                  );
                })
              : ""}
          </ul>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={5} className={classes.containerLists}>
          <div className={classes.titlesLists}>
            Funciones Disponibles para el perfil
          </div>
          <ul className={classes.ulList}>
            {funcionesPerfil.funcionesDisponibles.length > 0
              ? funcionesPerfil.funcionesDisponibles.map((funcion, index) => {
                  return (
                    <LiFuncionPerfil
                      key={index}
                      tipoFuncion="Disponible"
                      funcion={funcion}
                      perfil={perfilSeleccionado}
                    />
                  );
                })
              : ""}
          </ul>
        </Grid>
      </Grid>
    </div>
  );
}
const useStyles = makeStyles(() => ({
  containerFuncionPerfil: { paddingLeft: 10, paddingRight: 10 },
  containerLists: {
    border: "1px solid #eee",
    height: "50vh",

    textAlign: "center",
    borderRadius: 5,
  },
  titlesLists: {
    padding: 5,
  },
  ulList: {
    margin: 0,
    padding: 0,
    maxHeight: "48vh",
    overflowY: "auto",
  },
}));
const colourStyles = {
  control: (base) => ({
    ...base,
    height: 56,
    minHeight: 35,
    marginTop: 10,
    marginBottom: 10,
  }),
};
