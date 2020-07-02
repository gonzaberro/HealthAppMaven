import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField, CircularProgress } from "@material-ui/core";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
  setBuscarProfesional,
  buscarTurnosProfesinal,
} from "actions/BuscarTurnosActions";
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
  const buscarInfo = useSelector((state) => state.buscarTurnos);
  const listaProfesionales = useSelector(
    (state) => state.profesional.listaProfesionales
  );
  const dispatch = useDispatch();
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  /* DATATABLE */

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

  useEffect(() => {
    if (buscarInfo.profesional !== 0) {
      dispatch(
        buscarTurnosProfesinal(buscarInfo.profesional, buscarInfo.actuales)
      );
    }
  }, [dispatch, buscarInfo.actuales, buscarInfo.profesional]);

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
  const seleccionarProfesional = (row) => {
    dispatch(setBuscarProfesional(row.dni, buscarInfo.actuales));
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
      name: "Matricula",
      sortable: true,
      selector: "matricula",
    },
    {
      cell: (row) => (
        <Button
          variant="contained"
          color="primary"
          button
          onClick={() => seleccionarProfesional(row)}
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
      when: (row) => row.dni === buscarInfo.profesional,
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
