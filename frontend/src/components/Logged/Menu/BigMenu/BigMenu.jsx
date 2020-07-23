import React from "react";
import PrimaryContainer from "../../PrimaryContainer";
import ContainerBigMenu from "./ContainerBigMenu";
import { makeStyles } from "@material-ui/core/styles";
export default function BigMenu(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <ContainerBigMenu />
      </div>

      <div className={classes.containerPrimary}>
        <PrimaryContainer></PrimaryContainer>
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
  containerPrimary: {
    float: "right",
    width: "95%",
    minHeight: "100%",
    zIndex: 10,
  },
}));
