import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { withRouter } from 'react-router-dom';
import "./Navbar.css";

const Navbar = (props) => {
  const goBack = () => {
    return props.history.goBack();
  };
  return (
    <div className="navbar-container">
      <ArrowLeftOutlined className="back-button" onClick={goBack} />
    </div>
  );
};

export default withRouter(Navbar);
