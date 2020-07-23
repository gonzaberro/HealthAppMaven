import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../actions/LoginActions";
import { url_servidor } from "Utils/constants";
import Login from "../Login/Login";
import Logged from "../Logged/Logged";
import { refreshToken, calcularTimer } from "Utils/functions";

export default function MenuSwitch() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login_state.login); //Para saber si estoy o no logueado en el sistema

  useEffect(() => {
    const stored_token = localStorage.getItem("token");

    if (stored_token !== null && stored_token !== "") {
      fetch(url_servidor + "tokenALive", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: stored_token,
        },
      }).then(function (res) {
        if (res.status === 200) {
          dispatch(setLogin(1)); //Voy a marcar el login

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
    }
  });

  const GoToMenu = () => {
    if (login === 0 || localStorage.getItem("token") === null) {
      return <Login></Login>;
    } else {
      return <Logged></Logged>;
    }
  };

  return GoToMenu();
}
