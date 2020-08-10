import { url_servidor, error_generico } from "Utils/constants";
import { parse, differenceInSeconds } from "date-fns";
import { setLogin } from "actions/LoginActions";
import { closeSession } from "components/Logged/Menu/MenuFunctions";
import { ERROR_MESSAGE } from "actions/types";

export function parseISOString(s, format) {
  let b = s.split(/\D+/);
  const date = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  return format !== undefined && format === 2
    ? fechaStringFormat2(date)
    : fechaString(date);
}

export const fechaString = (date) => {
  const ye = new Intl.DateTimeFormat("es", { year: "numeric" }).format(date);
  const mo = new Intl.DateTimeFormat("es", { month: "2-digit" }).format(date);
  const da = new Intl.DateTimeFormat("es", { day: "2-digit" }).format(date);
  return ye + "-" + mo + "-" + da;
};

export const fechaStringFormat2 = (date) => {
  const ye = new Intl.DateTimeFormat("es", { year: "numeric" }).format(date);
  const mo = new Intl.DateTimeFormat("es", { month: "2-digit" }).format(date);
  const da = new Intl.DateTimeFormat("es", { day: "2-digit" }).format(date);
  return da + "/" + mo + "/" + ye;
};

export const validateForm = (object) => {
  const arrPro = Object.values(object);
  const hayCamposVacios = arrPro.some((field) => field === "");

  return !hayCamposVacios;
};

export const formatDateString = (date) => {
  let month = parseInt(date.getMonth()) + 1;

  return (
    date.getDate() +
    "/" +
    (month < 10 ? "0" + month : month) +
    "/" +
    date.getFullYear()
  );
};
export const refreshToken = (dispatch) => {
  setTimeout(() => {
    if (
      localStorage.getItem("token") !== undefined &&
      localStorage.getItem("refresh-token") !== undefined
    ) {
      fetch(`${url_servidor}refreshToken/${localStorage.getItem("usuario")}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
          "Refresh-Token": localStorage.getItem("refresh-token"),
        },
      })
        .then(function (res) {
          if (res.status === 200) {
            setLocalStorage(res.headers.entries());
            refreshToken(dispatch);
          } else {
            closeSession(dispatch);
          }
        })
        .catch((error) => {
          closeSession(dispatch);
        });
    }
  }, calcularTimer(localStorage.getItem("expiration-time")));
};
export const refreshRefreshToken = (dispatch) => {
  setTimeout(() => {
    if (
      localStorage.getItem("token") !== undefined &&
      localStorage.getItem("refresh-token") !== undefined
    ) {
      fetch(
        `${url_servidor}refreshRefreshToken/${localStorage.getItem("usuario")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
            "Refresh-Token": localStorage.getItem("refresh-token"),
          },
        }
      )
        .then(function (res) {
          if (res.status === 200) {
            setLocalStorage(res.headers.entries());
            refreshRefreshToken(dispatch);
          } else {
            closeSession(dispatch);
          }
        })
        .catch((error) => {
          closeSession(dispatch);
        });
    }
  }, calcularTimer(localStorage.getItem("refresh-expiration-time")));
};

export const setLocalStorage = (headers) => {
  for (var pair of headers) {
    switch (pair[0]) {
      case "access-token": //Token para consultas
        localStorage.setItem("token", pair[1]);
        break;
      case "expiration-time": //Expiration del token consultas
        localStorage.setItem("expiration-time", pair[1]);
        break;
      case "refresh-token": //Token para refrezcar
        localStorage.setItem("refresh-token", pair[1]);
        break;
      case "refresh-expiration-time":
        localStorage.setItem("refresh-expiration-time", pair[1]);
        break;

      default:
        console.log("Header Not Needed");
    }
  }
};

export const calcularTimer = (fechaExpiracion) => {
  const hora_actual = new Date();

  const fecha_expiracion = parse(
    fechaExpiracion,
    "dd/MM/yyyy HH:mm:ss",
    new Date()
  );

  let timer = differenceInSeconds(fecha_expiracion, hora_actual);

  if (timer * 1000 - 60000 > 70000) {
    //Dejo 10 segundos de espacio entre que se ejecuta y el tiempo en el que se venceria el token
    //Si el timer queda configurado para ejecutarse 1 minuto antes de vencerse, acepto
    return timer * 1000 - 60000;
  } else {
    // Si me queda menos de 1 minutos, lo ejecuto en ese momento
    return 10;
  }
};

export const isAlive = (dispatch, login) => {
  fetch(url_servidor + "tokenALive", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then(function (res) {
      if (res.status === 200) {
        if (login === 0) dispatch(setLogin(1)); //0 siugnifica que no esta logueado, 1 esta logueado
      } else {
        closeSession(dispatch);
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
};
export const prestadora = () => {
  let prestadora = 0;

  if (localStorage.getItem("prestadora") !== null) {
    prestadora = JSON.parse(localStorage.getItem("prestadora")).cd_prestadora;
  }

  return prestadora;
};
export const getPrestadora = () => {
  const prestadora = JSON.parse(localStorage.getItem("prestadora"));

  return prestadora.nombre;
};
