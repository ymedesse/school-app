import React, { useContext } from "react";
import { useState } from "reinspect";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import context from "../rootContext/context";
import MobileLeftMenu from "./MobileLeftNavBar";
// import SearchField from "./components/Search";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
// import Badge from "@material-ui/core/Badge";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import UserMenu from "../DashBoard/headerMenu/UserProfileMenu";
import SigninDialog from "../auth/components/SigninDialog";
import SignupDialog from "../auth/components/SignupDialog";
import DashboardMenuIcone from "./components/DashbordIcone";
import AdminNavbar from "../admin/layout/NavBar";
import useLogOut from "../auth/hooks/useLogOut";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import LazyLoad from "../components/LazyLoad";
import clsx from "clsx";
import SchoolMenu from "../fourniture/school/schoolHeaderMenu";
import LbuMenu from "../lbu/headerMenu";
import ShoppingCart from "../cart/components/ShortViews";
const drawerWidth = 240;

const HeaderAppBar = () => {
  const classes = useStyles();
  const signout = useLogOut();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const history = useHistory();
  // const [authenticatedUser, setAuthenticatedUser] = useState(false);
  const [open, setOpen] = useState(false);

  const rootContext = useContext(context);

  const { cart, removeFromCart, commande = {} } = rootContext.cart;
  const auth = rootContext.auth;
  const { adminMode, isAuthenticatedUser } = auth;
  const { user } = isAuthenticatedUser || {};
  const handleRemoveOnCart = (file) => (id, listId) => {
    removeFromCart(id, listId, () => {}, file);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    !adminMode && setOpen(false);
  }, [adminMode]);

  const logoAndWebSiteTitle = (
    <Button
      variant="text"
      size="large"
      disableRipple={true}
      disableFocusRipple={true}
      component="h4"
      onClick={() => history.push("/")}
      color="inherit"
    >
      LBU, Zéro Stress
    </Button>
  );

  const rigthLoggedMenu = () => (
    <>
      <LazyLoad>
        <ShoppingCart
          values={commande}
          removeItem={handleRemoveOnCart("commande")}
          icon={<LocalMallIcon />}
          file="commande"
        />
      </LazyLoad>

      <LazyLoad>
        <ShoppingCart
          values={cart}
          removeItem={handleRemoveOnCart("cart")}
          file="cart"
        />
      </LazyLoad>

      {mobile ? (
        <>
          {/* <IconButton color="inherit">
        <Badge badgeContent={"1"} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton> */}
        </>
      ) : (
        <UserMenu
          isAuthenticatedUser={isAuthenticatedUser}
          signout={signout}
          adminRole={user.isAdmin}
          user={user}
        />
      )}
    </>
  );

  const rigthLogOfMenu = () => (
    <>
      <SigninDialog classes={classes} />
      <SignupDialog showButton={false} classes={classes} />
    </>
  );

  const rigthMenu = () => (
    <>{isAuthenticatedUser ? rigthLoggedMenu() : rigthLogOfMenu()}</>
  );

  const liveHeader = () => (
    <>
      {mobile && (
        <>
          <DashboardMenuIcone open={open} handleDrawerOpen={handleDrawerOpen} />
          <MobileLeftMenu
            signout={signout}
            user={user}
            open={open}
            setOpen={setOpen}
            classes={classes}
          />
        </>
      )}
      {!open && logoAndWebSiteTitle}

      <div className={classes.grow} />

      {!mobile && (
        <>
          {/* <SearchField /> */}
          <LbuMenu />
          <SchoolMenu />
        </>
      )}

      <Divider orientation="vertical" flexItem />
      {rigthMenu()}
    </>
  );

  const showAdminNavBar = () => <AdminNavbar setOpen={setOpen} open={open} />;

  const showLiveNavBar = () => (
    <>
      <AppBar
        position="fixed"
        // color="inherit"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>{liveHeader()}</Toolbar>
      </AppBar>
      )
    </>
  );

  return adminMode ? showAdminNavBar() : showLiveNavBar();
};

export default HeaderAppBar;

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
