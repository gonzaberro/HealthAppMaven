import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

export default function RepetirSemanalmente(props) {
  const classes = useStyles();
  const [diasSeleccionados, setDiasSeleccionados] = useState([
    { dia: 0, seleccionado: false }, //Domingo
    { dia: 1, seleccionado: false }, //Lunes
    { dia: 2, seleccionado: false }, //Martes
    { dia: 3, seleccionado: false }, //Miercoles
    { dia: 4, seleccionado: false }, //jueves
    { dia: 5, seleccionado: false }, //Viernes
    { dia: 6, seleccionado: false }, //Sabado
  ]);
  const [espacioRepeticion, setEspacioRepeticion] = useState(1);

  const cambiarDiaSeleccionado = (dia_changed) => {
    let aux_dias = [...diasSeleccionados];

    aux_dias[dia_changed] = {
      ...aux_dias[dia_changed],
      seleccionado: aux_dias[dia_changed].seleccionado ? false : true,
    };

    setDiasSeleccionados(aux_dias);
  };
  const changeEspacioRepeticion = (value) => {
    if (value >= 1) setEspacioRepeticion(value);
  };

  return (
    <>
      {props.opcionRepetir === 2 ? (
        <>
          <Grid container>
            <Grid xs={6}>
              <TextField
                id="espacio_repeticion"
                label={"Repetir Cada " + espacioRepeticion + " semana(s)"}
                type="number"
                defaultValue={new Date()}
                variant="outlined"
                className={classes.formControl}
                onChange={(event) =>
                  changeEspacioRepeticion(event.target.value)
                }
                value={espacioRepeticion}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                id="cantidad_repeticiones"
                label="Cantidad de Repeticiones"
                type="number"
                defaultValue={new Date()}
                variant="outlined"
                className={classes.formControl}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} md={12} sm={12} item style={{ textAlign: "center" }}>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() => cambiarDiaSeleccionado(1)}
                  className={
                    diasSeleccionados[1].seleccionado
                      ? classes.buttonSeleccionado
                      : null
                  }
                >
                  Lun
                </Button>
                <Button
                  onClick={() => cambiarDiaSeleccionado(2)}
                  className={
                    diasSeleccionados[2].seleccionado
                      ? classes.buttonSeleccionado
                      : null
                  }
                >
                  Mar
                </Button>
                <Button
                  onClick={() => cambiarDiaSeleccionado(3)}
                  className={
                    diasSeleccionados[3].seleccionado
                      ? classes.buttonSeleccionado
                      : null
                  }
                >
                  Mié
                </Button>
                <Button
                  onClick={() => cambiarDiaSeleccionado(4)}
                  className={
                    diasSeleccionados[4].seleccionado
                      ? classes.buttonSeleccionado
                      : null
                  }
                >
                  Jue
                </Button>
                <Button
                  onClick={() => cambiarDiaSeleccionado(5)}
                  className={
                    diasSeleccionados[5].seleccionado
                      ? classes.buttonSeleccionado
                      : null
                  }
                >
                  Vie
                </Button>
                <Button
                  onClick={() => cambiarDiaSeleccionado(6)}
                  className={
                    diasSeleccionados[6].seleccionado
                      ? classes.buttonSeleccionado
                      : null
                  }
                >
                  Sáb
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </>
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
  buttonSeleccionado: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
    },
  },
  custom_hover: {
    color: theme.palette.primary.main,
  },
  gridContainer: { border: "1px solid #ccc", padding: 30, paddingTop: 0 },
}));
