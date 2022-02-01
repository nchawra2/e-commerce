import * as productAction from "./product.action";

const initialState = {
  loading: false,
  products: [],
  singleProduct: {},
  cartItems: [],
  error: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case productAction.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productAction.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case productAction.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case productAction.GET_MEN_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productAction.GET_MEN_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case productAction.GET_MEN_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
      };
    case productAction.GET_WOMEN_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productAction.GET_WOMEN_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case productAction.GET_WOMEN_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
      };
    case productAction.GET_KIDS_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productAction.GET_KIDS_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case productAction.GET_KIDS_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
      };
    case productAction.GET_SINGLE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productAction.GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        singleProduct: action.payload,
      };
    case productAction.GET_SINGLE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        singleProduct: {},
      };
    case productAction.ADD_TO_CART:
      let present = state.cartItems.filter((item) => {
        return item._id === action.payload._id;
      });

      if (Object.keys(present).length === 0) {
        let updatedCart = [...state.cartItems, action.payload];
        return {
          ...state,
          cartItems: updatedCart,
        };
      } else {
        return {
          ...state,
        };
      }
    case productAction.DELETE_CART_ITEM:
      let filteredCart = state.cartItems.filter((item) => {
        return item._id !== action.payload;
      });
      return {
        ...state,
        cartItems: filteredCart,
      };

    case productAction.INC_QTY:
      let updatedCartQtyInc = state.cartItems.map((item) => {
        if (item._id === action.payload) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        cartItems: updatedCartQtyInc,
      };
    case productAction.DEC_QTY:
      let updatedCartQtyDec = state.cartItems.map((item) => {
        if (item._id === action.payload) {
          return {
            ...item,
            qty: item.qty - 1 < 1 ? item.qty : item.qty - 1,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        cartItems: updatedCartQtyDec,
      };

    case productAction.EMPLTY_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
