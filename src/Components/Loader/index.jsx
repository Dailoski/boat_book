import React from "react";
import ReactLoading from "react-loading";
import { CircularProgress } from "@mui/material";
import "./loader.css";
function Loader() {
  return (
    // <div style={{ margin: "20vh auto" }}>
    //   <ReactLoading type={"spin"} color={"orange"} height={350} width={100} />
    // </div>
    <CircularProgress disableShrink className="loader" />
  );
}

export default Loader;
