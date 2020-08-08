import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import * as routeLink from "../../routerLinks";
import { Link as RouterLink } from "react-router-dom";
import MenuList from "@material-ui/core/MenuList";
import useProfileHeaderMenuData from "../hooks/useProfileHeaderMenuData";

const UserMenu = ({ adminRole, logOut, open, handleClose }) => {
  const lists = useProfileHeaderMenuData();
  return (
    <MenuList
      id="customized-menu"
      autoFocusItem={open}
      // keepMounted
    >
      {lists.map((item, index) =>
        item.divider ? (
          <Divider key={index} light />
        ) : (
          <StyledMenuItem
            key={index}
            dense={true}
            onClick={() => handleClose()}
            component={RouterLink}
            to={item.link}
          >
            {item.name}
          </StyledMenuItem>
        )
      )}

      <StyledMenuItem dense={true} onClick={logOut}>
        Se déconnecter
      </StyledMenuItem>
      {adminRole && (
        <AdminMenuItem
          color="secondary"
          dense={true}
          onClick={() => handleClose()}
          component={RouterLink}
          to={routeLink.ADMIN_DASHBOARD_LINK}
        >
          Admin dashboard
        </AdminMenuItem>
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

const AdminMenuItem = withStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.primary,
    padding: theme.spacing(1, 2),
    "&:hover": {
      //  color: "#007791"
    },
    "&:focus": {
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        // color: theme.palette.common.white
      },
    },
  },
}))(MenuItem);

export default UserMenu;
