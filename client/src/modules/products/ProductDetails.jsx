import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import * as productAction from "../../REDUX/product/product.action";
import { useState } from "react";

function ProductDetails() {
  let { pid } = useParams();

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(productAction.getSingleProduct(pid));
  }, [pid]);

  let [qty, setQty] = useState("");

  let productState = useSelector((state) => {
    return state.products;
  });

  let { loading, singleProduct } = productState;

  let setProductQty = (e) => {
    setQty(e.target.value);
  };

  let addToCart = (e) => {
    e.preventDefault();
    dispatch(productAction.addToCart(singleProduct, Number(qty)));
  };

  return (
    <React.Fragment>
      <div className="container">
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <div className="mt-3">
              <h2>Selected Product :-</h2>
            </div>
            <div className="row mt-5">
              {Object.keys(singleProduct).length > 0 && (
                <React.Fragment>
                  <div className="col-md-4 detail-img">
                    <img src={singleProduct.image} alt="" />
                  </div>
                  <div className="col-md-8">
                    <h3>
                      Name :-{" "}
                      <span className="fw-bolder text-capitalize">
                        {" "}
                        {singleProduct.name}
                      </span>
                    </h3>
                    <h3>
                      Brand :-{" "}
                      <span className="fw-bolder">
                        {" "}
                        {singleProduct.brand.toUpperCase()}
                      </span>
                    </h3>
                    <h3>
                      Price :-{" "}
                      <span className="fw-bold text-danger">
                        {" "}
                        ${singleProduct.price.toFixed(2)}
                      </span>
                    </h3>

                    <div className="row mt-3 mb-2">
                      <div className="col-md-3">
                        <form onSubmit={addToCart}>
                          <select
                            onChange={setProductQty}
                            value={qty}
                            className="form-control fw-bolder text-capitalize"
                            required
                          >
                            <option value="">select quantity</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                          <input
                            type="submit"
                            value="ADD TO CART"
                            className="btn bg-primary text-white mt-2"
                          />
                        </form>
                      </div>
                    </div>
                    <h4>Description:</h4>
                    <p className="fw-bold">{singleProduct.description}</p>
                  </div>
                </React.Fragment>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default ProductDetails;
