import React from "react";
import { NavLink } from "react-router-dom";

import * as userAction from "../../REDUX/user/user.action";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  let dispatch = useDispatch();

  let userState = useSelector((state) => {
    return state.user;
  });

  let productState = useSelector((state) => {
    return state.products;
  });

  let { isAuthenticated } = userState;

  let { cartItems } = productState;

  let logout = () => {
    dispatch(userAction.logout());
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-primary navbar-expand-sm">
        <div className="container">
          <NavLink to="/" className="navbar-brand fw-bolder">
            <i className="fa fa-cart-arrow-down me-2" aria-hidden="true"></i>
            React Cart
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link" to="/products/mens">
                Mens Wear
              </NavLink>
              <NavLink className="nav-link" to="/products/women">
                Womens Wear
              </NavLink>
              <NavLink className="nav-link" to="/products/kids">
                Kids Wear
              </NavLink>
              {isAuthenticated ? (
                <NavLink className="nav-link" to="/products/cart">
                  <i className="fas fa-cart-plus ">
                    <span className="badge bg-danger text-white cart-badge rounded-pill">
                      {cartItems.length}
                    </span>
                  </i>
                </NavLink>
              ) : (
                ""
              )}
              {isAuthenticated ? (
                <React.Fragment>
                  <NavLink className="nav-link ms-3" to="/products/upload">
                    Upload
                  </NavLink>
                  <NavLink className="nav-link ms-3" to="/order/myorder">
                    My Orders
                  </NavLink>
                </React.Fragment>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="d-flex">
            {!isAuthenticated ? (
              <React.Fragment>
                <NavLink to="/user/login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="/user/register" className="nav-link">
                  Register
                </NavLink>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink to="/user/profile" className="nav-link">
                  PROFILE
                </NavLink>
                <NavLink to="/" className="nav-link" onClick={logout}>
                  LOGOUT
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
