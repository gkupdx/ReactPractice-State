import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      {/* Wrap the components with our Provider,
        assign our state property with the "isLoggedIn" state value from useState(),
        pass in a POINTER to our "logoutHandler()" function to our onLogout property */}
      {/* <AuthContext.Provider
        value={{ isUserLoggedIn: isLoggedIn, onLogout: logoutHandler }}
      > */}
      <MainHeader />
      <main>
        {!ctx.isUserLoggedIn && <Login />}
        {ctx.isUserLoggedIn && <Home />}
      </main>
      {/* </AuthContext.Provider> */}
    </React.Fragment>
  );
}

export default App;
