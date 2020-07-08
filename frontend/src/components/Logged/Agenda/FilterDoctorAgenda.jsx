import React, { useState, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { useSelector } from "react-redux";
import { selectProfesionalAgenda, getTurnos } from "actions/AgendaActions";
import { useDispatch } from "react-redux";
import { fechaString } from "Utils/functions";

export default function FilterDoctorAgenda() {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const dispatch = useDispatch();
  const listaProfesionales = useSelector(
    (state) => state.profesional.listaProfesionales
  );
  const profesional_seleccionado = useSelector(
    (state) => state.agenda_reducer.profesional_seleccionado
  ); //Profesional seleccionado en header de los calendarios
  const fecha_agenda = useSelector(
    (state) => state.agenda_reducer.fecha_agenda
  );
  const [selectedProfesional, setSelectedProfesional] = useState(1);
  const [selectedNombreProfesional, setSelectedNombreProfesional] = useState(
    ""
  );

  const selectProfesional = useCallback(
    (profesional) => {
      setSelectedProfesional(profesional.dni);
      setSelectedNombreProfesional(
        profesional.nombre +
          " " +
          profesional.apellido +
          " (" +
          profesional.especialidad.nombre +
          ")"
      );
      dispatch(selectProfesionalAgenda(profesional.dni));
      dispatch(getTurnos(fechaString(fecha_agenda), profesional.dni));
      setOpen(false);
    },
    [dispatch, fecha_agenda]
  );

  useEffect(() => {
    if (listaProfesionales[0] !== undefined) {
      if (profesional_seleccionado === "") {
        selectProfesional(listaProfesionales[0]);
        dispatch(selectProfesionalAgenda(listaProfesionales[0].dni));
      } else {
        let profesional = listaProfesionales.filter((profesional) => {
          return profesional.dni === profesional_seleccionado;
        })[0]; //Busco el objeto profesional seleccionado

        selectProfesional(profesional);
        dispatch(selectProfesionalAgenda(profesional_seleccionado));
      }
    }
  }, [
    listaProfesionales,
    selectProfesional,
    dispatch,
    profesional_seleccionado,
  ]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        color="default"
        fullWidth
        ref={anchorRef}
        aria-label="split button"
      >
        <Button>{selectedNombreProfesional}</Button>
        <Button
          color="default"
          size="small"
          style={{ width: 20 }}
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        fullWidth
        style={{ zIndex: 1000 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {listaProfesionales.map((profesional, index) => (
                    <MenuItem
                      selected={profesional.dni === selectedProfesional}
                      onClick={() => selectProfesional(profesional)}
                    >
                      {profesional.nombre} {profesional.apellido} (
                      {profesional.especialidad.nombre})
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
