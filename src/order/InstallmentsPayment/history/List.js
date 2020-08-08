import React, { useEffect, lazy, useState } from "react";
import useSWR from "swr";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import ListSkeleton from "../../../components/ListSkeleton";

import {
  TitleTypography,
  LargeTypography,
} from "../../../components/Typography";
import compareProps from "../../../utils/compareProps";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import IconButtonMedia from "../../../components/IconButtonMedia";
import { LabelText, ValueText } from "../../../components/LabelValueTypography";
import { INSTALLMENT_PAYMENT_LINK } from "../../../routerLinks";

const Row = lazy(() => import("./Row"));

const OrderList = ({
  fetcher,
  id,
  url,
  currentOrder,
  history,
  inAdminMode,
  ...restProps
}) => {
  const classes = useStyles();

  const [state, setState] = useState({
    payment: [],
  });

  const { payment, totalAmount, leftToPay } = state;

  const { data: sourceData } = useSWR(url, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: true,
  });

  const error = !sourceData
    ? true
    : sourceData && sourceData.error
    ? true
    : false;

  useEffect(() => {
    if (sourceData && !sourceData.error) {
      setState((state) => ({ ...state, ...sourceData }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceData]);

  const handlePay = () => {
    history.push(INSTALLMENT_PAYMENT_LINK + "/" + id);
  };

  const showTitle = () => {
    return (
      <Box display="flex" alignItems="center" width="100%" mb={2}>
        <Box alignSelf="center" flexGrow={1}>
          <Box>
            <LargeTypography className={classes.inline}>
              {`Commande n° ${id}`}
            </LargeTypography>
          </Box>
          <Box>
            <TitleTypography className={classes.total}>
              <strong> {totalAmount || ""} </strong> Fcfa
            </TitleTypography>
          </Box>
        </Box>

        {leftToPay !== 0 && (
          <Box textAlign="right">
            <Box textAlign="right">
              <LabelText>Solde dû : </LabelText>
              <TitleTypography color="secondary" className={classes.inline}>
                <strong> {` ${leftToPay || ""}`} </strong> Fcfa
              </TitleTypography>
            </Box>

            <Box>
              <IconButtonMedia
                icon={<CreditCardIcon />}
                textButtonProps={{ label: "Payer" }}
                onClick={handlePay}
                variant="contained"
                color="primary"
                disableElevation
                // size="medium"
              />
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  const rowRenderer = (item, index) => {
    const id = item ? item._id : undefined;
    return (
      id && (
        <React.Suspense key={id || index} fallback={<ListSkeleton count={1} />}>
          <Row key={id || index} value={item} />
        </React.Suspense>
      )
    );
  };

  const showList = () => (
    <>
      {!inAdminMode && showTitle()}

      {!inAdminMode && <ValueText> Historique des paiements </ValueText>}
      <div className={classes.margin} />
      <Divider />
      <div className={classes.margin} />

      {count > 0 ? (
        <>
          <List className={classes.contents}>{payment.map(rowRenderer)}</List>
        </>
      ) : (
        <TitleTypography style={{ padding: "5px 0px" }}>
          Aucun paiement n'est trouvé pour cette commande
        </TitleTypography>
      )}
    </>
  );

  const count = error ? 0 : payment.length;

  return (
    <>
      {!error ? (
        <div className={classes.list}>{showList()}</div>
      ) : (
        <TitleTypography color="secondary">
          Une erreur s'est produite
        </TitleTypography>
      )}
    </>
  );
};

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["url"]);
};

export default React.memo(OrderList, isEqual);

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
  },
  inline: {
    display: "inline",
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
  appBar: {
    top: "auto",
    bottom: 0,
    position: "sticky",
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  suspense: {},
}));
