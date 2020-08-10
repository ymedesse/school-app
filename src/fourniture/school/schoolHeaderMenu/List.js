import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

// import { SCHOOL_LIST_LINK } from "../../../routerLinks";
import useSchoolsShortList from "../../hook/useSchoolsShortList";

const SchoolListHeaderMenu = ({ handleClose }) => {
  const schools = useSchoolsShortList();

  return (
    <MenuList
      id="customized-menu"
      // autoFocusItem={open}
      // keepMounted
    >
      {schools.map((item, index) => (
        <StyledMenuItem
          key={index}
          dense={true}
          onClick={() => handleClose()}
          component={RouterLink}
          to={item.link}
        >
          {item.name}
        </StyledMenuItem>
      ))}

      {/* <StyledMenuItem
        dense={true}
        onClick={() => handleClose()}
        component={RouterLink}
        to={SCHOOL_LIST_LINK}
      >
        Plus d'écoles ...
      </StyledMenuItem> */}
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
