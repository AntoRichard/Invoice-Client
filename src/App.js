import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Landingpage from "./pages/Landingpage/Landingpage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRouter from "./Router/ProtectedRoute";
import ErrorBoundry from "./components/ErrorBoundry/Errorboundry";
import "antd/dist/antd.css";

const App = () => {
  return (
    <ErrorBoundry>
      <BrowserRouter>
        <Switch>
          <ProtectedRouter
            path="/dashboard"
            Component={(props) => <Dashboard {...props} />}
          />
          <Route path="/" component={(props) => <Landingpage {...props} />} />
          <Route path="*" render={() => <Redirect to="/signup" />} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundry>
  );
};

export default App;
