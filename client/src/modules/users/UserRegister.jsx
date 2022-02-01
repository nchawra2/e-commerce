import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import * as userAction from "../../REDUX/user/user.action";

function UserRegister() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });

  let [userErrorState, setUserErrorState] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
  });

  let checkName = (e) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value,
    });

    let Regex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;

    !Regex.test(e.target.value)
      ? setUserErrorState({
          ...userErrorState,
          nameErr: "enter a proper name",
        })
      : setUserErrorState({
          ...userErrorState,
          nameErr: "",
        });
  };

  let checkEmail = (e) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value,
    });

    let regEx = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    !regEx.test(e.target.value)
      ? setUserErrorState({
          ...userErrorState,
          emailErr: "enter a proper email",
        })
      : setUserErrorState({
          ...userErrorState,
          emailErr: "",
        });
  };

  let checkPassword = (e) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value,
    });

    let regEx = /(^[a-zA-Z][a-zA-Z\s]{3,20}[a-zA-Z]$)/;

    !regEx.test(e.target.value)
      ? setUserErrorState({
          ...userErrorState,
          passwordErr: "password should be min 5 character and only alphabets",
        })
      : setUserErrorState({
          ...userErrorState,
          passwordErr: "",
        });
  };

  let submitRegister = (e) => {
    e.preventDefault();
    if (
      !userErrorState.emailErr &&
      !userErrorState.nameErr &&
      !userErrorState.passwordErr
    ) {
      dispatch(userAction.registerUser(userState, navigate));
    } else {
      alert("fill the form correctly");
    }
  };

  return (
    <React.Fragment>
      <section className="mt-4">
        <p className="h3 container">Register Here</p>
      </section>
      <section className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <p className="h3">Register Here</p>
                </div>
                <div className="card-body">
                  <form onSubmit={submitRegister}>
                    <div className="form-group mb-3">
                      <label>
                        <h5>UserName :</h5>
                      </label>
                      <input
                        required
                        name="name"
                        value={userState.name}
                        onChange={checkName}
                        type="text"
                        className={`form-control ${
                          userErrorState.nameErr.length > 0 ? "is-invalid" : ""
                        }`}
                        placeholder="Your Username"
                      />
                      <small className="h6 text-capitalize text-danger fw-bold">
                        {userErrorState.nameErr.length > 0
                          ? userErrorState.nameErr
                          : ""}
                      </small>
                    </div>
                    <div className="form-group mb-3">
                      <label>
                        <h5>Email :</h5>
                      </label>
                      <input
                        required
                        name="email"
                        value={userState.email}
                        onChange={checkEmail}
                        type="email"
                        className={`form-control ${
                          userErrorState.emailErr.length > 0 ? "is-invalid" : ""
                        }`}
                        placeholder="xxx@xxx.com"
                      />
                      <small className="h6 text-capitalize text-danger fw-bold">
                        {userErrorState.emailErr.length > 0
                          ? userErrorState.emailErr
                          : ""}
                      </small>
                    </div>
                    <div className="form-group mb-3">
                      <label>
                        <h5>Password :</h5>
                      </label>
                      <input
                        name="password"
                        value={userState.password}
                        onChange={checkPassword}
                        type="password"
                        className={`form-control ${
                          userErrorState.passwordErr.length > 0
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="* * * * * * * * * * *"
                      />
                      <small className="h6 text-capitalize text-danger fw-bold">
                        {userErrorState.passwordErr.length > 0
                          ? userErrorState.passwordErr
                          : ""}
                      </small>
                    </div>
                    <div>
                      <input
                        type={"submit"}
                        className="btn bg-primary login-btn text-white"
                        value={"REGISTER"}
                      />
                    </div>
                    <h6 className="mt-3">
                      Have a Account{" "}
                      <NavLink to="/user/login">Login Here</NavLink>
                    </h6>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default UserRegister;
