import React, { useEffect, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { setUsuario, getListaUsuarios } from "actions/UsuariosActions";

import { useSnackbar } from "notistack";
import { url_servidor } from "Utils/constants";
import { validateForm } from "Utils/functions";

const defaultState = {
  cd_usuario: 0,
  idUsuario: "",
  nombre: "",
  password: "",
  email: "",
};

export default function PacienteForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const usuarioSeleccionado = useSelector((state) => state.usuarios.usuario);

  const [usuario, setUsuarioForm] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ...defaultState,
    }
  );
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioForm({ [name]: value });
  };

  const nuevoUsuario = () => {
    dispatch(setUsuario({}));
    setUsuarioForm(defaultState);
  };

  useEffect(() => {
    if (Object.keys(usuarioSeleccionado).length !== 0) {
      setUsuarioForm(usuarioSeleccionado);
    }
  }, [usuarioSeleccionado]);

  const guardarUsuario = () => {
    const objPlan = { ...usuario, perfil: { cdPerfil: 1, dsPerfil: "" } };
    if (validateForm(usuario)) {
      fetch(`${url_servidor}usuario`, {
        method: usuario.cd_usuario > 0 ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(objPlan),
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se guardó el Usuario", {
            variant: "success",
          });
          dispatch(getListaUsuarios());
          nuevoUsuario();
        } else {
          enqueueSnackbar("Error al guardar el Usuario", {
            variant: "error",
          });
        }
      });
    } else {
      enqueueSnackbar("No puede dejar ningún campo en blanco", {
        variant: "warning",
      });
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item lg={9} xs={12} md={7} sm={12} className={classes.headerForm}>
          Crear/Editar Usuario
        </Grid>
        <Grid item lg={3} xs={12} md={5} sm={12} className={classes.buttonForm}>
          <Button
            variant="contained"
            style={{ width: "100%" }}
            color="default"
            onClick={nuevoUsuario}
          >
            Nuevo
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.gridForm}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Nombre"
            type="text"
            name="nombre"
            fullWidth
            value={usuario.nombre}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Id Usuario"
            name="idUsuario"
            fullWidth
            value={usuario.idUsuario}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            variant="outlined"
            type="password"
            margin="normal"
            label="Contraseña"
            name="password"
            fullWidth
            disabled={usuario.cd_usuario > 0}
            value={usuario.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Email"
            name="email"
            fullWidth
            value={usuario.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={guardarUsuario}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  headerForm: {
    textAlign: "center",
    paddingTop: 20,
  },
  buttonForm: {
    paddingRight: 10,
    paddingTop: 10,
  },
  gridForm: {
    padding: 10,
  },
}));
