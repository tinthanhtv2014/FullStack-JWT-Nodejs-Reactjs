import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../context/UserContext";
import React from "react";
const PrivateRoutes = (props) => {
  let history = useHistory();
  const { user } = React.useContext(UserContext);

  useEffect(() => {
    console.log("check content user", user);
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("/login");
      window.location.reload();
    }
  }, []);
  return (
    <>
      <Route path={props.path} component={props.component} />
    </>
  );
};
export default PrivateRoutes;
