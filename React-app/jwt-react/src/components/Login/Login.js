import React from "react";
import "./Login.scss";

import { useHistory } from "react-router-dom";
const Login = (props) => {
  let history = useHistory();
  const handleCreateNewAccount = () => {
    history.push("/register");
  };
  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block my-sm-auto">
            <div className="brand">Login Form</div>
            <div className="detail ">Learning React & Nodejs</div>
          </div>

          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 col-sm-5 ">
            <div className="brand d-sm-none mx-auto"> Login form</div>
            <input
              type="text"
              className="form-control"
              placeholder="Email or phone number"
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
            <button className="btn btn-primary">Login</button>
            <span className="mx-auto">
              <a href="#" className="forgot-password">
                Forgotten password ?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                Create Your Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
