// React Context API for user authentication
import React, { useState, useEffect } from "react";

// A custom Context OBJECT (to "wrap" components that need access to this state)
// and pass in default state values of "isUserLoggedIn: false" & "onLogout: () => {}"
const AuthContext = React.createContext({
  isUserLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {}
});

// A custom Context COMPONENT that is a more COMPLETE individual entity
// (compared to a simple context OBJECT like above)
export const AuthContextProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsUserLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn", "1");
    setIsUserLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsUserLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn: isUserLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
