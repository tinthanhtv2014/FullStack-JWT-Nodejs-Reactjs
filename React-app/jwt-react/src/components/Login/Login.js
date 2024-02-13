import React from "react";
import "./Login.scss";
const Login = (props) => {
  return (
    <div className="login-container mt-3">
      <div className="container">
        <div className="row">
          <div className="content-left col-7 d-none d-sm-block">
            <div className="brand">Login Form</div>
            <div className="detail">Learning React & Nodejs</div>
          </div>
          <div className="content-right col-12 green d-flex flex-column gap-3 py-3 col-sm-5">
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
            <span className="mx-auto">Forgotten password ?</span>
            <hr />
            <div className="text-center">
              <button className="btn btn-success">Create Your Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
