import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";

const DashboardMenuIcone = ({ handleDrawerOpen, open = false }) => {
  const classes = useStyles();

  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      className={clsx(classes.menuButton, {
        [classes.hide]: open,
      })}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default DashboardMenuIcone;

const useStyles = makeStyles((theme) => {
  return {
    menuButton: {
      [theme.breakpoints.up("sm")]: {
        marginRight: "36px",
      },
      padding: "0px 0px 0px 12px",
    },
    hide: {
      display: "none",
    },
  };
});
