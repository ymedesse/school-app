import React from "react";
import useSWR from "swr";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import purple from "@material-ui/core/colors/purple";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { getStatusColor } from "../../container/utils";
import ErrorMessage from "../../../components/ErrorMessage";
import ErrorBoundarySuspense from "../../../components/ErrorBoundarySuspense";

import {
  TitleTypography,
  LargeTypography,
} from "../../../components/Typography";

const Form = ({ fetcher, url, handlePay, handleCancel, history, ...props }) => {
  const classes = useStyles();

  const { data } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    suspense: true,
  });
  const error = !data ? true : data && data.error ? true : false;

  const { id, totalAmount, leftToPay, status, isCancelled = false } = !error
    ? data
    : {};

  const showTitle = () => {
    const color = getStatusColor(status.id);
    return (
      <Box display="flex" alignItems="center" width="100%" mb={2}>
        <Box alignSelf="center" flexGrow={1}>
          <Box>
            <LargeTypography className={classes.inline}>
              {`Commande ${id}`}
            </LargeTypography>
            <ValueText style={{ color }}>{status.label}</ValueText>
          </Box>

          <Box>
            <TitleTypography className={classes.total}>
              <strong> {totalAmount} </strong> Fcfa
            </TitleTypography>
          </Box>
        </Box>
        <Box textAlign="right">
          {!isCancelled && leftToPay > 0 && (
            <Box textAlign="right">
              <LabelText>Solde dû : </LabelText>
              <TitleTypography color="secondary" className={classes.inline}>
                <strong> {` ${leftToPay || ""}`} </strong> Fcfa
              </TitleTypography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return !error ? (
    <Grid
      container
      spacing={1}
      direction="row"
      alignItems="flex-start"
      className={classes.root}
    >
      {showTitle()}
      <div className={classes.margin} />
    </Grid>
  ) : (
    <ErrorMessage />
  );
};

export default React.memo(Form);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
  },
  inline: {
    display: "inline",
  },
  status: {
    color: "chocolate",
  },
  total: {
    color: purple[500],
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
}));

const LabelText = ({ children, ...props }) => {
  return (
    <Typography style={{ display: "inline" }} variant="body2" {...props}>
      {children}
    </Typography>
  );
};

const ValueText = ({ children, ...props }) => {
  return (
    <Typography style={{ display: "inline" }} variant="subtitle2" {...props}>
      {children}
    </Typography>
  );
};
