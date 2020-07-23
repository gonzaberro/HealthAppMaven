import React from "react";
import MediaQuery from "react-responsive";
import BigMenu from "./Menu/BigMenu/BigMenu";
import SmallMenu from "./Menu/SmallMenu/SmallMenu";
export default function Logged() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <MediaQuery minDeviceWidth={1300}>
        <BigMenu />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1300}>
        <SmallMenu />
      </MediaQuery>
    </div>
  );
}
