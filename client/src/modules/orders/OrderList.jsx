import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from '../layout/Spinner';
import * as orderAction from "../../REDUX/order/order.actions";

function OrderList() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderAction.getOrder());
  }, []);

  let orderState = useSelector((state) => {
    return state.orders;
  });

  let { orders, loading } = orderState;

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <div className="container">
            <div className="row mt-4">
              <div className="col">
                <h2>All Orders</h2>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-10 m-auto">
                <table className="table  text-center">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>SNO</th>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>ITEMS</th>
                      <th>AMOUNT</th>
                      <th>DATE OF PURCHASE</th>
                    </tr>
                  </thead>
                  <tbody className="fw-bold">
                    {
                      orders.length > 0 ? orders.map((order, i) => {
                        return (
                          <tr key={order._id}>
                            <td>{i + 1}</td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>
                              <ul className="list-group">
                                {order.items.map((item) => {
                                  return (
                                    <li className="list-group-item">
                                      {item.name} , qty: {item.qty} , total: $
                                      {item.price}
                                    </li>
                                  );
                                })}
                              </ul>
                            </td>
                            <td>${order.total}</td>
                            <td>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      }) : <React.Fragment>
                        <tr>
                          <td colSpan={6}>NO ORDERS FOUND</td>
                        </tr>
                      </React.Fragment>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default OrderList;
