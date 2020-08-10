import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import MenuList from "./MenuList";
import { ButtonWithIcon } from "../../components/Buttons";
import MenuPopOver from "../../components/MenuPopOver";

const UserMenu = () => {
  return (
    <MenuPopOver
      actionner={({ handleClick }) => (
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
    />
  );
};

export default UserMenu;
