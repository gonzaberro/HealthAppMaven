import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField, CircularProgress } from "@material-ui/core";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { setModal } from "actions/ModalActions";
import {
  setProfesional,
  eliminarProfesional,
} from "actions/ProfesionalActions";

import { confirmAlert } from "react-confirm-alert"; // Import
const FilterComponent = ({ filterText, onFilter }) => (
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

const buscarEnTabla = (listaProfesionales, filterText) => {
  return listaProfesionales.filter(
    (profesional) =>
      profesional.dni.toString().includes(filterText.toLowerCase()) ||
      profesional.matricula.includes(filterText.toLowerCase()) ||
      profesional.especialidad.nombre
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      profesional.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      profesional.apellido.toLowerCase().includes(filterText.toLowerCase())
  );
};

export default function TablaProfesional() {
  const listaProfesionales = useSelector(
    (state) => state.profesional.listaProfesionales
  );
  const dispatch = useDispatch();
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  /* DATATABLE */
  const profesionalSeleccionado = useSelector(
    (state) => state.profesional.profesional
  );

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const filteredItems = buscarEnTabla(listaProfesionales, filterText);
  /* FIN STATES DATATABLE */

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (filterText !== "") {
        setRows(filteredItems);
      } else setRows(listaProfesionales);
      setPending(false);
    });
    return () => clearTimeout(timeout);
  }, [listaProfesionales, filterText, filteredItems]);

  /** ROW FILTROS DE TABLA */
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    const nuevoProfesional = () => {
      dispatch(setProfesional({}));
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
            color="default"
            style={{ width: "100%" }}
            onClick={nuevoProfesional}
          >
            Nuevo Profesional
          </Button>
        </Grid>
      </Grid>
    );
  }, [filterText, resetPaginationToggle, dispatch]);
  const deleteProfesional = (row) => {
    confirmAlert({
      title: row.nombre + " " + row.apellido,
      message: "DNI: " + row.dni,
      buttons: [
        {
          label: "Eliminar",
          onClick: () => dispatch(eliminarProfesional(row.dni)),
        },
        {
          label: "Cancelar",
        },
      ],
    });
  };

  const selectProfesional = (row) => {
    dispatch(setProfesional(row));
    dispatch(setModal(true));
  };

  const columns = [
    {
      name: "Nombre",
      cell: (row) => <div>{row.nombre + " " + row.apellido}</div>,
      sortable: true,
      selector: "nombre",
    },
    {
      name: "Especialidad",
      cell: (row) => <div>{row.especialidad.nombre}</div>,
      sortable: true,
      selector: "especialidad.nombre",
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
      cell: (row) => (
        <Button
          variant="contained"
          color="primary"
          button
          onClick={() => selectProfesional(row)}
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
          onClick={() => deleteProfesional(row)}
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
      when: (row) => row.dni === profesionalSeleccionado.dni,
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
