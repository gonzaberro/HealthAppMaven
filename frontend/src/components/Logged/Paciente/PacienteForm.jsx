import React, { useEffect, useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { setPaciente, getListaPacientes } from "actions/PacienteActions";

import FormSelect from "components/Logged/FormsABM/FormSelect";
import { useSnackbar } from "notistack";
import { url_servidor } from "Utils/constants";
import { fechaString, validateForm } from "Utils/functions";

const defaultState = {
  dni: "",
  nombre: "",
  apellido: "",
  fecha_nacimiento: fechaString(new Date()),
  sexo: "",
  direccion: "",
  telefono: "",
  email: "",
  nroAfiliado: "",
};

const options = [
  { name: "Femenino", value: "F" },
  { name: "Masculino", value: "M" },
];

export default function PacienteForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const pacienteSeleccionado = useSelector((state) => state.paciente.paciente);
  const listaPlanes = useSelector((state) => state.plan.listaPlanes);

  const [paciente, setPacienteForm] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ...defaultState,
    }
  );

  const [plan, setPlan] = useState();

  const planesOptions = listaPlanes
    ? listaPlanes.map((e) => {
        return { name: e.obraSocial.nombre + " " + e.nombre, value: e.cd_plan };
      })
    : [];

  useEffect(() => {
    if (Object.keys(pacienteSeleccionado).length !== 0) {
      const paciente = {
        ...pacienteSeleccionado,
        fecha_nacimiento: fechaString(
          new Date(pacienteSeleccionado.fecha_nacimiento),
          1
        ),
      };
      setPacienteForm(paciente);
      setPlan(pacienteSeleccionado.plan);
    }
  }, [pacienteSeleccionado]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPacienteForm({ [name]: value });
  };

  const handlePlan = (e) => {
    setPlan({ cd_plan: e.target.value });
  };

  const guardarPaciente = () => {
    const objPlan = { ...paciente, plan: plan };
    if (validateForm(paciente)) {
      fetch(`${url_servidor}paciente`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(objPlan),
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se guardó el Paciente", {
            variant: "success",
          });
          dispatch(getListaPacientes());
          nuevoPaciente();
        } else {
          enqueueSnackbar("Error al guardar el Paciente", {
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

  const nuevoPaciente = () => {
    dispatch(setPaciente({}));
    setPacienteForm(defaultState);
    setPlan("");
  };

  return (
    <div>
      <Grid container>
        <Grid item lg={9} xs={12} md={7} sm={12} className={classes.headerForm}>
          Crear/Editar Paciente
        </Grid>
        <Grid item lg={3} xs={12} md={5} sm={12} className={classes.buttonForm}>
          <Button
            variant="contained"
            style={{ width: "100%" }}
            color="default"
            onClick={nuevoPaciente}
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
            type="number"
            name="dni"
            fullWidth
            value={paciente.dni}
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
            value={paciente.nombre}
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
            value={paciente.apellido}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <FormSelect
            name="sexo"
            label="Sexo"
            options={options}
            value={paciente.sexo}
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
            value={paciente.direccion}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Teléfono"
            type="number"
            name="telefono"
            fullWidth
            value={paciente.telefono}
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
            value={paciente.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Fecha de Nacimiento"
            name="fecha_nacimiento"
            fullWidth
            type="date"
            value={paciente.fecha_nacimiento}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Nro de Afiliado"
            type="number"
            name="nroAfiliado"
            fullWidth
            value={paciente.nroAfiliado}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <FormSelect
            name="plan"
            label="Plan"
            options={planesOptions}
            value={(plan && plan.cd_plan) || ""}
            handleChange={handlePlan}
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={guardarPaciente}
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
