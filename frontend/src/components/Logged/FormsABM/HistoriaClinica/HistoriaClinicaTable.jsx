import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setHistoriaClinica,
  eliminarHistoriaClinica,
} from "actions/HistoriaClinicaActions";
import { formatDateString } from "Utils/functions";
import { confirmAlert } from "react-confirm-alert"; // Import

const Circular = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

const deleteHistoriaClinica = (id) => {
  return (dispatch) => {
    confirmAlert({
      title: `¿Eliminar Historia Clínica ID: ${id}?`,
      message: "",
      buttons: [
        {
          label: "Confirmar",
          onClick: () => dispatch(eliminarHistoriaClinica(id)),
        },
        {
          label: "Cancelar",
        },
      ],
    });
  };
};

const editHistoriaClinica = (historiaClinica) => {
  return (dispatch) => {
    dispatch(setHistoriaClinica(historiaClinica));
  };
};

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
const paginationOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

const buscarHistoriaClinica = (listaHistoriaClinica, filterText) => {
  return listaHistoriaClinica.filter(
    (item) =>
      item.paciente.apellido.toLowerCase().includes(filterText.toLowerCase()) ||
      item.paciente.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      item.paciente.dni.toString().includes(filterText.toLowerCase()) ||
      item.profesional.dni.toString().includes(filterText.toLowerCase()) ||
      item.profesional.nombre
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      item.profesional.apellido.toLowerCase().includes(filterText.toLowerCase())
  );
};

export default function HistoriaClinicaTable() {
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const dispatch = useDispatch();

  const listaHistoriaClinica = useSelector(
    (state) => state.historiaClinica.listaHistoriaClinica
  );

  /* DATATABLE */

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const filteredItems = buscarHistoriaClinica(listaHistoriaClinica, filterText);
  /* FIN STATES DATATABLE */
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (filterText !== "") {
        setRows(filteredItems);
      } else setRows(listaHistoriaClinica);
      setPending(false);
    });
    return () => clearTimeout(timeout);
  }, [listaHistoriaClinica, filterText, filteredItems]);

  /** COLUMNAS DE LA TABLA */
  const columns = [
    {
      name: "Fecha Ingreso",
      cell: (row) => <div>{formatDateString(new Date(row.fechaIngreso))}</div>,
      sortable: true,
      selector: "fechaIngreso",
    },
    {
      name: "Fecha Quirurgica",
      cell: (row) => (
        <div>{formatDateString(new Date(row.fechaQuirurgica))}</div>
      ),
      sortable: true,
      selector: "fechaQuirurgica",
    },
    {
      name: "Fecha Autorización",
      cell: (row) => (
        <div>{formatDateString(new Date(row.fechaAutorizacion))}</div>
      ),
      sortable: true,
      selector: "fechaAutorizacion",
    },
    {
      name: "Cantidad Sesiones",
      selector: "cantidadSesiones",
      sortable: true,
    },
    {
      name: "Paciente",
      cell: (row) => (
        <div>
          {row.paciente.nombre} {row.paciente.apellido}
        </div>
      ),
      sortable: true,
      selector: "paciente.nombre",
    },
    {
      name: "Profesional",
      cell: (row) => (
        <div>
          {row.profesional.nombre} {row.profesional.apellido}
        </div>
      ),
      selector: "profesional.nombre",
      sortable: true,
    },
    {
      cell: (row) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(editHistoriaClinica(row))}
          button
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
          onClick={() =>
            dispatch(deleteHistoriaClinica(row.id_historia_clinica))
          }
          color="primary"
          button
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

  /** ROW FILTROS DE TABLA */
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <Grid container>
        <Grid item md={3} lg={3} sm={6} xs={12}>
          <FilterComponent
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        </Grid>
      </Grid>
    );
  }, [filterText, resetPaginationToggle]);
  /** FIN FILTROS TABLA */

  return (
    <>
      <DataTable
        columns={columns}
        highlightOnHover
        data={rows}
        progressPending={pending}
        progressComponent={<Circular />}
        persistTableHead
        pagination
        fixedHeader
        fixedHeaderScrollHeight="250px"
        noHeader={true}
        subHeader
        striped={true}
        pointerOnHover={true}
        subHeaderComponent={subHeaderComponentMemo}
        paginationComponentOptions={paginationOptions}
      />
    </>
  );
}

const useStyles = makeStyles((theme) => ({}));
