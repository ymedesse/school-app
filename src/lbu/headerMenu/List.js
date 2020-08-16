import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { withStyles } from "@material-ui/core/styles";
import { menusList } from "../constant";

const SchoolListHeaderMenu = ({ handleClose }) => {
  const handleClick = (link) => {
    handleClose();
    var win = window.open(link, "_blank");
    win.focus();
  };

  return (
    <MenuList
      id="customized-menu"
      // autoFocusItem={open}
      // keepMounted
    >
      {menusList.map((item, index) => (
        <StyledMenuItem
          key={index}
          dense={true}
          onClick={() => handleClick(item.link)}
          component={"li"}
          to={item.link}
        >
          {item.name}
        </StyledMenuItem>
      ))}
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

export default SchoolListHeaderMenu;
