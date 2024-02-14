import React from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";
const Register = (props) => {
  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };
  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block my-sm-auto">
            <div className="brand">Register Form</div>
            <div className="detail ">Learning React & Nodejs</div>
          </div>

          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 col-sm-5 ">
            <div className="brand d-sm-none mx-auto"> Register form</div>
            <div className="form-group">
              <label className="mb-1">Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email address"
              />
            </div>

            <div className="form-group">
              <label className="mb-1">Phone Number:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
              />
            </div>

            <div className="form-group">
              <label className="mb-1">Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="username"
              />
            </div>

            <div className="form-group">
              <label className="mb-1">Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label className="mb-1"> Re-enter your Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter Password"
              />
            </div>
            <button className="btn btn-primary">Register</button>

            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already've an Account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
