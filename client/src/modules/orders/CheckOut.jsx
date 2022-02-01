import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as CalcAll from "../../util/CalcTotal";

import * as orderAction from "../../REDUX/order/order.actions";
import * as productAction from "../../REDUX/product/product.action";

function CheckOut() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let goToUserProfile = () => {
    navigate("/user/profile");
  };

  let userState = useSelector((state) => {
    return state.user;
  });

  let productState = useSelector((state) => {
    return state.products;
  });

  let { user } = userState;
  let { cartItems } = productState;

  let { country, state, city, colony, mobile } = user.address;

  let placeOrder = () => {
    // create a order ITEMS[{name,brand,qty,price}],TAX,TOTAL

    let items = cartItems.map((item) => {
      return {
        name: item.name,
        price: item.price,
        qty: item.qty,
        brand: item.brand,
      };
    });

    let order = {
      tax: CalcAll.calcTax(cartItems),
      total: CalcAll.GrandTotal(cartItems),
      items,
    };

    // dispatch Action
    dispatch(orderAction.placeOrder(order, navigate));
    dispatch(productAction.emptyCart());
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row mt-4">
          <div className="col">
            <h2>Place Order</h2>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-7">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <div className="update-address-flex">
                  <h2>Billing Address</h2>
                  <button
                    onClick={goToUserProfile}
                    className="btn btn-dark text-white btn-sm"
                  >
                    UPDATE ADDRESS
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="p-3">
                  <h5 className="bg-secondary text-white p-2">
                    Country : {country}
                  </h5>
                  <h5 className="bg-secondary text-white p-2">
                    State : {state}
                  </h5>
                  <h5 className="bg-secondary text-white p-2">City : {city}</h5>
                  <h5 className="bg-secondary text-white p-2">
                    Colony : {colony}
                  </h5>
                  <h5 className="bg-secondary text-white p-2">
                    Mobile : {mobile}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 ms-auto">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h2>Your Cart</h2>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {cartItems.map((item) => {
                    return (
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-md-4">
                            <img
                              src={item.image}
                              height={90}
                              width={80}
                              alt=""
                            />
                          </div>
                          <div className="col-md-8">
                            <p className="h5">{item.name}</p>
                            <p className="h5">${item.price}</p>
                            <p className="h5">Qty : {item.qty}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="card-footer bg-primary text-white">
              <h3>Total:- ${CalcAll.GrandTotal(cartItems)}</h3>
              <button
                className="btn btn-outline-light btn-lg"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CheckOut;
