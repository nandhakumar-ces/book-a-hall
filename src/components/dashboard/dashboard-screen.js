import React from "react";
import bgImage from "../../assets/images/dash.jpg";

function DashboardScreen() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5",
      }}
    >
      <h2
        style={{
          backgroundColor: "#00000033",
          margin: 0,
          padding: "2%",
          fontSize: 26,
          color: "#4B0082",
          fontWeight: "bold",
        }}
      >
        CES.
      </h2>
      <div
        style={{
          backgroundColor: "#00000033",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: 36,
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          WELCOME TO DASHBOARD
        </h2>
      </div>
    </div>
  );
}

export default DashboardScreen;
