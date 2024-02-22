import React, { useState } from "react";
import "./Login.scss";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../services/userService";
const Login = (props) => {
  let history = useHistory();

  const [valueLogin, setValueLogin] = useState();
  const [password, setPassword] = useState();

  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);
  const handleCreateNewAccount = () => {
    history.push("/register");
  };

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!valueLogin) {
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      toast.error("Please enter your account");
      return;
    }

    if (!password) {
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error("Please enter your password");
      return;
    }

    let response = await loginUser(valueLogin, password);
    if (response && response.data && response.data.EC === 0) {
      let data = {
        isAuthenticated: true,
        token: "fake-token",
      };

      sessionStorage.setItem("account", JSON.stringify(data));

      history.push("/users");
      window.location.reload();
    }
    if (response && response.data && response.data.EC !== 0) {
      toast.error(response.data.EM);
    }
  };

  const handlePressEnter = (event) => {
    console.log("check Enter", event.key);
    if (event.key === "Enter") {
      handleLogin();
    }
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
              className={
                objValidInput.isValidValueLogin
                  ? "form-control"
                  : "is-invalid form-control"
              }
              placeholder="Email or phone number"
              value={valueLogin}
              onChange={(event) => {
                setValueLogin(event.target.value);
              }}
            />

            <input
              type="password"
              className={
                objValidInput.isValidPassword
                  ? "form-control"
                  : "is-invalid form-control"
              }
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onKeyDown={(event) => handlePressEnter(event)}
            />

            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
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
