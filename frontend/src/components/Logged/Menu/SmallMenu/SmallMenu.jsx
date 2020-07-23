import React from "react";
import Grid from "@material-ui/core/Grid";
import PrimaryContainer from "../../PrimaryContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import ContainerSmallMenu from "./ContainerSmallMenu";
import { menuOptions } from "Utils/constants";
import { SWITCH_MENU } from "actions/types";
export default function SmallMenu(props) {
  const dispatch = useDispatch();
  const menuSelected = useSelector((state) => state.globalReducer.menuSelected);
  const classes = useStyles();

  const gotoMenu = (selected) => {
    dispatch({
      type: SWITCH_MENU,
      payload: { menu: selected, limpiar: true },
    });
  };

  return (
    <>
      <div className={classes.container}>
        <Grid container className={classes.gridHeader}>
          <Grid item xs={2} sm={1} onClick={() => gotoMenu(menuOptions.MENU)}>
            <FontAwesomeIcon icon={faBars} />
          </Grid>
          <Grid item xs={9} sm={10}>
            <span style={{ fontSize: 27 }}>{menuSelected}</span>
          </Grid>
        </Grid>
      </div>

      <div className={classes.containerPrimary}>
        {menuSelected !== menuOptions.AGENDA &&
        menuSelected !== menuOptions.INFORMACION_EMPRESA &&
        menuSelected !== menuOptions.MENU ? (
          <PrimaryContainer />
        ) : (
          <ContainerSmallMenu />
        )}
      </div>
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  container: {
    float: "left",
    width: "100%",
    minHeight: "6%",
    backgroundColor: "#de3444",
    zIndex: 20,
    paddingLeft: 20,
  },
  containerPrimary: {
    float: "right",
    width: "100%",
    minHeight: "100%",
    zIndex: 10,
  },
  gridHeader: { height: "100%", fontSize: 35, color: "white", marginTop: "1%" },
}));
