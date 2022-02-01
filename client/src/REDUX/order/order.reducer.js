import * as orderAction from "./order.actions";

let initialState = {
  loading: false,
  orders: [],
  error: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case orderAction.PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderAction.PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case orderAction.PLACE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case orderAction.GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderAction.GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case orderAction.GET_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
