import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import * as userAction from "../../REDUX/user/user.action";

function UserLogin() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [userState, setUserState] = useState({
    email: "",
    password: "",
  });

  let [userErrorState, setUserErrorState] = useState({
    emailErr: "",
    passwordErr: "",
  });

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

  let submitLogin = (e) => {
    e.preventDefault();
    if (!userErrorState.emailErr && !userErrorState.passwordErr) {
      dispatch(userAction.loginUser(userState, navigate));
    } else {
      alert("fill the form correctly");
    }
  };

  return (
    <React.Fragment>
      <section className="mt-4">
        <p className="h3 container">Login Here</p>
      </section>
      <section className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <p className="h3">Login Here</p>
                </div>
                <div className="card-body">
                  <form onSubmit={submitLogin}>
                    <div className="form-group mb-3">
                      <label>
                        <h5>UserName :</h5>
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
                        required
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
                        value={"LOGIN"}
                      />
                    </div>
                    <h6 className="mt-3">
                      New To React Cart{" "}
                      <NavLink to="/user/register">Register Here</NavLink>
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

export default UserLogin;
