import React, { Fragment, useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ Component, path, ...rest }) => {
  const { state } = useContext(AuthContext);
  return (
    <Fragment>
      {state.isAuthenticated || localStorage.getItem("TOKEN") ? (
        <Route
          component={(props) => <Component {...props} />}
          path={path}
          {...rest}
        />
      ) : (
        <Redirect to="/" />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
