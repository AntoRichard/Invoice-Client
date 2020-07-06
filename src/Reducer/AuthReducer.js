import { SET_IS_AUTHENTICATED, SET_USER_DETAILS } from "../types/auth";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
