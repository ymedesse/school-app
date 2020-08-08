import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import context from "../../rootContext/context";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticatedUser } = useContext(context).auth;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticatedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
