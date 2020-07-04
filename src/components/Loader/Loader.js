import React, { Fragment } from "react";
import CubeLoader from "../../assets/Gif/loader.gif";
import "./Loader.css";

const Loader = ({ show }) => {
  const loadingComponent = (
    <div className="loader-container">
      <img src={CubeLoader} className="loader-small"/>
    </div>
  );
  return <Fragment>{show && loadingComponent}</Fragment>;
};

export default Loader;
