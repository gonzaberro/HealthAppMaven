import React, { useEffect, useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  setProfesional,
  getListaProfesionales,
} from "actions/ProfesionalActions";

import { validateForm } from "Utils/functions";
import { useSnackbar } from "notistack";
import { url_servidor, error_generico } from "Utils/constants";
import { ERROR_MESSAGE } from "actions/types";
import { setModal } from "actions/ModalActions";
import Select from "react-select";

const defaultState = {
  dni: "",
  nombre: "",
  apellido: "",
  sexo: "",
  direccion: "",
  telefono: "",
  email: "",
  matricula: "",
  seguroMalaPraxis: "",
  cuit: "",
  registroNacPrestadores: "",
};

const optionsSexo = [
  { name: "Femenino", value: "F" },
  { name: "Masculino", value: "M" },
];

export default function ProfesionalForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const profesionalSeleccionado = useSelector(
    (state) => state.profesional.profesional
  );
  const listaEspecialidades = useSelector(
    (state) => state.especialidad.listaEspecialidades
  );

  const [profesional, setProfesionalForm] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ...defaultState,
    }
  );

  const [especialidad, setEspecialidad] = useState();

  useEffect(() => {
    // TODO: Verificar como se setea la especialidad

    if (Object.keys(profesionalSeleccionado).length !== 0) {
      setProfesionalForm(profesionalSeleccionado);
      setEspecialidad(profesionalSeleccionado.especialidad);
    }
  }, [profesionalSeleccionado]);

  const optionsEspecialidad = (listaEspecialidad) => {
    const options = [];

    listaEspecialidad.map((especialidad) => {
      return options.push({
        value: especialidad.cd_especialidad,
        label: especialidad.nombre,
      });
    });
    return options;
  };

  const optionsSelectSexo = () => {
    const options = [];

    optionsSexo.map((sexo) => {
      return options.push({
        value: sexo.value,
        label: sexo.name,
      });
    });
    return options;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfesionalForm({ [name]: value });
  };

  const handleSexoChange = (e) => {
    setProfesionalForm({ sexo: e.value });
  };

  const handleEspecialidad = (e) => {
    setEspecialidad({ cd_especialidad: e });
  };

  const guardarProfesional = () => {
    const objProfesional = { ...profesional, especialidad: especialidad };
    if (validateForm(profesional)) {
      fetch(`${url_servidor}profesional`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(objProfesional),
      })
        .then(function (response) {
          if (response.status === 200) {
            enqueueSnackbar("Se guardó el Profesional", {
              variant: "success",
            });
            dispatch(getListaProfesionales());
            handleClose();
          } else {
            enqueueSnackbar("Error al guardar el Profesional", {
              variant: "error",
            });
          }
        })
        .catch(() => {
          dispatch({
            type: ERROR_MESSAGE,
            payload: {
              message: error_generico,
              tipo: "error",
            },
          });
        });
    } else {
      enqueueSnackbar("No puede dejar ningún campo en blanco", {
        variant: "warning",
      });
    }
  };

  const handleClose = () => {
    dispatch(setProfesional({}));
    dispatch(setModal(false));
  };

  return (
    <div>
      <Grid container>
        <Grid item lg={9} xs={12} md={7} sm={12} className={classes.headerForm}>
          Crear/Editar Profesional
        </Grid>
      </Grid>
      <Grid container className={classes.gridForm}>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Nombre"
            name="nombre"
            fullWidth
            value={profesional.nombre}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Apellido"
            name="apellido"
            fullWidth
            value={profesional.apellido}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
          <TextField
            variant="outlined"
            margin="normal"
            label="DNI"
            name="dni"
            fullWidth
            type="number"
            value={profesional.dni}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
          <Select
            options={optionsSelectSexo()}
            isSearchable={true}
            name="sexo"
            placeholder={<div>Sexo</div>}
            styles={colourStyles}
            onChange={(value) => handleSexoChange(value)}
            value={
              profesional.sexo
                ? optionsSelectSexo().filter(
                    (option) => option.value === profesional.sexo
                  )
                : ""
            }
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Dirección"
            name="direccion"
            fullWidth
            value={profesional.direccion}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Teléfono"
            name="telefono"
            fullWidth
            value={profesional.telefono}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Correo Electrónico"
            name="email"
            fullWidth
            value={profesional.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Matrícula"
            name="matricula"
            fullWidth
            value={profesional.matricula}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Seguro Mala Praxis"
            name="seguroMalaPraxis"
            fullWidth
            type="number"
            value={profesional.seguroMalaPraxis}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
          <TextField
            variant="outlined"
            margin="normal"
            label="CUIT"
            name="cuit"
            fullWidth
            type="number"
            value={profesional.cuit}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Registro Nacional Prestadores"
            name="registroNacPrestadores"
            fullWidth
            type="number"
            value={profesional.registroNacPrestadores}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xs={6}
          className={classes.gridInputs}
          style={{ marginTop: "6px" }}
        >
          <Select
            options={optionsEspecialidad(listaEspecialidades)}
            isSearchable={true}
            placeholder={<div>Especialidad</div>}
            styles={colourStyles}
            onChange={(value) => handleEspecialidad(value.value)}
            value={
              especialidad
                ? optionsEspecialidad(listaEspecialidades).filter(
                    (option) => option.value === especialidad.cd_especialidad
                  )
                : ""
            }
          />
        </Grid>

        <Grid item xs={6} md={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={guardarProfesional}
          >
            Guardar
          </Button>
        </Grid>
        <Grid item xs={6} md={2} style={{ paddingLeft: 5 }}>
          <Button
            variant="contained"
            color="default"
            fullWidth
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  headerForm: {
    textAlign: "left",
    paddingTop: 20,
    paddingLeft: 20,
  },
  buttonForm: {
    paddingRight: 10,
    paddingTop: 10,
  },
  gridForm: {
    padding: 10,
  },
  gridInputs: { paddingLeft: 10, paddingRight: 10, backgroundColor: "white" },
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
