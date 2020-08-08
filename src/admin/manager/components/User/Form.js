import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Skeleton from "@material-ui/lab/Skeleton";
import FaceIcon from "@material-ui/icons/Face";
import EventNoteIcon from "@material-ui/icons/EventNote";
import AirplayIcon from "@material-ui/icons/Airplay";
import { dateToText } from "../../../../utils";
import { FormSpy } from "react-final-form";
import { TitleTypography } from "../../../../components/Typography";

const Badge = React.lazy(() => import("../../../../components/Badge"));
const RoleSelector = React.lazy(() => import("../Role/RolesSelectorMui"));

export default function Info({ user }) {
  const classes = useStyles();
  // const getRole = (roleId) => roles.find((item) => item.id === roleId);

  const { connectCount, createdAt, lastActive } = user;

  return (
    <>
      <Paper className={classes.paper}>
        <React.Suspense fallback={<Skeleton variant="circle" width={52} />}>
          <Badge user={user} />
          <div className={classes.displayName}>{user.nomAfficher}</div>
        </React.Suspense>

        <Divider />
        <div className={classes.body}>
          <Typography variant="h5" className={classes.field}>
            {user.email}
          </Typography>

          {user.lastName && (
            <div className={classes.line}>
              <FaceIcon className={classes.icon} />
              <Typography variant="subtitle1">{user.lastName}</Typography>
            </div>
          )}

          <div className={classes.line}>
            <PhoneAndroidIcon className={classes.icon} />
            <Typography variant="subtitle1">
              <i> {user.phone} </i>
            </Typography>
          </div>

          <div className={classes.line}>
            <EventNoteIcon className={classes.icon} />
            <Typography variant="subtitle1">
              Dernière connexion : <i> {dateToText(lastActive)} </i>
            </Typography>
          </div>

          <div className={classes.line}>
            <AirplayIcon
              color={connectCount > 0 ? "action" : "inherit"}
              className={classes.icon}
            />
            <Typography variant="subtitle1">
              connecté {connectCount} fois depuis le {dateToText(createdAt)}
            </Typography>
          </div>
        </div>

        <Divider />
        <div className={classes.body}>
          <TitleTypography>Privillèges </TitleTypography>

          <React.Suspense fallback="loading">
            <FormSpy subscription={{ values: true }}>
              {({ values }) => {
                return (
                  <RoleSelector
                    classes={classes}
                    className={classes.TextField}
                    selectedValues={values.roles || []}
                  />
                );
              }}
            </FormSpy>
          </React.Suspense>
        </div>
      </Paper>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // "& > *": {
    //   margin: theme.spacing(1)
    // }
  },
  icon: {
    marginRight: theme.spacing(1.8),
    marginTop: theme.spacing(0.25),
  },
  paper: {
    padding: theme.spacing(3),
    minHeight: "516px",
    overflowY: "auto",
    maxHeight: "516px",
  },
  body: {
    padding: theme.spacing(2, 0),
  },
  divider: {
    margin: theme.spacing(0.5),
  },
  displayName: {
    margin: "6px 0px",
    textAlign: "center",
    width: "100%",
  },
  field: {
    // marginTop: theme.spacing(1),
  },
  line: {
    display: "flex",
    margin: theme.spacing(1, 0),
  },
}));
