import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage/Landingpage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRouter from "./Router/ProtectedRoute";
import "antd/dist/antd.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRouter path="/dashboard" Component={Dashboard}/>
        <Route path="/" component={(props) => <Landingpage {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
