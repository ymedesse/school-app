import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import useSWR from "swr";

import { useHistory } from "react-router-dom";
import ErrorBoundarySuspense from "../../components/ErrorBoundarySuspense";
import useDataDisplayer from "../../components/hook/useDataFieldsDisplayer";
import useMediaDetector from "../../components/hook/useMediaDetector";
import ListSkeleton from "../../components/ListSkeleton";
import { dateToText } from "../../utils";
import { LargeTypography } from "../../components/Typography";
import OrderContent from "../components/fournitureList";
import QrCodeCard from "../../Paiement/components/QrCodeCard";
import Alert from "@material-ui/lab/Alert";
import { ValueText, LabelText } from "../../components/LabelValueTypography";
import { INSTALLMENT_HISTORY_LINK } from "../../routerLinks";

const Checkout = ({ order: initOrder, id, getReadOrderUrl, getFetcher }) => {
  const history = useHistory();
  const classes = useStyles();
  const [order, setOrder] = React.useState(initOrder);
  const { displayFields } = useDataDisplayer(order);
  const isMobile = useMediaDetector();
  const url = !initOrder ? getReadOrderUrl(id) : null;

  const installmentUrl = INSTALLMENT_HISTORY_LINK + "/" + id;
  const { data: result } = useSWR(url, getFetcher(), {
    refreshInterval: 0,
    revalidateOnFocus: false,
    suspense: true,
  });

  React.useEffect(() => {
    if (result && !result.error) {
      setOrder(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const displayInfo = () => {
    return showFields(infoConfig);
  };

  const isLocalPayment = () => {
    const { payment } = order;
    const method = payment[0].method;
    return method === "localPayment";
  };

  const diplayPayment = () => {
    const source = { ...order.payment[0], leftToPay: order.leftToPay };

    return showFields(paymentConfig(isLocalPayment()), source, "Paiement");
  };

  const diplayShipping = () => {
    const { method_title, address = {}, total } = order.shipping || {};
    const source = {
      method_title,
      description: address.description,
      phone: address.phone,
      postal: address.postal,
      email: address.email,
      total,
    };
    return showFields(shippingConfig, source, "Livraison");
  };

  const showFields = (config, source, title) => {
    return displayFields(
      config,
      {
        rootGridProps: { spacing: 1, component: "ul" },
        itemGridProps: { component: "li" },
        title,
      },
      source
    );
  };

  const handleInstallmentlick = (payment) => (e) => {
    history.push(installmentUrl);
  };

  const showQrCodeBody = () => {
    const { payment } = order;
    const { qrCode } = payment[0];
    return qrCode ? (
      <>
        <div className={classes.margin} />
        <Alert severity="info">
          <ValueText>
            Nous vous prions de bien vouloir valider votre commande en payant
            avec ce qrcode dans notre magasin de vente dans un délai de 24h. Merci!
          </ValueText>
        </Alert>
        <Paper className={classes.qrCode} square variant="outlined">
          <QrCodeCard qrCode={qrCode} order={order} />
        </Paper>
        <LabelText>
          * Vous pouvez revoir ce code dans
          <Link
            color="primary"
            component="button"
            onClick={handleInstallmentlick(payment[0])}
          >
            {` votre historique de paiement`}
          </Link>
        </LabelText>
      </>
    ) : (
      <Typography>QrCode invalide. Veuillez regénérer un autre</Typography>
    );
  };

  const error = !order ? true : order && order.error ? true : false;

  return !error ? (
    <>
      <Grid direction={isMobile ? "column-reverse" : "row"} container>
        <Grid item sm={7} xs={12}>
          <div className={classes.margin} />
          {displayInfo()}
          <div className={classes.margin} />
          {diplayPayment()}
          <div className={classes.margin} />
          {diplayShipping()}
        </Grid>
        <Grid item sm={5} xs={12}>
          <div className={classes.margin} />
          {isLocalPayment() && showQrCodeBody()}
        </Grid>
      </Grid>

      <div className={classes.margin} />

      <div>
        <LargeTypography>Détails de la commande </LargeTypography>
      </div>
      <div className={classes.margin} />

      <ErrorBoundarySuspense fallback={<ListSkeleton count={4} />}>
        <OrderContent order={order} />
      </ErrorBoundarySuspense>
    </>
  ) : (
    <></>
  );
};

export default Checkout;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  qrCode: {
    padding: theme.spacing(2),
  },

  margin: {
    marginBottom: theme.spacing(2),
  },
}));

const infoConfig = [
  {
    label: "Numéro de commande",
    field: "id",
  },
  {
    label: "Date",
    field: "createdAt",
    formator: (v) => dateToText(v),
  },
  {
    label: "Total",
    field: "totalAmount",
    formator: (v) => `${v || 0} Fcfa`,
  },
  {
    label: "Nature",
    field: "type",
  },
];

const paymentConfig = (isLocalPayment) => {
  const info = isLocalPayment
    ? []
    : [
        {
          label: "Numéro Mobile de paiement",
          field: "phone",
        },
        {
          label: "Numéro de la transaction",
          field: "transaction_id",
        },
      ];

  return [
    {
      label: "Moyen de paiement",
      field: "method_title",
    },
    {
      label: "Montant payé",
      field: "amount",
      formator: (v) => `${v || 0} Fcfa`,
    },
    {
      label: "Reste à payer",
      field: "leftToPay",
      formator: (v) => <i>{`${v || 0} Fcfa`}</i>,
    },
    ...info,
  ];
};

const shippingConfig = [
  {
    label: "Méthode de livraison",
    field: "method_title",
  },
  {
    label: "Frais de livraison",
    field: "total",
    formator: (v) => `${v} Fcfa`,
  },
  {
    label: "Adresse",
    field: "description",
  },
  {
    label: "Numéro à appeler",
    field: "phone",
  },
  {
    label: "Adresse mail",
    field: "email",
  },
];
