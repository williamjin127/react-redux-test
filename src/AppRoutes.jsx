import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { routes } from "./routes/index";
import Login from "./components/auth/login";
import { TOKEN_LOCALSTORE_KEY } from "./constants/constants";
import { LOGIN_SUCCESS } from "./redux/actionTypes";
import App from "./components/app";

function AppRoutes() {
  const dispatch = useDispatch();
  let { signInUserSession } = useSelector((state) => state.Auth);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const localStoreToken = localStorage.getItem(TOKEN_LOCALSTORE_KEY);

  useEffect(() => {
    if (signInUserSession !== undefined) {
      setIsLoggedIn(true);
    } else if (localStoreToken !== null) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          signInUserSession: JSON.parse(localStoreToken),
          errorMessage: "",
        },
      });
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [signInUserSession, localStoreToken]);

  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route exact={true} path="/login" render={() => <Login />} />
        {isLoggedIn ? (
          <App>
            {routes.map(({ path, Component }) => (
              <Route
                exact={true}
                key={path}
                path={path}
                render={() => <Component />}
              />
            ))}
          </App>
        ) : (
          <Redirect to={`/login`} />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default AppRoutes;
