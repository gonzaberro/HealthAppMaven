import React, { useEffect, useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  setHistoriaClinica,
  getListaHistoriaClinica,
} from "actions/HistoriaClinicaActions";

import FormSelect from "../../FormSelect";
import { fechaString, validateForm, parseISOString } from "Utils/functions";
import { useSnackbar } from "notistack";
import { url_servidor } from "Utils/constants";

const defaultState = {
  id_historia_clinica: 0,
  diagnostico: "",
  tratamiento: "",
  fechaQuirurgica: fechaString(new Date()),
  fechaIngreso: fechaString(new Date()),
  cantidadSesiones: "",
  fechaAutorizacion: fechaString(new Date()),
  cdFacturacion: "",
  cdValidacion: "",
};

export default function HistoriaClinicaForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [historiaClinicaForm, setHistoriaClinicaForm] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ...defaultState,
    }
  );

  const [paciente, setPaciente] = useState();
  const [profesional, setProfesional] = useState();

  const historiaClinicaSeleccionada = useSelector(
    (state) => state.historiaClinica.historiaClinica
  );

  const listaPacientes = useSelector((state) => state.paciente.listaPacientes);

  const listaProfesionales = useSelector(
    (state) => state.profesional.listaProfesionales
  );

  const pacientesOptions = listaPacientes
    ? listaPacientes.map((p) => {
        return { name: `${p.nombre} ${p.apellido}`, value: p.dni };
      })
    : [];

  const profesionalesOptions = listaProfesionales
    ? listaProfesionales.map((p) => {
        return { name: `${p.nombre} ${p.apellido}`, value: p.dni };
      })
    : [];

  useEffect(() => {
    if (Object.keys(historiaClinicaSeleccionada).length !== 0) {
      const historiaClinica = {
        ...historiaClinicaSeleccionada,
        fechaQuirurgica: parseISOString(
          historiaClinicaSeleccionada.fechaQuirurgica
        ),
        fechaIngreso: parseISOString(historiaClinicaSeleccionada.fechaIngreso),
        fechaAutorizacion: parseISOString(
          historiaClinicaSeleccionada.fechaAutorizacion
        ),
      };

      setHistoriaClinicaForm(historiaClinica);
      setPaciente(historiaClinicaSeleccionada.paciente);
      setProfesional(historiaClinicaSeleccionada.profesional);
    }
  }, [historiaClinicaSeleccionada]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHistoriaClinicaForm({ [name]: value });
  };

  const handlePaciente = (e) => {
    setPaciente({ dni: e.target.value });
  };

  const handleProfesional = (e) => {
    setProfesional({ dni: e.target.value });
  };

  const guardarHistoriaClinica = () => {
    const objHistoriaClinica = {
      ...historiaClinicaForm,
      paciente: paciente,
      profesional: profesional,
    };
    if (validateForm(historiaClinicaForm)) {
      fetch(`${url_servidor}historiaClinica`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objHistoriaClinica),
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se guardó la Historia Clínica", {
            variant: "success",
          });
          dispatch(getListaHistoriaClinica());
          setHistoriaClinicaForm(defaultState);
          setPaciente("");
          setProfesional("");
        } else {
          enqueueSnackbar("Error al guardar la Historia Clínica", {
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

  const nuevaHistoriaClinica = () => {
    dispatch(setHistoriaClinica({}));
    setHistoriaClinicaForm(defaultState);
    setPaciente("");
    setProfesional("");
  };

  return (
    <div>
      <Grid container>
        <Grid item lg={9} xs={12} md={7} sm={12} className={classes.headerForm}>
          Crear/Editar Historia Clínica
        </Grid>
        <Grid item lg={3} xs={12} md={5} sm={12} className={classes.buttonForm}>
          <Button
            variant="contained"
            color="default"
            style={{ width: "100%" }}
            onClick={nuevaHistoriaClinica}
          >
            Nueva
          </Button>
        </Grid>
      </Grid>

      <Grid container className={classes.gridForm}>
        <Grid item xs={12}>
          <InputLabel id="diagnostico">Diagnóstico</InputLabel>
          <TextareaAutosize
            id="diagnostico"
            name="diagnostico"
            rowsMax={4}
            className={classes.textArea}
            value={historiaClinicaForm.diagnostico}
            onChange={handleInputChange}
            aria-label="maximum height"
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="tratamiento">Tratamiento</InputLabel>
          <TextareaAutosize
            id="tratamiento"
            name="tratamiento"
            rowsMax={4}
            className={classes.textArea}
            value={historiaClinicaForm.tratamiento}
            onChange={handleInputChange}
            aria-label="maximum height"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Fecha Quirúrgica"
            name="fechaQuirurgica"
            fullWidth
            type="date"
            value={historiaClinicaForm.fechaQuirurgica}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Fecha de Ingreso"
            name="fechaIngreso"
            fullWidth
            type="date"
            value={historiaClinicaForm.fechaIngreso}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Cantidad de Sesiones"
            name="cantidadSesiones"
            fullWidth
            type="number"
            value={historiaClinicaForm.cantidadSesiones}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Fecha de Autorización"
            name="fechaAutorizacion"
            fullWidth
            type="date"
            value={historiaClinicaForm.fechaAutorizacion}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Código de Factura"
            name="cdFacturacion"
            fullWidth
            type="number"
            value={historiaClinicaForm.cdFacturacion}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Código de Validación"
            name="cdValidacion"
            fullWidth
            type="number"
            value={historiaClinicaForm.cdValidacion}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <FormSelect
            name="paciente"
            label="Paciente"
            options={pacientesOptions}
            value={(paciente && paciente.dni) || ""}
            handleChange={handlePaciente}
          />
        </Grid>
        <Grid item xs={12}>
          <FormSelect
            name="profesional"
            label="Profesional"
            options={profesionalesOptions}
            value={(profesional && profesional.dni) || ""}
            handleChange={handleProfesional}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={guardarHistoriaClinica}
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
    paddingTop: 10,
  },
  gridForm: {
    padding: 10,
  },
  textArea: {
    width: "100%",
    maxWidth: "100%",
    minWidth: "100%",
    minHeight: 100,
    maxHeight: 100,
    borderColor: "#c4c4c4",
    borderRadius: 5,
    marginTop: 5,
  },
}));
