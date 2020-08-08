import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { Link as RouterLink } from "react-router-dom";
import MenuList from "@material-ui/core/MenuList";

import { menuConfig } from "../config";

const menus = menuConfig.filter((item) => item.isRootLink);

const DashboardMobileMenu = ({ open, handleClose }) => {
  return (
    <MenuList
      id="customized-menu"
      autoFocusItem={open}
      // keepMounted
    >
      {menus.map((item, index) =>
        item.divider ? (
          <Divider key={index} light />
        ) : (
          <StyledMenuItem
            key={index}
            dense={true}
            onClick={() => handleClose()}
            component={RouterLink}
            to={item.path}
          >
            {item.title}
          </StyledMenuItem>
        )
      )}
    </MenuList>
  );
};

const StyledMenuItem = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    "&:hover": {
      color: "#007791",
    },
    "&:focus": {
      // backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default DashboardMobileMenu;
