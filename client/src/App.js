import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./modules/layout/Navbar";
import Home from "./modules/layout/Home.";
import MensCollection from "./modules/products/MensCollection";
import WomensCollection from "./modules/products/WomensCollection";
import KidsCollection from "./modules/products/KidsCollection";
import ProductUpload from "./modules/products/UploadProducts";
import ProductDetail from "./modules/products/ProductDetails";
import UserProfile from "./modules/users/UserProfile";
import Cart from "./modules/orders/Cart";
import CheckOut from "./modules/orders/CheckOut";
import OrderList from "./modules/orders/OrderList";
import UserLogin from "./modules/users/UserLogin";
import UserRegister from "./modules/users/UserRegister";

import { PrivateRoute } from "./util/PrivateRoute";

import * as userAction from "./REDUX/user/user.action";
import { useDispatch } from "react-redux";

function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAction.getUser());
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/products/mens"} element={<MensCollection />} />
          <Route path={"/products/women"} element={<WomensCollection />} />
          <Route path={"/products/kids"} element={<KidsCollection />} />
          <Route path={"/products/:pid"} element={<ProductDetail />} />
          <Route
            path={"/products/cart"}
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path={"/products/upload"}
            element={
              <PrivateRoute>
                <ProductUpload />
              </PrivateRoute>
            }
          />
          <Route
            path={"/order/checkout"}
            element={
              <PrivateRoute>
                <CheckOut />
              </PrivateRoute>
            }
          />
          <Route
            path={"/order/myorder"}
            element={
              <PrivateRoute>
                <OrderList />
              </PrivateRoute>
            }
          />
          <Route
            path={"/user/profile"}
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />

          <Route path={"/user/login"} element={<UserLogin />} />
          <Route path={"/user/register"} element={<UserRegister />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
