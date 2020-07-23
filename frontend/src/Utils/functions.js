import { url_servidor } from "Utils/constants";
import { parse, differenceInSeconds } from "date-fns";
import { setLogin } from "actions/LoginActions";
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
  fetch(`${url_servidor}refreshToken/${localStorage.getItem("usuario")}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  }).then(function (res) {
    if (res.status === 200) {
      for (var pair of res.headers.entries()) {
        if (pair[0] === "access-token") {
          localStorage.setItem("token", pair[1]);
        } else if (pair[0] === "expiration-time") {
          localStorage.setItem("expiration-time", pair[1]);
        }
      }
      setTimeout(() => {
        refreshToken();
      }, calcularTimer());
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      localStorage.removeItem("expiration-time");
      dispatch(setLogin(0));
    }
  });
};
export const calcularTimer = () => {
  const hora_actual = new Date();

  const fecha_expiracion = parse(
    localStorage.getItem("expiration-time"),
    "dd/MM/yyyy HH:mm:ss",
    new Date()
  );

  let timer = differenceInSeconds(fecha_expiracion, hora_actual);

  if (timer * 1000 - 120000 >= 120000) {
    //Si el timer queda configurado para ejecutarse 2 minutos antes de vencerse, acepto
    return timer * 1000 - 120000;
  } else {
    // Si me queda menos de 2 minutos, lo ejecuto en ese momento
    return 10;
  }
};
