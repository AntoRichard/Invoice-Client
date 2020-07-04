import React, { createContext, useReducer } from "react";
import { AuthReducer } from "../Reducer/AuthReducer";
import { initalState } from "../store/auth";

export const AuthContext = createContext();

const Auth = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initalState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default Auth;
