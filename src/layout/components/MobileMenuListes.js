import React from "react";

import List from "@material-ui/core/List";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { ADMIN_DASHBOARD_LINK } from "../../routerLinks";
import useProfileLists from "../../DashBoard/hooks/useProfileHeaderMenuData";
import useSchoolsShortList from "../../fourniture/hook/useSchoolsShortList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  childIcon: {
    marginRight: "-24px",
  },
}));

const MenuList = ({ signout, user }) => {
  const classes = useStyles();
  const lists = useProfileLists();
  const schools = useSchoolsShortList();

  const getItemRow = (flist) => {
    return flist.map((item, index) =>
      !item.divider ? (
        <ListItem
          key={index}
          component={RouterLink}
          to={item.link || item.path}
          button
        >
          {item.icon && (
            <ListItemIcon>
              <Tooltip title={item.name} interactive>
                <ExitToAppIcon />
              </Tooltip>
            </ListItemIcon>
          )}
          <ListItemText primary={item.name} />
        </ListItem>
      ) : (
        <Divider key={index} component="li" />
      )
    );
  };

  const subHeader = (title = "") => (
    <ListSubheader component="div" id={`${title}`}>
      {title}
    </ListSubheader>
  );

  return (
    <>
      <List
        dense={true}
        aria-labelledby="Ecole"
        subheader={subHeader("Ecole")}
        disablePadding
        className={classes.root}
      >
        {getItemRow(schools)}
      </List>

      <List
        dense={true}
        aria-labelledby="Profile"
        subheader={subHeader("Profile")}
        disablePadding
        className={classes.root}
      >
        {getItemRow(lists)}
      </List>

      <List dense={true} disablePadding className={classes.root}>
        {user && (
          <ListItem
            component={RouterLink}
            to="#"
            onClick={() => signout()}
            button
            dense={true}
          >
            <ListItemIcon>
              <Tooltip title="Déconnexion" interactive>
                <ExitToAppIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItem>
        )}
        {user && user.isAadmin && (
          <>
            <Divider />
            <ListItem component={RouterLink} to={ADMIN_DASHBOARD_LINK} button>
              <ListItemText primary="Admin dashboard" />
            </ListItem>
          </>
        )}
      </List>
    </>
  );
};

const isEqual = (prev, next) => {
  return JSON.stringify(prev.user) === JSON.stringify(next.user);
};
export default React.memo(MenuList, isEqual);
