import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { useDispatch, useSelector } from "react-redux";

import { useSnackbar } from "notistack";
import { getPrestadoras } from "actions/PrestadoraActions";
import { validarLogin } from "components/Login/LoginFunctions";

export default function LeftSideLogin() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("Gunsandrose");
  const [usuario, setUsuario] = useState("gonzalo");
  const prestadoras = useSelector((state) => state.prestadora.listaPrestadoras);
  const [prestadora, selectPrestadora] = useState(0);

  const gotoLogin = () => {
    validateLogin();
  };

  useEffect(() => {
    dispatch(getPrestadoras());
  }, [dispatch]);

  const validateLogin = () => {
    if (password !== "" && usuario !== "" && prestadora.cd_prestadora > 0) {
      validarLogin(usuario, password, prestadora, dispatch, enqueueSnackbar);
    } else {
      enqueueSnackbar("No puede dejar campos en blanco.", {
        variant: "warning",
      });
    }
  };

  const changePrestadora = (cd_prestadora) => {
    const prestadoraSeleccionada = prestadoras.find((prestadora) => {
      return prestadora.cd_prestadora === cd_prestadora;
    });

    selectPrestadora(prestadoraSeleccionada);
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar} style={{ backgroundColor: "#de3444" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Ingresar
      </Typography>
      <div className={classes.form}>
        <FormControl
          variant="outlined"
          fullWidth
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Institución
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            label="Institución"
            fullWidth
            value={prestadora.cd_prestadora}
            onChange={(event) => changePrestadora(event.target.value)}
          >
            {prestadoras.map((prestadora) => {
              return (
                <MenuItem
                  key={prestadora.cd_prestadora}
                  name={prestadora.nombre}
                  value={prestadora.cd_prestadora}
                >
                  {prestadora.nombre}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="usuario"
          label="Usuario"
          name="usuario"
          value={usuario}
          onChange={(event) => setUsuario(event.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button
          type="button"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={gotoLogin}
          style={{ backgroundColor: "#de3444" }}
        >
          Ingresar
        </Button>
        <Grid container style={{ display: "none" }}>
          <Grid item xs>
            <Link href="#" variant="body2" className={classes.colorText}>
              Olvidó la contraseña?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" className={classes.colorText}>
              {"No tiene usuario? Registrese"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "url(" + require("../../imagenes/fondo.png") + ")",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  colorText: {
    color: "#de3444",
  },
  colorBorder: {
    borderColor: theme.palette.secondary.main + " !important",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    paddingLeft: "15%",
    paddingRight: "15%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
