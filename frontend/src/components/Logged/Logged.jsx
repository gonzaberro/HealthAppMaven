import React from "react";
import LeftMenu from "./LeftMenu";
import PrimaryContainer from "./PrimaryContainer";

export default function Logged() {
  return (
    <div
      style={{
        maxHeight: "100vh",
        overflowY: "auto",
        width: "100vw",
      }}
    >
      <LeftMenu></LeftMenu>
      <div style={{ paddingLeft: 65 }}>
        <PrimaryContainer></PrimaryContainer>
      </div>
    </div>
  );
}
