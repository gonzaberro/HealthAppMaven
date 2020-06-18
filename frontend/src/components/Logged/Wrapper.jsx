import React, { useState } from "react";

import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";

import Form from "components/Logged/Form";
import RefTable from "components/Logged/RefTable";
import TopNavbar from "components/Logged/TopNavbar";
import WrapperForm from "components/Logged/WrapperForm";

export default function Wrapper({ columns, inputs, options }) {
  const classes = useStyles();
  const [tabMenu, setTabMenu] = useState("todos");

  const switchMenu = () => {
    switch (tabMenu) {
      case "todos":
        return <RefTable columns={columns} />;
      case "nuevo":
        return (
          <WrapperForm>
            <Form inputs={inputs} options={options} />
          </WrapperForm>
        );
      default:
        return <></>;
    }
  };

  return (
    <Container className={classes.container}>
      <TopNavbar setTabMenu={setTabMenu} tabMenu={tabMenu} />
      <h1>Nombre Prueba</h1>
      {switchMenu()}
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "1em",
  },
  title: {
    textAlign: "center",
  },
}));
