import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import {
  useHistory,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../context/UserContext";
import React from "react";
const PrivateRoutes = (props) => {
  const { user } = React.useContext(UserContext);

  if (user && user.isAuthenticated === true) {
    return (
      <>
        <Route path={props.path} component={props.component} />
      </>
    );
  } else {
    return <Redirect to="/login"></Redirect>;
  }
};
export default PrivateRoutes;
