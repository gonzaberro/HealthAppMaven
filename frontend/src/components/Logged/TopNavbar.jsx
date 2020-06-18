import React from "react";

import { Paper, Tab, Tabs } from "@material-ui/core";

export default function TopNavbar({ setTabMenu, tabMenu }) {
  return (
    <Paper>
      <Tabs
        value={tabMenu}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Todos" value="todos" onClick={() => setTabMenu("todos")} />
        <Tab label="Nuevo" value="nuevo" onClick={() => setTabMenu("nuevo")} />
      </Tabs>
    </Paper>
  );
}
