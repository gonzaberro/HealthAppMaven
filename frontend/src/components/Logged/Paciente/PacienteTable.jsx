import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField, CircularProgress } from "@material-ui/core";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getPacientes } from "actions/BuscarTurnosActions";
import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import { setPaciente, eliminarPaciente } from "actions/PacienteActions";
import { setModal } from "actions/ModalActions";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Buscar..."
      value={filterText}
      onChange={onFilter}
    />
  </>
);

const Circular = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

const buscarEnTabla = (listaPacientes, filterText) => {
  return listaPacientes.filter(
    (paciente) =>
      paciente.dni.toString().includes(filterText.toLowerCase()) ||
      paciente.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      paciente.apellido.toLowerCase().includes(filterText.toLowerCase())
  );
};

export default function TablaPaciente() {
  const buscarInfo = useSelector((state) => state.buscarTurnos);
  const listaPacientes = useSelector((state) => state.paciente.listaPacientes);
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  const pacienteSeleccionado = useSelector((state) => state.paciente.paciente);
  const dispatch = useDispatch();
  /* DATATABLE */

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const filteredItems = buscarEnTabla(listaPacientes, filterText);

  const deletePaciente = (row) => {
    confirmAlert({
      title: row.nombre + " " + row.apellido,
      message: "DNI: " + row.dni,
      buttons: [
        {
          label: "Eliminar",
          onClick: () => dispatch(eliminarPaciente(row.dni)),
        },
        {
          label: "Cancelar",
        },
      ],
    });
  };

  /* FIN STATES DATATABLE */

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (filterText !== "") {
        setRows(filteredItems);
      } else setRows(listaPacientes);
      setPending(false);
    });
    return () => clearTimeout(timeout);
  }, [listaPacientes, filterText, filteredItems]);

  useEffect(() => {
    if (buscarInfo.paciente !== 0) {
      dispatch(getPacientes(buscarInfo.paciente, buscarInfo.actuales));
    }
  }, [dispatch, buscarInfo.actuales, buscarInfo.paciente]);

  /** ROW FILTROS DE TABLA */
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    const nuevoPaciente = () => {
      dispatch(setPaciente({}));
      dispatch(setModal(true));
    };

    return (
      <Grid container>
        <Grid item md={8} lg={8} sm={6} xs={6}>
          <FilterComponent
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        </Grid>
        <Grid item md={4} lg={4} sm={6} xs={6}>
          <Button
            variant="contained"
            style={{ width: "100%" }}
            color="default"
            onClick={nuevoPaciente}
          >
            Nuevo Paciente
          </Button>
        </Grid>
      </Grid>
    );
  }, [filterText, resetPaginationToggle, dispatch]);
  /** FIN FILTROS TABLA */

  const selectPaciente = (row) => {
    dispatch(setPaciente(row));
    dispatch(setModal(true));
  };

  const columns = [
    {
      name: "DNI",
      sortable: true,
      selector: "dni",
    },
    {
      name: "Nombre",
      cell: (row) => <div>{row.nombre + " " + row.apellido}</div>,
      sortable: true,
      selector: "nombre",
    },

    {
      name: "Dirección",
      sortable: true,
      selector: "direccion",
    },
    {
      name: "Teléfono",
      sortable: true,
      selector: "telefono",
    },
    {
      name: "Email",
      sortable: true,
      selector: "email",
    },
    {
      name: "Obra Social",
      cell: (row) => (
        <div>
          {row.plan.obraSocial.nombre.toUpperCase() + " - " + row.plan.nombre}
        </div>
      ),
      sortable: true,
    },
    {
      cell: (row) => (
        <Button
          variant="contained"
          color="primary"
          button
          onClick={() => selectPaciente(row)}
        >
          <FontAwesomeIcon icon={faEye} />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) => (
        <Button
          variant="contained"
          color="primary"
          button
          onClick={() => deletePaciente(row)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  /** FIN COLUMNAS DE TABLA */

  const conditionalRowStyles = [
    {
      when: (row) => row.dni === pacienteSeleccionado.dni,
      style: {
        color: "#162996",
        borderBottom: "2px solid #4051b5 !important",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  return (
    <DataTable
      noHeader={true}
      columns={columns}
      subHeader
      progressPending={pending}
      progressComponent={<Circular />}
      pointerOnHover={true}
      subHeaderComponent={subHeaderComponentMemo}
      data={rows}
      conditionalRowStyles={conditionalRowStyles}
    />
  );
}

const useStyles = makeStyles((theme) => ({}));
