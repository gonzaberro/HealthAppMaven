import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export default function RepetirDiariamente(props) {
  const classes = useStyles();
  const [espacioRepeticion, setEspacioRepeticion] = useState(1);

  const changeEspacioRepeticion = (value) => {
    if (value >= 1) setEspacioRepeticion(value);
  };
  return (
    <>
      {props.opcionRepetir === 1 ? (
        <Grid container>
          <Grid item xs={6}>
            <TextField
              id="espacio_repeticion"
              label={"Repetir Cada " + espacioRepeticion + " dia(s)"}
              type="number"
              value={espacioRepeticion}
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
