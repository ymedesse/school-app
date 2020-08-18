import React from "react";
import { Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { menuConfig } from "./config";
import { DashBoardSkeleton } from "./Menu";
import useMediaDetector from "../components/hook/useMediaDetector";

const Menus = React.lazy(() => import("./Menu"));
const MobileMenu = React.lazy(() => import("./MobileMenu/index"));

const Dashboard = ({ match, ...props }) => {
  const classes = useStyles();
  const isMobile = useMediaDetector();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [match.path]);

  return (
    <>
      <Grid
        container
        spacing={isMobile ? 0 : 2}
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        className={classes.root}
      >
        <Grid item sm={3} xs={12}>
          <React.Suspense fallback={<DashBoardSkeleton />}>
            {isMobile ? <MobileMenu /> : <Menus />}
          </React.Suspense>
        </Grid>

        <Grid xs={12} sm={9} item>
          <div className={classes.dashboard}>
            {menuConfig.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                exact
                component={item.content}
              />
            ))}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  dashboard: {
    padding: theme.spacing(2, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0),
    },
  },
}));

export default Dashboard;
