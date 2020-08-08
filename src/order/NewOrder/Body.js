import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";
import ErrorBoundarySuspense from "../../components/ErrorBoundarySuspense";
import useDataDisplayer from "../../components/hook/useDataFieldsDisplayer";
import ListSkeleton from "../../components/ListSkeleton";

import { dateToText } from "../../utils";
import { LargeTypography } from "../../components/Typography";
import OrderContent from "../components/fournitureList";
const Checkout = ({ order: initOrder, id, getReadOrderUrl, getFetcher }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState(initOrder);
  const { displayFields } = useDataDisplayer(order);

  const url = !initOrder ? getReadOrderUrl(id) : null;

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

  const diplayPayment = () => {
    const source = { ...order.payment[0], leftToPay: order.leftToPay };
    return showFields(paymentConfig, source, "Paiement");
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

  const error = !order ? true : order && order.error ? true : false;

  return !error ? (
    <>
      <div className={classes.margin} />
      {displayInfo()}
      <div className={classes.margin} />
      {diplayPayment()}

      <div className={classes.margin} />
      {diplayShipping()}

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
    formator: (v) => `${v} Fcfa`,
  },
  {
    label: "Nature",
    field: "type",
  },
];

const paymentConfig = [
  {
    label: "Moyen de paiement",
    field: "method_title",
  },
  {
    label: "Montant payé",
    field: "amount",
    formator: (v) => `${v} Fcfa`,
  },
  {
    label: "Reste à payer",
    field: "leftToPay",
    formator: (v) => <i>{`${v} Fcfa`}</i>,
  },
  {
    label: "Numéro Mobile de paiement",
    field: "phone",
  },
  {
    label: "Numéro de la transaction",
    field: "transaction_id",
  },
];

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
