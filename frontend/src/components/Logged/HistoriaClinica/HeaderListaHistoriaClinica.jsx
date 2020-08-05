import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { buscarTurnosProfesinal } from "actions/BuscarTurnosActions";
import { useDispatch, useSelector } from "react-redux";
import { especialidadesPaciente } from "actions/EspecialidadActions";
import {
  getListaHistoriaClinica,
  setHistoriaClinica,
} from "actions/HistoriaClinicaActions";
import { setEspecialidad } from "actions/EspecialidadActions";
import { setModal } from "actions/ModalActions";

export default function HeaderListaHistoriaClinica() {
  const [especialidadSeleccionada, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const listaEspecialidades = useSelector(
    (state) => state.especialidad.listaEspecialidades
  );
  const paciente = useSelector((state) => state.buscarTurnos.paciente);

  useEffect(() => {
    dispatch(
      setEspecialidad({
        cd_especialidad: especialidadSeleccionada,
        nombre: "",
      })
    );
    setValue(especialidadSeleccionada);
    dispatch(getListaHistoriaClinica(paciente, especialidadSeleccionada));
    dispatch(especialidadesPaciente(paciente));
  }, [dispatch, paciente, especialidadSeleccionada]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(buscarTurnosProfesinal(0, 1));
  };

  const createTabs = () => {
    return listaEspecialidades.map((especialidad) => {
      return (
        <Tab
          key={especialidad.cd_especialidad}
          label={especialidad.nombre}
          value={especialidad.cd_especialidad}
        />
      );
    });
  };
  const nuevaHistoriaClinica = () => {
    dispatch(setHistoriaClinica({}));
    dispatch(setModal(true));
  };

  return (
    <div style={{ height: "10vh" }}>
      <Grid container style={{ margin: 10, marginRight: 20 }}>
        <Grid item md={8} sm={4} xs={12}></Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={paciente ? false : true}
            style={{ width: "100%" }}
            onClick={() => nuevaHistoriaClinica()}
          >
            Nueva Historia Clínica
          </Button>
        </Grid>
        <Grid item md={1} sm={2} xs={12}></Grid>
      </Grid>
      <Paper square>
        <Tabs
          value={especialidadSeleccionada}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          {listaEspecialidades.length && paciente !== 0 ? (
            <Tab key={0} label="Todas" value={0} />
          ) : (
            ""
          )}
          {listaEspecialidades.length && paciente !== 0 ? createTabs() : ""}
        </Tabs>
      </Paper>
    </div>
  );
}
