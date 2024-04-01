import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/Login/Login";
import Users from "../components/ManageUsers/Users";
import Register from "../components/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
const AppRoutes = (props) => {
  /**
   * ["/users/show","/users/update"]
   *
   *
   *
   *
   *
   *
   *
   *
   */
  const Project = () => {
    return <span>project</span>;
  };
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/project" component={Project} />
        <PrivateRoutes path="/roles" component={Role} />
        <Route path="/" exact>
          home
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="*">404 not found</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
