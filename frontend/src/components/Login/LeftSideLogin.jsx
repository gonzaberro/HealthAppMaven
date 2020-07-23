import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { setLogin } from "../../actions/LoginActions";
import { url_servidor } from "Utils/constants";
import { useSnackbar } from "notistack";
import { refreshToken, calcularTimer } from "Utils/functions";

export default function LeftSideLogin() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("Gunsandrose");
  const [usuario, setUsuario] = useState("gonzalo");

  const gotoLogin = () => {
    validateLogin();
  };

  const validateLogin = () => {
    if (
      password !== undefined &&
      password !== "" &&
      usuario !== undefined &&
      usuario !== ""
    ) {
      fetch(url_servidor + "login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usuario,
          password: password,
        }),
      }).then(function (res) {
        if (res.status === 200) {
          for (var pair of res.headers.entries()) {
            if (pair[0] === "access-token") {
              localStorage.setItem("token", pair[1]);
              localStorage.setItem("usuario", usuario);
              dispatch(setLogin(1)); //Voy a marcar el login
            } else if (pair[0] === "expiration-time") {
              localStorage.setItem("expiration-time", pair[1]);
            }
          }

          setTimeout(() => {
            refreshToken();
          }, calcularTimer());
        } else {
          enqueueSnackbar("Usuario o contraseña incorrectos.", {
            variant: "error",
          });
        }
      });
    } else {
      enqueueSnackbar("No puede dejar campos en blanco.", {
        variant: "warning",
      });
    }
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
            id="demo-simple-select-outlined"
            label="Institución"
            fullWidth
          >
            <MenuItem value={30}>FSINET</MenuItem>
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
