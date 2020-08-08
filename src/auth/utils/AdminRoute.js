import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { SIGNIN_LINK, NOT_AUTHORIZATION_LINK } from "../../routerLinks";
import context from "../../rootContext/context";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticatedUser, setAdminMode, adminMode } = useContext(
    context
  ).auth;
  const { user } = isAuthenticatedUser;

  const canFoward = !user ? false : user.isAdmin || user.supUser;

  React.useEffect(() => {
    if (canFoward && !adminMode) setAdminMode(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdminMode = (props) => {
    if (canFoward && !adminMode) setAdminMode(true);
    return <Component {...props} />;
  };


  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticatedUser !== undefined ? (
          <>
            {canFoward ? (
              handleAdminMode(props)
            ) : (
              <Redirect
                to={{
                  pathname: NOT_AUTHORIZATION_LINK,
                  state: { from: props.location },
                }}
              />
            )}
          </>
        ) : (
          <Redirect
            to={{ pathname: SIGNIN_LINK, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
