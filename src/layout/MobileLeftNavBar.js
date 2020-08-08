import React from "react";
import clsx from "clsx";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Badge from "../components/Badge";
import Skeleton from "@material-ui/lab/Skeleton";
import { MiniValueText } from "../components/LabelValueTypography";

const MenuListes = React.lazy(() => import("./components/MobileMenuListes"));

const drawerWidth = 240;

const MobileLeftMenu = ({ user, open, setOpen, signout, ...props }) => {
  const theme = useTheme();
  const classes = useStyles();
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      open={open}
    >
      <Box display="flex" width="100%">
        {open && (
          <Box margin="auto" flexGrow={1}>
            {user && (
              <>
                <Badge large={true} user={user} />
                <MiniValueText
                  className={classes.name}
                  color="inherit"
                >{`Bonjour ${
                  user.nomAfficher || user.lastName || user.firstName || ""
                }`}</MiniValueText>
              </>
            )}
          </Box>
        )}
        <Box>
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
        </Box>
      </Box>
      <Divider />
      <React.Suspense fallback={fallback}>
        <MenuListes user={user} signout={signout} />
      </React.Suspense>
    </Drawer>
  );
};

export default MobileLeftMenu;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
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
    name: {
      display: "block!important",
      margin: "auto",
      textAlign: "end",
    },
  };
});

const fallback = (
  <div>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
      <Skeleton
        key={index}
        variant="rect"
        width=""
        height={30}
        style={{
          height: "25px",
          width: "30px",
          margin: "24px auto",
        }}
      />
    ))}
  </div>
);
