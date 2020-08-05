import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getListaPacientes, setPaciente } from "actions/PacienteActions";
import { getListaPlanes } from "actions/PlanActions";
import PacienteTable from "./PacienteTable";
import PacienteForm from "./PacienteForm";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "actions/ModalActions";
import Modal from "@material-ui/core/Modal";

export default function Paciente() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open_modal = useSelector((state) => state.modalReducer.open_modal);

  useEffect(() => {
    dispatch(getListaPacientes());
    dispatch(getListaPlanes());
  }, [dispatch]);

  const handleClose = () => {
    dispatch(setPaciente({}));
    dispatch(setModal(false));
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.lista}>
          <PacienteTable />
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
          <PacienteForm />
        </div>
      </Modal>
    </>
  );
}
const useStyles = makeStyles(() => ({
  borderForm: {
    height: "100%",
  },
  lista: {
    maxHeight: "100vh",
    overflowY: "auto",
    borderRight: "1px solid #e4e4e4",
  },
}));
