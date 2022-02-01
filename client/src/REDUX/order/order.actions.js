import axios from "axios";
import { AuthUtil } from "../../util/AuthUtil";
import { TokenUtil } from "../../util/TokenUtil";

export const PLACE_ORDER_REQUEST = "PLACE_ORDER_REQUEST";
export const PLACE_ORDER_SUCCESS = "PLACE_ORDER_SUCCESS";
export const PLACE_ORDER_FAILURE = "PLACE_ORDER_REQUEST";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILURE = "GET_ORDER_REQUEST";

export const placeOrder = (order, navigate) => {
  return async (dispatch) => {
    dispatch({ type: PLACE_ORDER_REQUEST });
    try {
      if (AuthUtil.isLoggedIn()) {
        let token = AuthUtil.getToken();
        TokenUtil.setToken(token);
        let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/orders`;
        let res = await axios.post(dataUrl, order);
        dispatch({ type: PLACE_ORDER_SUCCESS });
        alert(res.data.status);
        navigate("/");
      }
    } catch (err) {
      console.log(err.response);
      dispatch({ type: PLACE_ORDER_FAILURE });
    }
  };
};

export const getOrder = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });
    try {
      if (AuthUtil.isLoggedIn()) {
        let token = AuthUtil.getToken();
        TokenUtil.setToken(token);
        let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/orders`;
        let res = await axios.get(dataUrl);
        dispatch({ type: GET_ORDER_SUCCESS, payload: res.data.orders });
      }
    } catch (err) {
      console.log(err.response);
      dispatch({ type: GET_ORDER_FAILURE });
    }
  };
};
