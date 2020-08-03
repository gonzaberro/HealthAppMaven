import React, { useEffect, useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { setUsuario, getListaUsuarios } from "actions/UsuariosActions";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { url_servidor, error_generico } from "Utils/constants";
import { validateForm } from "Utils/functions";
import { ERROR_MESSAGE } from "actions/types";
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
  const [perfil, setPerfil] = useState(0);
  const usuarioSeleccionado = useSelector((state) => state.usuarios.usuario);
  const listaPerfiles = useSelector((state) => state.perfil.listaPerfiles);

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
    setPerfil(0);
  };

  useEffect(() => {
    if (Object.keys(usuarioSeleccionado).length !== 0) {
      setUsuarioForm(usuarioSeleccionado);
      setPerfil(usuarioSeleccionado.perfil.cdPerfil);
    }
  }, [usuarioSeleccionado]);

  const guardarUsuario = () => {
    const objPlan = { ...usuario, perfil: { cdPerfil: perfil, dsPerfil: "" } };
    if (validateForm(usuario) && perfil > 0) {
      fetch(`${url_servidor}usuario`, {
        method: usuario.cd_usuario > 0 ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(objPlan),
      })
        .then(function (response) {
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
        })
        .catch(() => {
          dispatch({
            type: ERROR_MESSAGE,
            payload: {
              message: error_generico,
              tipo: "error",
            },
          });
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
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Perfil
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Perfil"
              fullWidth
              value={perfil}
              onChange={(event) => setPerfil(event.target.value)}
            >
              {listaPerfiles &&
                listaPerfiles.map((perfil) => {
                  return (
                    <MenuItem value={perfil.cdPerfil}>
                      {perfil.dsPerfil}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
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
