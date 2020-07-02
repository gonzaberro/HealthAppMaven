import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { setRepetir, setCantidad } from "actions/ProgramarAgendaActions";
import { useDispatch, useSelector } from "react-redux";
export default function RepetirDiariamente(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const programarAgenda = useSelector((state) => state.programarAgenda);

  const changeEspacioRepeticion = (value) => {
    if (value >= 1) dispatch(setRepetir(value));
  };

  const changeCantidadRepeticion = (value) => {
    if (value >= 1) dispatch(setCantidad(value));
  };

  return (
    <>
      {props.opcionRepetir === 1 ? (
        <Grid container>
          <Grid item xs={6}>
            <TextField
              id="espacio_repeticion"
              label={"Repetir Cada " + programarAgenda.repetir + " dia(s)"}
              type="number"
              value={programarAgenda.repetir}
              onChange={(event) => changeEspacioRepeticion(event.target.value)}
              variant="outlined"
              className={classes.formControl}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cantidad_repeticiones"
              label="Cantidad de Repeticiones"
              type="number"
              variant="outlined"
              value={programarAgenda.cantidad}
              onChange={(event) => changeCantidadRepeticion(event.target.value)}
              className={classes.formControl}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 10,
    width: "90%",
  },
  container: {
    margin: 10,
    marginRight: 0,
    paddingRight: 0,
    width: "100%",
  },
  textField: {
    width: "100%",
  },
  spanRepetir: {
    paddingTop: 20,
  },
  checkBoxContainer: { margin: 10, color: "#0000008a" },
  textArea: {
    width: "100%",
    minHeight: 100,
    maxHeight: 100,
    borderColor: "#c4c4c4",
    borderRadius: 5,
    marginTop: 5,
  },

  gridContainer: { border: "1px solid #ccc", padding: 30, paddingTop: 0 },
}));
