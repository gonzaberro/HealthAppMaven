import React from "react";
import LeftMenu from "./LeftMenu";
import PrimaryContainer from "./PrimaryContainer";
import MenuLeft from "./Menu/MenuLeft";

export default function Logged() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          float: "left",
          width: "5%",
          minHeight: "100%",
          backgroundColor: "#333",
          zIndex: 20,
        }}
      >
        <MenuLeft />
      </div>
      <div
        style={{
          float: "right",
          width: "95%",
          minHeight: "100%",
          zIndex: 10,
        }}
      >
        <PrimaryContainer></PrimaryContainer>
      </div>
    </div>
  );
}
