import React from "react";
import * as userAction from "../../REDUX/user/user.action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "../layout/Spinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [check, setCheck] = useState({
    isChecked: false,
  });

  useEffect(() => {
    dispatch(userAction.getUser());
  }, []);

  let userState = useSelector((state) => {
    return state.user;
  });

  let { loading, user } = userState;
  let { country, state, city, colony, mobile } = user.address;

  let [address, setAddress] = useState({
    country: country ? country : "",
    state: state ? state : "",
    city: city ? city : "",
    colony: colony ? colony : "",
    mobile: mobile ? mobile : "",
  });

  let updateCheck = (e) => {
    setCheck({
      isChecked: e.target.checked,
    });
  };

  let checkAddress = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  let updateAddress = (e) => {
    e.preventDefault();
    dispatch(userAction.updateUserAddress(address, navigate));
    setCheck({
      isChecked: false,
    });
  };

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <h1 className="mt-3">
            <i class="fas fa-user-circle me-2"></i>My Profile
          </h1>
          <section className="mt-3">
            <div className="row">
              <div className="col-md-5">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h3 className="fw-bold">INFO</h3>
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item h5">
                        Name :{" "}
                        <span className="fw-bold">
                          {user.name.toUpperCase()}
                        </span>
                      </li>
                      <li className="list-group-item h5">
                        Email : <span className="fw-bold">{user.email}</span>
                      </li>
                      <li className="list-group-item h5">
                        Mobile No :{" "}
                        <span className="fw-bold">{user.address.mobile}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="card">
                  <div className="card-header billing-header bg-primary text-white">
                    <h3 className="fw-bold">Billing Address</h3>
                    <div className="add-check">
                      <input
                        type="checkbox"
                        onChange={updateCheck}
                        className="address-checkbox"
                      />
                      <span className="fw-bold h5 ms-2">Update Address</span>
                    </div>
                  </div>
                  <div className="card-body">
                    {check.isChecked ? (
                      <form onSubmit={updateAddress}>
                        <div className="form-group mb-3">
                          <input
                            name="country"
                            value={address.country}
                            onChange={checkAddress}
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Country"
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            name="state"
                            value={address.state}
                            onChange={checkAddress}
                            type="text"
                            className="form-control"
                            placeholder="Enter Your State"
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            name="city"
                            value={address.city}
                            onChange={checkAddress}
                            type="text"
                            className="form-control"
                            placeholder="Enter Your City"
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            name="colony"
                            value={address.colony}
                            onChange={checkAddress}
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Colony"
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            name="mobile"
                            value={address.mobile}
                            onChange={checkAddress}
                            type="number"
                            className="form-control"
                            placeholder="Enter Your Mobile"
                            required
                          />
                        </div>
                        <input
                          type="submit"
                          value={"update address"}
                          className="btn bg-primary text-white"
                        />
                      </form>
                    ) : (
                      <ul className="list-group">
                        <li className="list-group-item h5">
                          Country :{" "}
                          <span className="fw-bold">
                            {user.address.country}
                          </span>
                        </li>
                        <li className="list-group-item h5">
                          State :{" "}
                          <span className="fw-bold">{user.address.state}</span>
                        </li>
                        <li className="list-group-item h5">
                          City :{" "}
                          <span className="fw-bold">{user.address.city}</span>
                        </li>
                        <li className="list-group-item h5">
                          Colony :{" "}
                          <span className="fw-bold">{user.address.colony}</span>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </React.Fragment>
  );
}

export default UserProfile;
