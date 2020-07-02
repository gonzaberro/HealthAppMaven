import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  getListaHistoriaClinica,
  setModalHistoriaClinica,
} from "actions/HistoriaClinicaActions";
import { getListaProfesionales } from "actions/ProfesionalActions";
import { getListaPacientes } from "actions/PacienteActions";
import TablaPacientes from "../../BuscarTurno/TablaPacientes";
import ListaHistoriaClinica from "./ListaHistoriaClinica";
import { useDispatch, useSelector } from "react-redux";
import HistoriaClinicaForm from "./HistoriaClinicaForm";
import { setBuscarPaciente } from "actions/BuscarTurnosActions";
import Modal from "@material-ui/core/Modal";

export default function HistoriaClinica() {
  const dispatch = useDispatch();
  const open_modal = useSelector((state) => state.historiaClinica.open_modal);
  useEffect(() => {
    dispatch(getListaHistoriaClinica());
    dispatch(getListaProfesionales());
    dispatch(getListaPacientes());
    dispatch(setBuscarPaciente(0));
  }, [dispatch]);

  const handleClose = () => {
    dispatch(setModalHistoriaClinica(false));
  };

  return (
    <>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12} style={{ height: "100vh" }}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <TablaPacientes />
            </Grid>

            <Grid
              item
              xs={12}
              md={9}
              style={{ height: "100vh", borderLeft: "1px solid #ccc" }}
            >
              <ListaHistoriaClinica />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={open_modal ? true : false}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={{ backgroundColor: "#fff", margin: 20, height: "50vh" }}>
          {" "}
          <HistoriaClinicaForm />
        </div>
      </Modal>
    </>
  );
}
