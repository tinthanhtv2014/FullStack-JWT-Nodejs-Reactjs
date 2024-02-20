import React from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userService";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckValid, setobjCheckValid] = useState(defaultValidInput);

  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };

  const isValidInputs = () => {
    setobjCheckValid(defaultValidInput);
    if (!email) {
      toast.error("email is required");
      setobjCheckValid({ ...defaultValidInput, isValidEmail: false });
      return false;
    }

    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      setobjCheckValid({ ...defaultValidInput, isValidEmail: false });
      toast.error("enter a valid email address");
      return false;
    }

    if (!phone) {
      setobjCheckValid({ ...defaultValidInput, isValidPhone: false });
      toast.error("phone is required");
      return false;
    }
    if (!username) {
      toast.error("username is required");
      return false;
    }
    if (!password) {
      setobjCheckValid({ ...defaultValidInput, isValidPassword: false });
      toast.error("password is required");
      return false;
    }

    if (password !== confirmPassword) {
      setobjCheckValid({ ...defaultValidInput, isValidConfirmPassword: false });
      toast.error("your password is not the same");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    let check = isValidInputs();

    if (check === true) {
      let response = await registerNewUser(email, phone, username, password);
      let serverData = response.data;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        history.push("/login");
      } else {
        toast.error(serverData.EM);
      }
    }
  };

  // useEffect(() => {
  //   // axios.get("http://localhost:8081/api/v1/test-api").then((data) => {
  //   //   console.log("check data: ", data);
  //   // });
  // });

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
                className={
                  objCheckValid.isValidEmail
                    ? "form-control is-valid"
                    : "form-control is-invalid"
                }
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
                className={
                  objCheckValid.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
                className={
                  objCheckValid.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="mb-1"> Re-enter your Password:</label>
              <input
                type="password"
                className={
                  objCheckValid.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
