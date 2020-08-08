import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ToolTipMenu from "../../components/ToolTipMenuCtrl";
import ProfileMenuList from "./MenuList";

import Badge from "../../components/Badge";

const UserMenu = ({ user, signout, adminRole }) => {
  const logOut = (handleClose) => async (event) => {
    signout();
    handleClose();
  };

  return (
    <ToolTipMenu
      actionner={(handleClick) => (
        <IconButton
          color="inherit"
          aria-controls="customized-menu"
          onClick={handleClick}
        >
          <Badge user={user} />
        </IconButton>
      )}
      content={({ handleClose }) => (
        <ProfileMenuList
          adminRole={adminRole}
          logOut={logOut(handleClose)}
          handleClose={handleClose}
        />
      )}
      skeletonCount
    />
  );
};

export default UserMenu;
