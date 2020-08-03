import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField, CircularProgress } from "@material-ui/core";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { setBuscarPaciente } from "actions/BuscarTurnosActions";

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

  const dispatch = useDispatch();
  /* DATATABLE */

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const filteredItems = buscarEnTabla(listaPacientes, filterText);
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
  const seleccionarPaciente = (row) => {
    dispatch(setBuscarPaciente(row.dni, buscarInfo.actuales));
  };
  const columns = [
    {
      name: "Nombre",
      cell: (row) => <div>{row.nombre + " " + row.apellido}</div>,
      sortable: true,
      selector: "nombre",
    },

    {
      name: "DNI",
      sortable: true,
      selector: "dni",
    },
    {
      cell: (row) => (
        <Button
          variant="contained"
          color="primary"
          button
          onClick={() => seleccionarPaciente(row)}
        >
          <FontAwesomeIcon icon={faEye} />
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
      when: (row) => row.dni === buscarInfo.paciente,
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
