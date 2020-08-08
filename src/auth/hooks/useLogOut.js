import React from "react";

import context from "../../rootContext/context";
import { useHistory } from "react-router-dom";
import useGoogleLogout from "./useGoogleLogout";

const useLogout = () => {
  const history = useHistory();
  const googleSignOut = useGoogleLogout();
  const rootContext = React.useContext(context);

  const { isAuthenticatedUser, signout: nativeSignOut } = rootContext.auth;

  const signout = () => {
    const { connectByGoogle } = isAuthenticatedUser;
    if (connectByGoogle) googleSignOut();
    nativeSignOut(isAuthenticatedUser, () => history.push("/"));
  };
  return signout;
};

export default useLogout;
