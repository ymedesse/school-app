import React from "react";
import Divider from "@material-ui/core/Divider";
import Popover from "@material-ui/core/Popover";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export default function MenuPopover({ menus, actionner }) {
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

  const content = (
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

  return (
    <>
      <Popover
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {content}
      </Popover>
      {actionner({ handleClick })}
    </>
  );
}
