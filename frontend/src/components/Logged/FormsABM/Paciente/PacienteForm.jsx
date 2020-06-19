import React, { useEffect, useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { setPaciente, getListaPacientes } from "actions/PacienteActions";

import FormSelect from "components/Logged/FormSelect";

import { useSnackbar } from "notistack";
import { url_servidor } from "Utils/constants";
import { fechaString, parseISOString } from "Utils/functions";

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

function validarForm(paciente) {
  const arrPro = Object.values(paciente);
  const hayCamposVacios = arrPro.some((p) => p === "");

  return !hayCamposVacios;
}

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
        return { name: e.nombre, value: e.cd_plan };
      })
    : [];

  useEffect(() => {
    console.log("PACIENTE_SELECCIONADO", pacienteSeleccionado);

    if (Object.keys(pacienteSeleccionado).length !== 0) {
      const paciente = {
        ...pacienteSeleccionado,
        fecha_nacimiento: parseISOString(pacienteSeleccionado.fecha_nacimiento),
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

    if (validarForm(paciente)) {
      fetch(`${url_servidor}paciente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objPlan),
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se guardó el Paciente", {
            variant: "success",
          });
          dispatch(getListaPacientes());
          setPacienteForm(defaultState);
          setPlan("");
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

  console.log(paciente);

  return (
    <div>
      <Grid container>
        <Grid item lg={10} xs={8} md={8} sm={8} className={classes.headerForm}>
          Crear/Editar Paciente
        </Grid>
        <Grid item lg={2} xs={4} md={4} sm={4} className={classes.buttonForm}>
          <Button variant="contained" color="default" onClick={nuevoPaciente}>
            Nuevo
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.gridForm}>
        <Grid item md={6}>
          <TextField
            variant="outlined"
            margin="normal"
            label="DNI"
            name="dni"
            fullWidth
            value={paciente.dni}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item md={6}>
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
        <Grid item md={6}>
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
        <Grid item md={6}>
          <FormSelect
            name="sexo"
            label="Sexo"
            options={options}
            value={paciente.sexo}
            handleChange={handleInputChange}
          />
        </Grid>
        <Grid item md={6}>
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
        <Grid item md={6}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Teléfono"
            name="telefono"
            fullWidth
            value={paciente.telefono}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item md={6}>
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

        <Grid item md={6}>
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
        <Grid item md={6}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Nro de Afiliado"
            name="nroAfiliado"
            fullWidth
            value={paciente.nroAfiliado}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item md={6}>
          <FormSelect
            name="plan"
            label="Plan"
            options={planesOptions}
            value={(plan && plan.cd_plan) || ""}
            handleChange={handlePlan}
          />
        </Grid>

        <Grid item md={12}>
          <Button variant="contained" color="primary" onClick={guardarPaciente}>
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
    paddingTop: 10,
  },
  gridForm: {
    padding: 10,
  },
}));
