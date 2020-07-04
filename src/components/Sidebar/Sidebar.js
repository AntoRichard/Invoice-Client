import React, { useContext } from "react";
import { AuthContext } from '../../Context/AuthContext';
import { SET_IS_AUTHENTICATED, SET_USER_DETAILS } from '../../types/auth';
import {
  HomeOutlined,
  LineChartOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);
  const styles = {
    icon: { fontSize: "20px", color: "white", paddingRight: 10 },
  };

  const logout = () => {
    dispatch({ action: SET_IS_AUTHENTICATED, payload: false })
    dispatch({ action: SET_USER_DETAILS, payload: null })
    localStorage.clear();
  }
  return (
    <div className="sidebar-inner-container">
      <div style={{ paddingLeft: 10 }}>
        <h1 className="product-name">Root Quotient</h1>
      </div>
      <div className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard/home">
              <HomeOutlined style={styles.icon} /> <span className="sidebar-text">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/metric">
              <LineChartOutlined style={styles.icon} /> <span className="sidebar-text">Metric</span>
            </Link>
          </li>
          <li>
            <Link>
              <UserOutlined style={styles.icon} /> <span className="sidebar-text">Profile</span>
            </Link>
          </li>
          <li className="logout-button">
            <Link to="/" onClick={logout}>
              <LogoutOutlined style={styles.icon} /> <span className="sidebar-text">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
