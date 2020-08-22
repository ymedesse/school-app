import React from "react";
import useSWR, { trigger } from "swr";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ListIcon from "@material-ui/icons/List";
import InfoIcon from "@material-ui/icons/Info";
import CancelIcon from "@material-ui/icons/Cancel";
import purple from "@material-ui/core/colors/purple";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import OrderContent from "../fournitureList";
import { ORDERS_LINK, INSTALLMENT_HISTORY_LINK } from "../../../routerLinks";
import { getStatusColor } from "../../container/utils";
import ListSkeleton from "../../../components/ListSkeleton";
import { PreviousButton } from "../../../components/Buttons";
import { infoConfig, shippingConfig } from "./fieldsConfig.js";
import IconButtonMedia from "../../../components/IconButtonMedia";
import useDataDisplayer from "../../../components/hook/useDataFieldsDisplayer";
import ErrorBoundarySuspense from "../../../components/ErrorBoundarySuspense";
import SwrRender from "../../../components/SwrRender";

import {
  TitleTypography,
  LargeTypography,
} from "../../../components/Typography";
import SuspensePaper from "../../../components/SuspensePaper";

const Form = ({ fetcher, url, handlePay, handleCancel, history, ...props }) => {
  const classes = useStyles();

  const { data } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    suspense: true,
  });
  // console.log({ data });
  const error = !data ? true : data && data.error ? true : false;

  const { displayFields } = useDataDisplayer(data);

  const {
    id,
    totalAmount,
    // date_created,
    createdAt,
    payment,
    shipping,
    leftToPay,
    status,
    type,
    amountPaid,
    cancellable,
    isCancelled = false,
    paymentsCount,
  } = !error ? data : {};

  const showFields = (config, source, title) => {
    return displayFields(
      config,
      {
        rootGridProps: { spacing: 1 },
        itemGridProps: {},
        title,
      },
      source
    );
  };

  const showInfoTitle = (title, icon) => (
    <Box alignItems="center" display="flex" width="100%">
      <Box mt={1} mr={1}>
        {icon}
      </Box>
      <Box flexGrow={1}>
        <TitleTypography className={classes.inline}>{title}</TitleTypography>
      </Box>
    </Box>
  );

  const goToPaymentsHistory = () => {
    history.push(INSTALLMENT_HISTORY_LINK + "/" + id);
  };

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
          <Box>
            {paymentsCount > 0 && (
              <IconButtonMedia
                color="default"
                variant="text"
                icon={<ReceiptIcon />}
                onClick={goToPaymentsHistory}
                textButtonProps={{ label: "Historiques" }}
              />
            )}
            {cancellable && (
              <IconButtonMedia
                icon={<CancelIcon />}
                textButtonProps={{ label: "Annuler" }}
                onClick={() => handleCancel && handleCancel(() => trigger(url))}
                color="default"
                disableElevation
                // size="medium"
              />
            )}

            {!isCancelled && leftToPay > 0 && (
              <IconButtonMedia
                icon={<CreditCardIcon />}
                textButtonProps={{ label: "Payer" }}
                onClick={() => handlePay && handlePay()}
                variant="contained"
                color="primary"
                disableElevation
                // size="medium"
              />
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  const showInfo = () => {
    const source = {
      createdAt,
      type,
      amountPaid,
      paymentCount: payment.legnth,
      paymentsCount,
    };

    return (
      <SuspensePaper>
        {showInfoTitle("Informations sur votre commande", <InfoIcon />)}
        {showFields(infoConfig, source)}
      </SuspensePaper>
    );
  };

  const showShipping = () => {
    const { method_title, total: shippingTotal, address, note } =
      shipping || {};

    const { firstName, lastName, city = {}, postal } = address;
    const addressText = `${firstName || ""} ${lastName || ""} , ${
      postal || ""
    } ${city && (city.name || "")}`;

    const source = {
      method_title,
      total: shippingTotal,
      address: addressText,
      phone: address.phone,
      email: address.email,
      description: address.description,
      note,
    };

    return (
      <SuspensePaper>
        {showInfoTitle("Livraison", <LocalShippingIcon />)}
        {showFields(shippingConfig, source)}
      </SuspensePaper>
    );
  };

  const showProduct = () => {
    return (
      <>
        <SuspensePaper>
          {showInfoTitle("Détails de la commande", <ListIcon />)}

          <ErrorBoundarySuspense fallback={<ListSkeleton count={4} />}>
            <OrderContent showTitle={false} order={data} />
          </ErrorBoundarySuspense>
        </SuspensePaper>
      </>
    );
  };

  return (
    <SwrRender data={data}>
      {() => (
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="flex-start"
          className={classes.root}
        >
          <CssBaseline />
          <PreviousButton
            color="primary"
            variant="text"
            onClick={() => history.push(ORDERS_LINK)}
          >
            Commandes
          </PreviousButton>
          {showTitle()}
          <div className={classes.margin} />
          <Grid container item sm={6} xs={12}>
            {showInfo()}
          </Grid>
          <Grid container item sm={6} xs={12}>
            {showShipping()}
          </Grid>
          <Grid container item xs={12}>
            {showProduct()}
          </Grid>
        </Grid>
      )}
    </SwrRender>
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
