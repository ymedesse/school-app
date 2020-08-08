import React, { useContext, useEffect } from "react";
import { useState } from "reinspect";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { ADMIN_DASHBOARD_LINK } from "../../admin/routerLinks";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import SignupDialog from "../../auth/components/SignupDialog";
import SigninDialog from "../../auth/components/SigninDialog";
import UserMenu from "../../user/components/UserProfileMenu";
import SearchField from "../../Catalogue/components/SearchField";
import RootContext from "../../rootContext/context";
import AdminContext from "../../admin/context/AdminContext";
import { PreviousIconButton } from "../../components/assets";

import ShoppingCart from "../../cart/components/ShortViews";
import AdminDashboardMenu from "../../admin/components/AdminDashboardMenu";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";

const drawerWidth = 240;

const PrimarySearchAppBar = () => {
  const classes = useStyles();
  //const [setMobileMoreAnchorEl] = useState(null);

  const history = useHistory();
  // const [authenticatedUser, setAuthenticatedUser] = useState(false);
  const [open, setOpen] = useState(false);

  const rootContext = useContext(RootContext);
  const adminContext = useContext(AdminContext);

  const { cart, removeFromCart } = rootContext.cart;
  const {
    adminMode,
    setAdminMode,
    isAuthenticatedUser,
    signout
  } = rootContext.auth;
  const {
    currentViewerTitle,
    currentViewerAction,
    index,
    previous,
    initializeViewer
  } = adminContext.layout;

  useEffect(() => {
    !adminMode && setOpen(false);
  }, [adminMode]);

  // handle
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleMobileMenuOpen = event => {
    //  setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  // component
  const showLoggedMenu = isAuthenticatedUser && (
    <>
      <IconButton
        aria-label="favorite"
        className={classes.iconButton}
        color="inherit"
      >
        <Badge badgeContent={"2"} color="secondary">
          <FavoriteBorderIcon color="secondary" />
        </Badge>
      </IconButton>

      <ShoppingCart cart={cart} removeItem={removeFromCart} />

      <IconButton color="inherit">
        <Badge badgeContent={"1"} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <UserMenu
        isAuthenticatedUser={isAuthenticatedUser}
        signout={() => {
          signout(isAuthenticatedUser, () => history.push("/"));
        }}
        adminRole={isAuthenticatedUser.user.isAdmin}
      />
    </>
  );

  const showLogOfMenu = !isAuthenticatedUser && (
    <>
      <ShoppingCart cart={cart} removeItem={removeFromCart} />
      <SigninDialog classes={classes} />
      <SignupDialog classes={classes} />
    </>
  );

  const desktopMenuBare = (
    <>
      {showLoggedMenu}
      {showLogOfMenu}
    </>
  );

  const logoAndWebSiteTitle = (
    <RouterLink to="/">
      <Typography className={classes.title} variant="h6" noWrap>
        Librairie LBU
      </Typography>
    </RouterLink>
  );

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
            [classes.hide]: open
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

  
  const liveHeader = (
    <>
      {logoAndWebSiteTitle}
      <div className={classes.grow} />
      <SearchField />
      <div className={classes.sectionDesktop}>{desktopMenuBare}</div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>
    </>
  );

  return (
    // <UserProvider>
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar></Toolbar>
      </AppBar>

      <AppBar
        position="fixed"
        color="inherit"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>{!adminMode ? liveHeader : adminHeader}</Toolbar>
      </AppBar>
      {adminMode && (
        <AdminDashboardMenu
          setAdminMode={setAdminMode}
          open={open}
          setOpen={setOpen}
          classes={classes}
        />
      )}
      {/* {!adminMode && mobileDevice && (
        <AdminDashboardMenu open={open} setOpen={setOpen} classes={classes} />
      )} */}
    </>
  );
};

export default PrimarySearchAppBar;

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      [theme.breakpoints.up("sm")]: {
        marginRight: "36px"
      }
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(0),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1
      }
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    },
    grow: {
      flexGrow: 1
    },

    button: {
      margin: theme.spacing(1)
    },

    title: {
      // display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.08),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.black, 0.04)
      },

      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    leftIcon: {
      marginRight: theme.spacing(1)
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
        right: "opx"
      }
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200,
        "&:focus": {
          width: 400
        }
      } 
      
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    }
  };
});
