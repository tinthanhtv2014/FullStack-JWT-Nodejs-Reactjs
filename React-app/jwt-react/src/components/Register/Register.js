import React from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };

  const isValidInputs = () => {
    if (!email) {
      toast.error("email is required");
      return false;
    }
    if (!phone) {
      toast.error("phone is required");
      return false;
    }
    if (!username) {
      toast.error("username is required");
      return false;
    }
    if (!password) {
      toast.error("password is required");
      return false;
    }

    if (password != confirmPassword) {
      toast.error("your password is not the same");
      return false;
    }

    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("enter a valid email address");
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    let check = isValidInputs();
    if (check) {
      toast.success("congratulations");
    }
    let userData = { email, phone, username, password };
    console.log("check userdata:", userData);
  };

  useEffect(() => {
    // axios.get("http://localhost:8081/api/test-api").then((data) => {
    //   console.log("check data: ", data);
    // });
  });

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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="mb-1">Phone Number:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="mb-1">Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="mb-1">Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="mb-1"> Re-enter your Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
              type="submit"
            >
              Register
            </button>

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
