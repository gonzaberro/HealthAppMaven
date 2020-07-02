import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import TablaProfesional from "./TablaProfesional";
import TablaPacientes from "./TablaPacientes";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { buscarTurnosProfesinal } from "actions/BuscarTurnosActions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { BUSCAR_ACTUALES } from "actions/types";

export default function BuscarTurnoTabla() {
  const buscarActivos = useSelector((state) => state.buscarTurnos.actuales);
  const [tabSeleccionada, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(buscarTurnosProfesinal(0, 1));
  };

  return (
    <div style={{ height: "100%" }}>
      <Grid container>
        <Grid item lg={8}>
          <Paper square>
            <Tabs
              value={tabSeleccionada}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
            >
              <Tab label="Profesional" />
              <Tab label="Paciente" />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item lg={4}>
          <FormControlLabel
            className={classes.checkBoxContainer}
            control={
              <Checkbox
                checked={buscarActivos === 1 ? true : false}
                onChange={() =>
                  dispatch({
                    type: BUSCAR_ACTUALES,
                    payload: buscarActivos === 0 ? 1 : 0,
                  })
                }
                name="checkedB"
                color="primary"
              />
            }
            label="Solo Activos"
          />
        </Grid>
      </Grid>
      {tabSeleccionada === 0 ? <TablaProfesional /> : <TablaPacientes />}
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  checkBoxContainer: {
    margin: 10,
    color: "#0000008a",
    width: "100%",
  },
}));
