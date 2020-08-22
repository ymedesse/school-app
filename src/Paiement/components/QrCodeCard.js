import React from "react";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import QrCode from "./QrCode";
import LazyLoad from "../../components/LazyLoad";
import { ValueText } from "../../components/LabelValueTypography";
import {
  TitleTypography,
  SubTitleTypography,
} from "../../components/Typography";

import { dateToText } from "../../utils/index";

const QrCodeCard = ({ order, qrCode }) => {
  const { code, amount, dateExpire, expired, status = {} } = qrCode || {};
  const { id, type } = order || {};
  const orderTitle = order ? type + " n° " + id : "";

  const showAlert = (message, serverty = "error") => {
    return (
      <Alert severit={serverty}>
        <ValueText>{message}</ValueText>
      </Alert>
    );
  };
  return (
    <Grid style={{ textAlign: "center" }} spacing={2} container>
      <Grid item xs={12}>
        <div style={{ marginTop: "8px" }} />
        <div style={{ marginTop: "8px" }} />
        {code ? (
          <LazyLoad>
            <QrCode code={code} />
          </LazyLoad>
        ) : (
          "Aucun code à afficher"
        )}
      </Grid>

      <Grid item xs={12}>
        <div style={{ marginTop: "8px" }} />

        <TitleTypography> Montant : {amount} Fcfa </TitleTypography>
        <SubTitleTypography>{orderTitle}</SubTitleTypography>
        <div style={{ marginTop: "8px" }} />

        {status.id === "used"
          ? showAlert("Ce code a été déja utilisé!")
          : !expired
          ? showAlert(
              `NB: Ce code expirre le ${dateToText(dateExpire)}`,
              "info"
            )
          : showAlert("expirré")}
      </Grid>
    </Grid>
  );
};

export default QrCodeCard;
