import { combineReducers } from "redux";
import * as userReducer from "./user/user.reduer";
import * as productReducer from "./product/product.reducer";
import * as orderReducer from "./order/order.reducer";

const rootReducer = combineReducers({
  user: userReducer.reducer,
  products: productReducer.reducer,
  orders: orderReducer.reducer,
});
export default rootReducer;
