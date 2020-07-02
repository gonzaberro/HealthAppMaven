import React, { useEffect, useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import {
  setHistoriaClinica,
  getListaHistoriaClinica,
  setModalHistoriaClinica,
} from "actions/HistoriaClinicaActions";
import FormSelect from "../../FormSelect";
import { fechaString, validateForm } from "Utils/functions";
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
  const [cirugia, setCirugia] = useState(true);
  const paciente = useSelector((state) => state.buscarTurnos.paciente);
  const [historiaClinicaForm, setHistoriaClinicaForm] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ...defaultState,
    }
  );
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
        return { name: `${p.nombre} ${p.apellido} - ${p.dni}`, value: p.dni };
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
        fechaQuirurgica: fechaString(
          new Date(historiaClinicaSeleccionada.fechaQuirurgica)
        ),
        fechaIngreso: fechaString(
          new Date(historiaClinicaSeleccionada.fechaIngreso)
        ),
        fechaAutorizacion: fechaString(
          new Date(historiaClinicaSeleccionada.fechaAutorizacion)
        ),
      };

      setHistoriaClinicaForm(historiaClinica);

      setProfesional(historiaClinicaSeleccionada.profesional);
      setCirugia(
        historiaClinicaSeleccionada.fechaQuirurgica === null ? false : true
      );
    }
  }, [historiaClinicaSeleccionada]);

  const checkFechaCirugia = (cirugia) => {
    let historiaClinica = historiaClinicaForm;
    if (cirugia) {
      historiaClinica.fechaQuirurgica = fechaString(new Date());
      setHistoriaClinicaForm(historiaClinica);
    }
    setCirugia(cirugia);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cantidadSesiones" && value <= 0) {
      enqueueSnackbar("La cantidad de sesiones debe ser mayor a 0", {
        variant: "warning",
      });
    } else if (name === "cdFacturacion" && value <= 0) {
      enqueueSnackbar("El número de factura debe ser mayor a 0", {
        variant: "warning",
      });
    } else {
      setHistoriaClinicaForm({ [name]: value });
    }
  };

  const handleProfesional = (e) => {
    setProfesional({ dni: e.target.value });
  };

  const guardarHistoriaClinica = () => {
    const objHistoriaClinica = {
      ...historiaClinicaForm,
      paciente: { dni: paciente },
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
          dispatch(getListaHistoriaClinica(paciente));
          nuevaHistoriaClinica();
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
    setProfesional("");
    dispatch(setModalHistoriaClinica(false));
  };

  return (
    <div>
      <Grid container className={classes.gridForm}>
        <Grid item xs={12} md={6} className={classes.gridInputs}>
          <FormSelect
            name="paciente"
            label="Paciente"
            options={pacientesOptions}
            disabled={true}
            value={paciente}
          />
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridInputs}>
          <FormSelect
            name="profesional"
            label="Profesional"
            options={profesionalesOptions}
            value={(profesional && profesional.dni) || ""}
            handleChange={handleProfesional}
          />
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridInputs}>
          <InputLabel id="diagnostico">Diagnóstico</InputLabel>
          <TextareaAutosize
            id="diagnostico"
            name="diagnostico"
            rowsMax={6}
            className={classes.textArea}
            value={historiaClinicaForm.diagnostico}
            onChange={handleInputChange}
            aria-label="maximum height"
          />
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridInputs}>
          <InputLabel id="tratamiento">Tratamiento</InputLabel>
          <TextareaAutosize
            id="tratamiento"
            name="tratamiento"
            rowsMax={6}
            className={classes.textArea}
            value={historiaClinicaForm.tratamiento}
            onChange={handleInputChange}
            aria-label="maximum height"
          />
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridInputs}>
          <Grid container>
            <Grid item xs={6} md={4}>
              <FormControlLabel
                style={{ paddingTop: 20 }}
                control={
                  <Checkbox
                    checked={cirugia}
                    onChange={() => checkFechaCirugia(cirugia ? false : true)}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Fecha de Cirugía"
              />
            </Grid>
            {cirugia ? (
              <Grid item xs={6} md={8}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="fechaQuirurgica"
                  fullWidth
                  type="date"
                  value={historiaClinicaForm.fechaQuirurgica}
                  onChange={handleInputChange}
                />
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridInputs}>
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
        <Grid item xs={12} md={6} className={classes.gridInputs}>
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
        <Grid item xs={12} md={6} className={classes.gridInputs}>
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

        <Grid item xs={12} md={6} className={classes.gridInputs}>
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

        <Grid item xs={12} md={6} className={classes.gridInputs}>
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

        <Grid item xs={6} lg={9} md={7} className={classes.gridInputs}>
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
  },
  buttonForm: {
    paddingTop: 10,
  },
  gridForm: {
    padding: 5,
  },
  textArea: {
    width: "100%",
    maxWidth: "100%",
    minWidth: "100%",
    minHeight: 100,
    maxHeight: 100,
    borderColor: "#c4c4c4",
    borderRadius: 5,
  },
  gridInputs: { paddingLeft: 10, paddingRight: 10 },
}));
