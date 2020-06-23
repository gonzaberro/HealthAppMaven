import React, { useState, useEffect } from "react";
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
  const fecha_agenda = useSelector(
    (state) => state.agenda_reducer.fecha_agenda
  );
  const [selectedProfesional, setSelectedProfesional] = useState(1);
  const [selectedNombreProfesional, setSelectedNombreProfesional] = useState(
    ""
  );

  const selectProfesional = (profesional) => {
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
  };

  useEffect(() => {
    if (listaProfesionales[0] !== undefined) {
      selectProfesional(listaProfesionales[0]);
      dispatch(selectProfesionalAgenda(listaProfesionales[0].dni));
    }
  }, [listaProfesionales]);

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
