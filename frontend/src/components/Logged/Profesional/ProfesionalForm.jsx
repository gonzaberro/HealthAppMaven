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

import FormSelect from "../FormsABM/FormSelect";
import { validateForm } from "Utils/functions";
import { useSnackbar } from "notistack";
import { url_servidor } from "Utils/constants";

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

const options = [
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

  const especialidadesOptions = listaEspecialidades
    ? listaEspecialidades.map((e) => {
        return { name: e.nombre, value: e.cd_especialidad };
      })
    : [];

  useEffect(() => {
    // TODO: Verificar como se setea la especialidad

    if (Object.keys(profesionalSeleccionado).length !== 0) {
      setProfesionalForm(profesionalSeleccionado);
      setEspecialidad(profesionalSeleccionado.especialidad);
    }
  }, [profesionalSeleccionado]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfesionalForm({ [name]: value });
  };

  const handleEspecialidad = (e) => {
    setEspecialidad({ cd_especialidad: e.target.value });
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
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se guardó el Profesional", {
            variant: "success",
          });
          dispatch(getListaProfesionales());
          nuevoProfesional();
        } else {
          enqueueSnackbar("Error al guardar el Profesional", {
            variant: "error",
          });
        }
      });
    } else {
      enqueueSnackbar("No puede dejar ningún campo en blanco", {
        variant: "warning",
      });
    }
  };

  const nuevoProfesional = () => {
    dispatch(setProfesional({}));
    setProfesionalForm(defaultState);
    setEspecialidad("");
  };

  return (
    <div>
      <Grid container>
        <Grid item lg={9} xs={12} md={7} sm={12} className={classes.headerForm}>
          Crear/Editar Profesional
        </Grid>
        <Grid item lg={3} xs={12} md={5} sm={12} className={classes.buttonForm}>
          <Button
            variant="contained"
            color="default"
            style={{ width: "100%" }}
            onClick={nuevoProfesional}
          >
            Nuevo
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.gridForm}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
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

        <Grid item lg={12} md={12} sm={12} xs={12}>
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
        <Grid item lg={12} md={12} sm={12} xs={12}>
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
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <FormSelect
            name="sexo"
            label="Sexo"
            options={options}
            value={profesional.sexo}
            handleChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
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
        <Grid item lg={12} md={12} sm={12} xs={12}>
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
        <Grid item lg={12} md={12} sm={12} xs={12}>
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
        <Grid item lg={12} md={12} sm={12} xs={12}>
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
        <Grid item lg={12} md={12} sm={12} xs={12}>
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
        <Grid item lg={12} md={12} sm={12} xs={12}>
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
        <Grid item lg={12} md={12} sm={12} xs={12}>
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
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <FormSelect
            name="especialidad"
            label="Especialidad"
            options={especialidadesOptions}
            value={(especialidad && especialidad.cd_especialidad) || ""}
            handleChange={handleEspecialidad}
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={guardarProfesional}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  headerForm: {
    textAlign: "center",
    paddingTop: 20,
  },
  buttonForm: {
    paddingRight: 10,
    paddingTop: 10,
  },
  gridForm: {
    padding: 10,
  },
}));
