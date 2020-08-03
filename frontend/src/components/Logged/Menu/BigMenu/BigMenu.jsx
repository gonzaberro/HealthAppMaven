import React from "react";
import PrimaryContainer from "../../PrimaryContainer";
import ContainerBigMenu from "./ContainerBigMenu";
import { makeStyles } from "@material-ui/core/styles";
import { getPrestadora } from "Utils/functions";

export default function BigMenu(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <ContainerBigMenu />
      </div>
      <div>
        <div className={classes.containerBar}>
          <div className={classes.infoEmpresa}>
            Prestadora: {getPrestadora()}
          </div>
        </div>
        <div className={classes.containerPrimary}>
          <PrimaryContainer></PrimaryContainer>
        </div>
      </div>
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  container: {
    float: "left",
    width: "5%",
    minHeight: "100%",
    backgroundColor: "#333",
    zIndex: 20,
  },
  infoEmpresa: {
    width: "95%",
    padding: 10,
    paddingTop: 15,
  },
  containerBar: {
    float: "right",
    width: "95%",
    height: "5vh",
    minHeight: "10%",
    borderBottom: "1px solid #de3444",
    backgroundColor: "#fff",
    fontWeight: "bold",
    color: "#de3444",
    zIndex: 20,
  },
  containerPrimary: {
    float: "right",
    width: "95%",
    height: "93vh",
    zIndex: 10,
  },
}));
