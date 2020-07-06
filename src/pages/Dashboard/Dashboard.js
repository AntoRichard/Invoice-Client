import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../../components/Home/Home";
import CreateInvoice from "../../components/CreateInvoice/CreateInvoice";
import Navbar from '../../components/Navbar/Navbar';
import "./Dashboard.css";
import UpdateInvoice from "../../components/UpdateInvoice/UpdateInvoice";
import Metric from "../../components/Metric/Metric";
import Profile from "../../components/Profile/Profile";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="content-container">
        <Navbar />
        <Switch>
          <Route
            path="/dashboard/home"
            component={(props) => <Home {...props} />}
          />
          <Route
            path="/dashboard/create"
            component={(props) => <CreateInvoice {...props} />}
          />
          <Route
            path="/dashboard/update/:id"
            component={(props) => <UpdateInvoice {...props} />}
          />
          <Route
            path="/dashboard/metric"
            component={(props) => <Metric {...props} />}
          />
          <Route
            path="/dashboard/profile"
            component={(props) => <Profile {...props} />}
          />
          <Route
            path="/dashboard/*"
            render={() => <Redirect to="/dashboard/home" />}
          />
          <Route
            path="*"
            render={() => <Redirect to="/" />}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
