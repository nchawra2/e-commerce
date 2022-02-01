import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import * as productAction from "../../REDUX/product/product.action";

import { useSelector } from "react-redux";

function UploadProducts() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [formState, setFormState] = useState({
    name: "",
    brand: "",
    image: "",
    description: "",
    category: "",
    price: "",
    qty: "",
  });

  let userState = useSelector((state) => {
    return state.user;
  });

  let { user } = userState;

  let formUpdate = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  let convertBase64String = (imageFile) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.addEventListener("load", () => {
        if (fileReader.result) {
          resolve(fileReader.result);
        } else {
          reject("Error Occurred");
        }
      });
    });
  };

  let updateImage = async (event) => {
    let imageFile = event.target.files[0];
    let base64Image = await convertBase64String(imageFile);

    setFormState({
      ...formState,
      image: base64Image.toString(),
    });
  };

  let formAddProduct = (e) => {
    e.preventDefault();
    dispatch(productAction.addProduct(formState,navigate));
  };

  return (
    <React.Fragment>
      <div className="container mt-3">
        {user.isAdmin ? (
          <React.Fragment>
            <h1>ADD PRODUCTS</h1>
            <div className="row mt-3">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={formAddProduct}>
                      <div className="form-group mb-3">
                        <input
                          name="name"
                          value={formState.name}
                          onChange={formUpdate}
                          type="text"
                          className="form-control"
                          placeholder="name"
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          name="brand"
                          value={formState.brand}
                          onChange={formUpdate}
                          type="text"
                          className="form-control"
                          placeholder="brand"
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          onChange={updateImage}
                          type="file"
                          className="form-control"
                          required
                        />
                        {formState.image?.length > 0 && (
                          <img
                            src={formState.image}
                            alt=""
                            width="50"
                            height="50"
                          />
                        )}
                      </div>
                      <div className="form-group mb-3">
                        <select
                          name="category"
                          value={formState.category}
                          onChange={formUpdate}
                          className="form-control"
                          required
                        >
                          <option value="">select a category </option>
                          <option value="MEN">MEN</option>
                          <option value="WOMEN">WOMEN</option>
                          <option value="KIDS">KIDS</option>
                        </select>
                      </div>
                      <div className="form-group mb-3">
                        <input
                          name="description"
                          value={formState.description}
                          onChange={formUpdate}
                          type="text"
                          className="form-control"
                          placeholder="description"
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          name="qty"
                          value={formState.qty}
                          onChange={formUpdate}
                          type="number"
                          className="form-control"
                          placeholder="quantity"
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          name="price"
                          value={formState.price}
                          onChange={formUpdate}
                          type="number"
                          className="form-control"
                          placeholder="price"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="submit"
                          value="ADD PRODUCT"
                          className="btn bg-primary text-white"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1 className="bg-dark text-danger p-2 ">
              ACCESS NOT GRANTED YET!
            </h1>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default UploadProducts;
