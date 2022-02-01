import React from "react";
import * as productAction from "../../REDUX/product/product.action";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import * as CalcAll from "../../util/CalcTotal";
import { AuthUtil } from "../../util/AuthUtil";

function Cart() {
  let dispatch = useDispatch();

  let productState = useSelector((state) => {
    return state.products;
  });

  let { cartItems } = productState;

  const removeItem = (id) => {
    dispatch(productAction.removeCartItem(id));
  };

  const incQty = (id) => {
    dispatch(productAction.incQty(id));
  };

  const decQty = (id) => {
    dispatch(productAction.decQty(id));
  };

  return (
    <React.Fragment>
      {cartItems.length > 0 ? (
        <React.Fragment>
          <section className="mt-2">
            <div className="container">
              <p className="h2">
                <i className="fas fa-cart-plus me-2" />
                Your Cart
              </p>
            </div>
          </section>
          <section className="mt-4">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header bg-primary text-white">
                      <p className="h3">Your Cart Items</p>
                    </div>
                    <div className="card-body p-4">
                      <table className="table border fw-bolder">
                        <thead className="text-center">
                          <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {cartItems.map((item) => {
                            return (
                              <tr key={item._id}>
                                <td>
                                  <img
                                    src={item.image}
                                    height={80}
                                    width={70}
                                    alt=""
                                  />
                                </td>
                                <td>
                                  <h5>{item.name}</h5>
                                </td>
                                <td>
                                  <i
                                    className="fa fa-square-minus me-2"
                                    onClick={decQty.bind(this, item._id)}
                                  />
                                  {item.qty}
                                  <i
                                    className="fa fa-square-plus ms-2"
                                    onClick={incQty.bind(this, item._id)}
                                  />
                                </td>
                                <td>${(item.price * item.qty).toFixed(2)}</td>
                                <td>
                                  <button
                                    className="btn btn-danger del-btn"
                                    onClick={removeItem.bind(this, item._id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header bg-primary text-white">
                      <p className="h3">Your Total</p>
                    </div>
                    <div className="card-body">
                      <ul className="list-group">
                        <li className="list-group-item h5 fw-bold">
                          Total : ${CalcAll.calcTotal(cartItems)}
                        </li>
                        <li className="list-group-item h5 fw-bold">
                          Tax : ${CalcAll.calcTax(cartItems).toFixed(2)}
                        </li>
                        <li className="list-group-item h5 fw-bold">
                          Grand Total : ${CalcAll.GrandTotal(cartItems)}
                        </li>
                      </ul>
                      <div className={"mt-3"}>
                        <NavLink
                          to={
                            AuthUtil.isLoggedIn()
                              ? "/order/checkout"
                              : "/user/login"
                          }
                          className="btn btn-success me-3"
                        >
                          CheckOut
                        </NavLink>
                        <NavLink to={"/"} className="btn bg-primary text-white">
                          Shop More
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      ) : (
        <div className="container mt-5">
          <h1 className="bg-primary text-white p-2 text-uppercase text-center">
            ------------ your cart is empty -----------
          </h1>
        </div>
      )}
    </React.Fragment>
  );
}

export default Cart;
