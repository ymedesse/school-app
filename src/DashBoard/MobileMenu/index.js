import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ToolTipMenu from "../../components/ToolTipMenuCtrl";
import MenuList from "./MenuList";
import { ButtonWithIcon } from "../../components/Buttons";

const UserMenu = () => {
  return (
    <ToolTipMenu
      actionner={(handleClick) => (
        <ButtonWithIcon
          variant="contained"
          // color="primary"
          onClick={handleClick}
          endIcon={<MenuIcon />}
        >
          Menu
        </ButtonWithIcon>
      )}
      content={({ handleClose }) => <MenuList handleClose={handleClose} />}
      skeletonCount
    />
  );
};

export default UserMenu;
