import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField, CircularProgress } from "@material-ui/core";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert"; // Import
import { setUsuario, eliminarUsuario } from "actions/UsuariosActions";

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

const buscarEnTabla = (listaUsuarios, filterText) => {
  return listaUsuarios.filter(
    (usuario) =>
      usuario.email.toString().includes(filterText.toLowerCase()) ||
      usuario.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      usuario.idUsuario.toLowerCase().includes(filterText.toLowerCase()) ||
      usuario.perfil.dsPerfil.toLowerCase().includes(filterText.toLowerCase())
  );
};

export default function TablaUsuarios() {
  const classes = useStyles();

  const listaUsuarios = useSelector((state) => state.usuarios.listaUsuarios);
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  const usuarioSeleccionado = useSelector((state) => state.usuarios.usuario);
  const dispatch = useDispatch();
  /* DATATABLE */

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const filteredItems = buscarEnTabla(listaUsuarios, filterText);

  /* FIN STATES DATATABLE */

  const deleteUsuario = (row) => {
    confirmAlert({
      title: "Usuario:" + row.idUsuario,
      message: "Nombre: " + row.nombre,
      buttons: [
        {
          label: "Eliminar",
          onClick: () => dispatch(eliminarUsuario(row.cd_usuario)),
        },
        {
          label: "Cancelar",
        },
      ],
    });
  };
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (filterText !== "") {
        setRows(filteredItems);
      } else setRows(listaUsuarios);
      setPending(false);
    });
    return () => clearTimeout(timeout);
  }, [listaUsuarios, filterText, filteredItems]);

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

  const columns = [
    {
      name: "Código Usuario",
      sortable: true,
      selector: "cd_usuario",
    },
    {
      name: "Id Usuario",
      sortable: true,
      selector: "idUsuario",
    },

    {
      name: "Nombre",
      sortable: true,
      selector: "nombre",
    },
    {
      name: "Email",
      sortable: true,
      selector: "email",
    },
    {
      name: "Perfil",
      cell: (row) => (
        <div className={classes.TagPerfil}>{row.perfil.dsPerfil}</div>
      ),
      sortable: true,
    },

    {
      cell: (row) => (
        <Button
          variant="contained"
          color="primary"
          button
          onClick={() => dispatch(setUsuario(row))}
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
          onClick={() => deleteUsuario(row)}
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
      when: (row) => row.cd_usuario === usuarioSeleccionado.cd_usuario,
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

const useStyles = makeStyles((theme) => ({
  TagPerfil: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#1fc51f",
    color: "#fff",
    borderRadius: 5,
    padding: 5,
    fontWeight: "bold",
  },
}));
