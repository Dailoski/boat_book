import React from "react";
import ReactLoading from "react-loading";
import { CircularProgress } from "@mui/material";
import "./loader.css";
function Loader({ height }) {
  console.log(height);
  const newHeight = height;
  return (
    // <div style={{ margin: "20vh auto" }}>
    //   <ReactLoading type={"spin"} color={"orange"} height={350} width={100} />
    // </div>
    // <CircularProgress disableShrink className="loader" />
    <div
      style={{
        height: newHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
        width: "100%",
      }}
    >
      <span class="loader">Loading</span>
    </div>
  );
}

export default Loader;
