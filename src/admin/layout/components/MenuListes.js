import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { generalItems } from "../../core/config";
import { Link as RouterLink } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";

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

const MenuList = ({ signout, user, setAdminMode }) => {
  const classes = useStyles();
  const [childsOpener, setChildsOpener] = useState(
    generalItems
      .filter((item) => item.child !== undefined)
      .map((item) => {
        return item.child !== undefined && { id: item.id, open: false };
      })
  );

  const parentHandleClick = (id) => {
    const index = generalItems.findIndex((item) => item.id === id);
    const item = generalItems[index];
    item.child !== undefined && setOpenChild(id);
  };

  const setOpenChild = (id) => {
    const index = childsOpener.findIndex((item) => item.id === id);
    if (index !== -1) {
      childsOpener[index].open = !childsOpener[index].open;
      setChildsOpener([...childsOpener]);
    }
  };

  const oponerItemById = (id) => {
    return childsOpener.find((item) => item.id === id);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Gestion
        </ListSubheader>
      }
      className={classes.root}
    >
      {generalItems.map((item, index) => {
        return (
          item.isAllowed(user) && (
            <div key={index}>
              <ListItem
                component={RouterLink}
                to={item.path}
                onClick={() => parentHandleClick(item.id)}
                button
              >
                <ListItemIcon>
                  <Tooltip title={item.title} interactive>
                    {item.itemIcon}
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={item.title} />

                {item.child !== undefined && (
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => parentHandleClick(item.id)}
                      edge="end"
                      aria-label="comments"
                      className={classes.childIcon}
                    >
                      {oponerItemById(item.id).open ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
              {item.child !== undefined && (
                <Collapse
                  in={oponerItemById(item.id).open}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.child.map((childItem, index) => (
                      <ListItem
                        key={index}
                        button
                        className={classes.nested}
                        component={RouterLink}
                        // onClick={() => parentHandleClick(item.id)}
                        to={childItem.path}
                      >
                        <ListItemIcon>{childItem.itemIcon}</ListItemIcon>
                        <ListItemText primary={childItem.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          )
        );
      })}

      <Divider />
      {user && (
        <ListItem
          component={RouterLink}
          to="#"
          onClick={() => signout()}
          button
        >
          <ListItemIcon>
            <Tooltip title="Déconnexion" interactive>
              <ExitToAppIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </ListItem>
      )}
      {user && (
        <ListItem
          component={RouterLink}
          to="/"
          onClick={() => setAdminMode(false)}
          button
        >
          <ListItemIcon>
            <Tooltip title="Passer en live mode" interactive>
              <ScreenShareIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Live Mode" />
        </ListItem>
      )}
    </List>
  );
};

const isEqual = (prev, next) => {
  return JSON.stringify(prev.user) === JSON.stringify(next.user);
};
export default React.memo(MenuList, isEqual);
