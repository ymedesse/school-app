import React from "react";
import context from "../rootContext/context";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ListSkeleton from "../components/ListSkeleton";
const Compte = React.lazy(() => import("./Compte"));
const Account = () => {
  const rootContext = React.useContext(context);
  const { isAuthenticatedUser } = rootContext.auth;
  const { updateUser, getFetcher, getUserInfoUrl, profile } = rootContext.user;

  const fetcher = getFetcher();
  const url = getUserInfoUrl();
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <React.Suspense
        fallback={
          <>
            <ListSkeleton count={3} margin="32px" height={120} />
          </>
        }
      >
        <Compte
          fetcher={fetcher}
          url={url}
          updateUser={updateUser}
          user={isAuthenticatedUser.user}
          profile={profile}
        />
      </React.Suspense>
    </Paper>
  );
};

export default Account;

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    padding: theme.spacing(2, 3),
     [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
}));
