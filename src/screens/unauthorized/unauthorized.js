import React from "react";
import imgUnauth from "../../assets/svg/unauthorized.svg";
import Button from "../../common/button/button";
import { useHistory } from "react-router-dom";

function UnauthorizedScreen() {
  let history = useHistory();
  return (
    <>
      <figure
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={imgUnauth} height="100%" />

        <Button text="Go Back" className="back-btn" onClick={history.goBack} />
      </figure>
    </>
  );
}

export default UnauthorizedScreen;
