import React, { useEffect, useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { setPaciente, getListaPacientes } from "actions/PacienteActions";

import { useSnackbar } from "notistack";
import { url_servidor, error_generico } from "Utils/constants";
import { fechaString, validateForm } from "Utils/functions";
import { ERROR_MESSAGE } from "actions/types";
import Select from "react-select";
import { setModal } from "actions/ModalActions";

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

const optionsSexo = [
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

  const optionsPlan = (listaPlanes) => {
    const options = [];

    listaPlanes.map((plan) => {
      return options.push({
        value: plan.cd_plan,
        label: plan.obraSocial.nombre.toUpperCase() + " - " + plan.nombre,
      });
    });
    return options;
  };

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
  const handleSexoChange = (e) => {
    setPacienteForm({ sexo: e.value });
  };

  const handlePlan = (e) => {
    setPlan({ cd_plan: e });
  };

  const handleClose = () => {
    dispatch(setPaciente({}));
    dispatch(setModal(false));
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
      })
        .then(function (response) {
          if (response.status === 200) {
            enqueueSnackbar("Se guardó el Paciente", {
              variant: "success",
            });
            dispatch(getListaPacientes());
            handleClose();
          } else {
            enqueueSnackbar("Error al guardar el Paciente", {
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

  return (
    <div>
      <Grid container>
        <Grid item lg={9} xs={12} md={7} sm={12} className={classes.headerForm}>
          Crear/Editar Paciente
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
            value={paciente.nombre}
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
            value={paciente.apellido}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
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
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
          <Select
            options={optionsSelectSexo()}
            isSearchable={true}
            name="sexo"
            placeholder={<div>Sexo</div>}
            styles={colourStyles}
            onChange={(value) => handleSexoChange(value)}
            value={
              paciente.sexo
                ? optionsSelectSexo().filter(
                    (option) => option.value === paciente.sexo
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
            value={paciente.direccion}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
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
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
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
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
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
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
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

        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.gridInputs}>
          <Select
            options={optionsPlan(listaPlanes)}
            isSearchable={true}
            placeholder={<div>Plan</div>}
            styles={colourStyles}
            onChange={(value) => handlePlan(value.value)}
            value={
              plan
                ? optionsPlan(listaPlanes).filter(
                    (option) => option.value === plan.cd_plan
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
            onClick={guardarPaciente}
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
