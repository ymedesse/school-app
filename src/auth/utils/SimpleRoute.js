import React, { useContext } from "react";
import { Route } from "react-router-dom";
import context from "../../rootContext/context";

const SimpleRoute = ({ component: Component, ...rest }) => {
  const { setAdminMode, adminMode } = useContext(context).auth;
  adminMode && setAdminMode(false);
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default SimpleRoute;
