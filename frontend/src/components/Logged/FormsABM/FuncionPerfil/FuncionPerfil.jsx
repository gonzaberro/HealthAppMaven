import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getListaPerfil } from "actions/PerfilActions";
import ContentFuncionPerfil from "./ContentFuncionPerfi";

export default function FuncionPerfil() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListaPerfil());
  }, [dispatch]);

  return <ContentFuncionPerfil />;
}
