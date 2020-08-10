import React from "react";
import Divider from "@material-ui/core/Divider";
import Popover from "@material-ui/core/Popover";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export default function MenuPopover({ menus, content, actionner }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const getDefaultContent = () => (
    <List dense={true}>
      {menus.map((item, index) =>
        item.divider ? (
          <Divider key={item.name} />
        ) : (
          <ListItem
            onClick={() => {
              handleClose();
              item.handleClick && item.handleClick();
            }}
            button
            key={item.name}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        )
      )}
    </List>
  );

  const getContent = () =>
    content ? content({ handleClose }) : menus ? getDefaultContent : "";

  return (
    <>
      <Popover
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {getContent()}
      </Popover>
      {actionner({ handleClick })}
    </>
  );
}
