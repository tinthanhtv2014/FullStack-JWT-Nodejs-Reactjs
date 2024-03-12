import { useEffect, useState } from "react";
import React from "react";
import { getUserAccount } from "../services/userService";
const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({
    isAuthenticated: false,
    token: "",
    account: {},
  });
  const fetchUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;
      let data = {
        isAuthenticated: true,
        token: token,
        account: { groupWithRoles, email, username },
      };
      setUser(data);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  // Login updates the user data with a name parameter
  const LoginContext = (userData) => {
    setUser(userData);
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, LoginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
