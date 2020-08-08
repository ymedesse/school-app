import React from "react";
import { Link as RouterLink } from "react-router-dom";
// import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import ListSkeleton from "../components/ListSkeleton";
import ListItemText from "@material-ui/core/ListItemText";

import { menuConfig } from "./config";
const menus = menuConfig.filter((item) => item.isRootLink);

const Menus = () => {
  const classes = useStyles();

  return (
    <>
      <List component="nav" className={classes.items} aria-label="contacts">
        {menus.map((menu, index) => (
          <ListItem
            divider
            button
            key={index}
            component={RouterLink}
            to={menu.path}
          >
            <ListItemText primary={menu.title} />
          </ListItem>
        ))}
        {/* 
        <Divider />

        <ListItem
          button
          component={RouterLink}
          to={routeLink.PARTENAIRE_DASHBOARD_LINK}
        >
          <ListItemText primary="Patenaire" />
        </ListItem> */}
      </List>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  items: {
    maxWidth: 280,
  },
}));

export default React.memo(Menus);

const DashBoardSkeleton = (props) => (
  <ListSkeleton count={menus.length} {...props} />
);

export { DashBoardSkeleton };
