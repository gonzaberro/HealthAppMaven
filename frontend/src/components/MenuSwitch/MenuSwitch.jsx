import React from "react";
import { useSelector } from "react-redux";
import Login from "../Login/Login";
import Logged from "../Logged/Logged";

export default function MenuSwitch() {
  const GoToMenu = () => {
    const login = useSelector((state) => state.login_state.login); //Para saber si estoy o no logueado en el sistema

    if (login === 0) {
      return <Login></Login>;
    } else {
      return <Logged></Logged>;
    }
  };

  return GoToMenu();
}
