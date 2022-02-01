import axios from "axios";
import { AuthUtil } from "../../util/AuthUtil";
import { TokenUtil } from "../../util/TokenUtil";

export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAILURE = "ADD_PRODUCT_FAILURE";

export const GET_MEN_PRODUCTS_REQUEST = "GET_MEN_PRODUCTS_REQUEST";
export const GET_MEN_PRODUCTS_SUCCESS = "GET_MEN_PRODUCTS_SUCCESS";
export const GET_MEN_PRODUCTS_FAILURE = "GET_MEN_PRODUCTS_FAILURE";

export const GET_WOMEN_PRODUCTS_REQUEST = "GET_WOMEN_PRODUCTS_REQUEST";
export const GET_WOMEN_PRODUCTS_SUCCESS = "GET_WOMEN_PRODUCTS_SUCCESS";
export const GET_WOMEN_PRODUCTS_FAILURE = "GET_WOMEN_PRODUCTS_FAILURE";

export const GET_KIDS_PRODUCTS_REQUEST = "GET_KIDS_PRODUCTS_REQUEST";
export const GET_KIDS_PRODUCTS_SUCCESS = "GET_KIDS_PRODUCTS_SUCCESS";
export const GET_KIDS_PRODUCTS_FAILURE = "GET_KIDS_PRODUCTS_FAILURE";

export const GET_SINGLE_PRODUCT_REQUEST = "GET_SINGLE_PRODUCT_REQUEST";
export const GET_SINGLE_PRODUCT_SUCCESS = "GET_SINGLE_PRODUCT_SUCCESS";
export const GET_SINGLE_PRODUCT_FAILURE = "GET_SINGLE_PRODUCT_FAILURE";

export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_CART_ITEM = "DELETE_CART_ITEM";

export const INC_QTY = "INC_QTY";
export const DEC_QTY = "DEC_QTY";

export const EMPLTY_CART = "EMPLTY_CART";

// ADD PRODUCTS
export const addProduct = (product, navigate) => {
  return async (dispatch) => {
    dispatch({ type: ADD_PRODUCT_REQUEST });
    try {
      if (AuthUtil.isLoggedIn()) {
        let token = AuthUtil.getToken();
        TokenUtil.setToken(token);
        let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/products/upload`;
        let res = await axios.post(dataUrl, product);
        dispatch({ type: ADD_PRODUCT_SUCCESS });
        alert(res.data.status);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: ADD_PRODUCT_FAILURE });
    }
  };
};

// GET MENS COLLECTION
export const getMensProducts = () => {
  return async (dispatch) => {
    dispatch({ type: GET_MEN_PRODUCTS_REQUEST });
    try {
      let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/products/men`;
      let res = await axios.get(dataUrl);
      dispatch({ type: GET_MEN_PRODUCTS_SUCCESS, payload: res.data.products });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_MEN_PRODUCTS_FAILURE });
    }
  };
};

// GET WOMENS COLLECTION
export const getWomensProducts = () => {
  return async (dispatch) => {
    dispatch({ type: GET_WOMEN_PRODUCTS_REQUEST });
    try {
      let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/products/women`;
      let res = await axios.get(dataUrl);
      dispatch({
        type: GET_WOMEN_PRODUCTS_SUCCESS,
        payload: res.data.products,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_WOMEN_PRODUCTS_FAILURE });
    }
  };
};

// GET WOMENS COLLECTION
export const getKidsProducts = () => {
  return async (dispatch) => {
    dispatch({ type: GET_KIDS_PRODUCTS_REQUEST });
    try {
      let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/products/kids`;
      let res = await axios.get(dataUrl);
      dispatch({ type: GET_KIDS_PRODUCTS_SUCCESS, payload: res.data.products });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_KIDS_PRODUCTS_FAILURE });
    }
  };
};

// GET single product
export const getSingleProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_SINGLE_PRODUCT_REQUEST });
    try {
      let dataUrl = `${process.env.REACT_APP_SERVER_URL}/api/products/${id}`;
      let res = await axios.get(dataUrl);
      dispatch({
        type: GET_SINGLE_PRODUCT_SUCCESS,
        payload: res.data.selectedProduct,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_SINGLE_PRODUCT_FAILURE });
    }
  };
};

// ADD TO CART
export const addToCart = (product, qty) => {
  product.qty = qty ? qty : 1;
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

// remove cart item
export const removeCartItem = (id) => {
  return {
    type: DELETE_CART_ITEM,
    payload: id,
  };
};

// inc qty
export const incQty = (id) => {
  return {
    type: INC_QTY,
    payload: id,
  };
};

// dec qty
export const decQty = (id) => {
  return {
    type: DEC_QTY,
    payload: id,
  };
};

// empty cart
export const emptyCart = () => {
  return {
    type: EMPLTY_CART,
  };
};
