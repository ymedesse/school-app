import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import purple from "@material-ui/core/colors/purple";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { getStatusColor } from "../container/utils";
import Alert from "@material-ui/lab/Alert";
import SubmitButton from "../../../Paiement/Billing/SubmitButton";
import ScanButton from "../../../Paiement/Billing/ScanButton";

import {
  TitleTypography,
  LargeTypography,
} from "../../../components/Typography";

import { ValueText } from "../../../components/LabelValueTypography";
import { dateToText } from "../../../utils";
import Form from "./Form";

const QrPaymentContent = ({ data, rescane }) => {
  const classes = useStyles();

  const {
    order,
    status: qrStatus,
    dateExpire,
    expired,
    createdAt,
    amount,
  } = data;
  const { id, totalAmount, leftToPay, status, isCancelled = false } =
    order || {};

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

  const showErrorMessage = () => {
    const message =
      qrStatus.id === "used"
        ? "Ce qrCode a été déja utilisé"
        : expired
        ? "ce qrCode n'est plus valide"
        : undefined;
    return message && <Alert severity="error">{message}</Alert>;
  };

  const unvalidCode = () => {
    return qrStatus.id === "used" ? true : expired ? true : false;
  };

  const showContent = () => (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <LabelText> Montant</LabelText>
        <ValueText> {amount} Fcfa </ValueText>
      </Grid>

      <Grid item xs={12}>
        <LabelText> Crée le </LabelText>
        <ValueText> {dateToText(createdAt)}</ValueText>
      </Grid>

      <Grid item xs={12}>
        <LabelText> Etat </LabelText>
        <ValueText color={expired ? "secondary" : "inherit"}>
          {expired
            ? `Expiré depuis le ${dateToText(dateExpire)}`
            : qrStatus.label}
        </ValueText>
      </Grid>

      <Grid style={{ marginTop: "8px" }} item xs={12}>
        {unvalidCode() ? showErrorMessage() : <Form />}
      </Grid>
    </Grid>
  );

  return (
    <div>
      {showTitle()}
      <div className={classes.margin} />
      <div className={classes.margin} />
      <TitleTypography> Information paiement qrcode</TitleTypography>
      <Divider />
      <div className={classes.margin} />
      <div className={classes.margin} />

      {showContent()}
      <div className={classes.margin} />
      <div className={classes.margin} />

      {unvalidCode() ? (
        <ScanButton
          color="inherit"
          fullWidth={true}
          onClick={rescane}
          label="Re-scanner un autre"
        />
      ) : (
        <SubmitButton submitLabel="Payer" fullWidth={true} />
      )}
    </div>
  );
};

export default React.memo(QrPaymentContent);

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
