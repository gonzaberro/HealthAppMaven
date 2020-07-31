import { setLogin } from "../../actions/LoginActions";
import { url_servidor } from "Utils/constants";
import { setLocalStorage } from "Utils/functions";

export const validarLogin = (
  usuario,
  password,
  prestadora,
  dispatch,
  enqueueSnackbar
) => {
  fetch(url_servidor + "login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: usuario,
      password: password,
    }),
  }).then(function (res) {
    if (res.status === 200) {
      localStorage.setItem("usuario", usuario);
      localStorage.setItem("prestadora", JSON.stringify(prestadora));

      setLocalStorage(res.headers.entries());
      dispatch(setLogin(1)); //Voy a marcar el login
    } else {
      enqueueSnackbar("Usuario o contraseña incorrectos.", {
        variant: "error",
      });
    }
  });
};
