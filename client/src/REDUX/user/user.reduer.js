import * as userAction from "./user.action";

const initialState = {
  loading: false,
  user: {},
  token: "",
  isAuthenticated: false,
  error: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case userAction.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userAction.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case userAction.USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case userAction.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userAction.USER_LOGIN_SUCCESS:
      sessionStorage.setItem(process.env.REACT_APP_SECRET_KEY, action.payload);
      return {
        ...state,
        loading: false,
        token: action.payload,
        isAuthenticated: true,
      };
    case userAction.USER_LOGIN_FAILURE:
      sessionStorage.removeItem(process.env.REACT_APP_SECRET_KEY);
      return {
        ...state,
        loading: false,
        token: "",
        isAuthenticated: false,
      };
    case userAction.USER_LOGOUT:
      sessionStorage.removeItem(process.env.REACT_APP_SECRET_KEY);
      return {
        ...state,
        loading: false,
        token: "",
        user: {},
        isAuthenticated: false,
      };
    case userAction.GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userAction.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case userAction.GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case userAction.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userAction.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case userAction.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
