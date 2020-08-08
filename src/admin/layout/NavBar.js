import React, { useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { ADMIN_DASHBOARD_LINK } from "../routerLinks";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AdminContext from "../context/AdminContext";
import { PreviousIconButton } from "../../components/Buttons";
import AdminDashboardMenu from "./components/AdminDashboardMenu";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import useLogOut from "../../auth/hooks/useLogOut";

const drawerWidth = 240;

const AdminNavBar = ({ open, setOpen }) => {
  const classes = useStyles();
  const signout = useLogOut();
  const history = useHistory();

  const adminContext = useContext(AdminContext);

  const {
    currentViewerTitle,
    currentViewerAction,
    index,
    previous,
    initializeViewer,
  } = adminContext.layout;

  const auth = adminContext.auth;

  const { isAuthenticatedUser, setAdminMode } = auth;

  // handle
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleAdminPreview = () => {
    if (index === 0) {
      history.push(ADMIN_DASHBOARD_LINK);
      initializeViewer();
    } else {
      previous();
    }
  };

  const adminHeader = (
    <>
      {index === 0 ? (
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
      ) : (
        <PreviousIconButton onClick={handleAdminPreview} size={"medium"} />
      )}
      <Typography className={classes.title} variant="h6" noWrap>
        {currentViewerTitle}
      </Typography>
      <div className={classes.grow} />

      {currentViewerAction}
    </>
  );

  return (
    <>
      <AppBar
        position="fixed"
        // color="inherit"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>{adminHeader}</Toolbar>
      </AppBar>

      <AdminDashboardMenu
        signout={signout}
        user={isAuthenticatedUser.user}
        open={open}
        setOpen={setOpen}
        classes={classes}
        setAdminMode={setAdminMode}
      />
    </>
  );
};

export default AdminNavBar;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      [theme.breakpoints.up("sm")]: {
        marginRight: "36px",
      },
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(0),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    grow: {
      flexGrow: 1,
    },

    button: {
      margin: theme.spacing(1),
    },

    title: {
      // display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.08),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.black, 0.04),
      },

      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: theme.transitions.create("right"),
      "&:hover": {
        right: "opx",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200,
        "&:focus": {
          width: 400,
        },
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  };
});
