import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  setHistoriaClinica,
  cleanHistoriaClinica,
} from "actions/HistoriaClinicaActions";
import { getListaProfesionales } from "actions/ProfesionalActions";
import { getListaPacientes } from "actions/PacienteActions";
import TablaPacientes from "../BuscarTurno/TablaPacientes";
import HeaderListaHistoriaClinica from "./HeaderListaHistoriaClinica";
import ListaHistoriaClinica from "./ListaHistoriaClinica";
import { useDispatch, useSelector } from "react-redux";
import HistoriaClinicaForm from "./HistoriaClinicaForm";
import { setBuscarPaciente } from "actions/BuscarTurnosActions";
import Modal from "@material-ui/core/Modal";
import { setModal } from "actions/ModalActions";

export default function HistoriaClinica() {
  const dispatch = useDispatch();
  const open_modal = useSelector((state) => state.modalReducer.open_modal);

  useEffect(() => {
    dispatch(getListaProfesionales());
    dispatch(getListaPacientes());
    dispatch(setBuscarPaciente(0));
    dispatch(cleanHistoriaClinica());
  }, [dispatch]);

  const handleClose = () => {
    dispatch(setModal(false));
    dispatch(setHistoriaClinica({}));
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ height: "95vh" }}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <TablaPacientes />
            </Grid>

            <Grid
              item
              xs={12}
              md={9}
              style={{ height: "95vh", borderLeft: "1px solid #ccc" }}
            >
              <HeaderListaHistoriaClinica />
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
        style={{ zIndex: 11000 }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            margin: 20,
            minHeight: "50vh",
          }}
        >
          <HistoriaClinicaForm />
        </div>
      </Modal>
    </>
  );
}
