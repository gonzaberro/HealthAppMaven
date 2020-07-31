import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Login/Login";
import Logged from "../Logged/Logged";
import { isAlive } from "Utils/functions";
export default function MenuSwitch() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login_state.login); //Para saber si estoy o no logueado en el sistema

  useEffect(() => {
    const stored_token = localStorage.getItem("token");

    if (stored_token !== null && stored_token !== "") {
      isAlive(dispatch, login);
    }
  });

  return login === 0 ? <Login></Login> : <Logged></Logged>;
}
