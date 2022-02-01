import React from "react";
import Spinner from "../../modules/layout/Spinner";
import * as productAction from "../../REDUX/product/product.action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function MensCollection() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(productAction.getMensProducts());
  }, []);

  let productState = useSelector((state) => {
    return state.products;
  });

  let { loading, products } = productState;

  let addToCart = (product) => {
    dispatch(productAction.addToCart(product));
  };

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="text-dark mt-2">
            <div className="container">
              <p className="display-6">Men's Collection</p>
            </div>
          </section>
          <section className={"mt-2"}>
            <div className="container">
              <div className="row">
                {products.length > 0 &&
                  products.map((p) => {
                    return (
                      <div className="col-md-3" key={p._id}>
                        <div className="card">
                          <NavLink to={`/products/${p._id}`} className="m-auto">
                            <img
                              src={p.image}
                              alt="img"
                              width={200}
                              height={300}
                              className="product-img"
                            />
                          </NavLink>
                          <div className="card-body">
                            <ul className="list-group">
                              <li className="list-group-item h5">
                                Item:
                                <span className="text-capitalize ms-2 fw-bold">
                                  {p.name}
                                </span>
                              </li>
                              <li className="list-group-item h6">
                                Price:{" "}
                                <span className="text-capitalize ms-2 fw-bolder">
                                  ${p.price}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="card-footer  text-center">
                            <button
                              onClick={addToCart.bind(this, p)}
                              className="btn add-cart-btn text-white bg-primary btn-sm"
                            >
                              ADD TO CART
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default MensCollection;
