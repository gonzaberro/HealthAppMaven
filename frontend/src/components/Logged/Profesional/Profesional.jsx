import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
  getListaProfesionales,
  setProfesional,
} from "actions/ProfesionalActions";
import { getListaEspecialidad } from "actions/EspecialidadActions";
import ProfesionalTable from "./ProfesionalTable";
import ProfesionalForm from "./ProfesionalForm";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import { setModal } from "actions/ModalActions";

export default function Profesional() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open_modal = useSelector((state) => state.modalReducer.open_modal);

  useEffect(() => {
    dispatch(getListaProfesionales());
    dispatch(getListaEspecialidad());
  }, [dispatch]);

  const handleClose = () => {
    dispatch(setProfesional({}));
    dispatch(setModal(false));
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.lista}>
          <ProfesionalTable />
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
          <ProfesionalForm />
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
    maxHeight: "95vh",
    overflowY: "auto",
    borderRight: "1px solid #e4e4e4",
  },
}));
