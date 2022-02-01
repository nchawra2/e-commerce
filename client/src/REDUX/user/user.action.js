import axios from "axios";
import { AuthUtil } from "../../util/AuthUtil";
import { TokenUtil } from "../../util/TokenUtil";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const USER_LOGOUT = "USER_LOGOUT";

// register user
export const registerUser = (user, navigate) => {
  return async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
      let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/users/register`;
      let res = await axios.post(dataUrl, user);
      dispatch({ type: USER_REGISTER_SUCCESS });
      alert(res.data.status);
      navigate("/user/login");
    } catch (err) {
      alert(err.response.data.msg);
      dispatch({ type: USER_REGISTER_FAILURE, payload: err.message });
    }
  };
};

// login user
export const loginUser = (user, navigate) => {
  return async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
      let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/users/login`;
      let res = await axios.post(dataUrl, user);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.token });
      dispatch(getUser());
      alert(res.data.status);
      navigate("/");
    } catch (err) {
      alert(err.response.data.msg);
      dispatch({ type: USER_LOGIN_FAILURE, payload: err.message });
    }
  };
};

// logout user
export const logout = () => {
  return (dispatch) => {
    dispatch({ type: USER_LOGOUT });
  };
};

// get user
export const getUser = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      if (AuthUtil.isLoggedIn()) {
        let token = AuthUtil.getToken();
        TokenUtil.setToken(token);
        let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/users/`;
        let res = await axios.get(dataUrl);
        dispatch({ type: GET_USER_SUCCESS, payload: res.data });
      }
    } catch (err) {
      console.log(err.response);
      dispatch({ type: GET_USER_FAILURE, payload: err.message });
    }
  };
};

// update user adress
export const updateUserAddress = (address, navigate) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
      if (AuthUtil.isLoggedIn()) {
        let token = AuthUtil.getToken();
        TokenUtil.setToken(token);
        let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/users/address`;
        let res = await axios.put(dataUrl, address);
        dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data.token });
        dispatch(getUser());
        alert(res.data.status);
        navigate("/user/profile");
      }
    } catch (err) {
      alert(err.response.data.msg);
      dispatch({ type: UPDATE_USER_FAILURE, payload: err.message });
    }
  };
};
