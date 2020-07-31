import React, { useEffect } from "react";
import MediaQuery from "react-responsive";
import BigMenu from "./Menu/BigMenu/BigMenu";
import SmallMenu from "./Menu/SmallMenu/SmallMenu";
import { refreshRefreshToken, refreshToken } from "Utils/functions";
import { useDispatch } from "react-redux";
export default function Logged() {
  const dispatch = useDispatch();

  useEffect(() => {
    refreshToken(dispatch);
    refreshRefreshToken(dispatch);
  });

  return (
    <div
      style={{
        height: "99vh",
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
