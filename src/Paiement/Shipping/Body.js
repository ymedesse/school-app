import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import useSWR from "swr";
import validate from "./validations";
import { TitleTypography } from "../../components/Typography";
import FormValidator from "../../components/FormValidator";
import ListSkeleton from "../../components/ListSkeleton";
import initAddress from "../../address/components/content/defaultValue";
import ErrorBoundarySuspense from "../../components/ErrorBoundarySuspense";
// import { Debug } from "mui-rff";

import {
  LOCAL_SHIPPING,
  REMOTE_SHIPPING,
  LOCAL_SHIPPING_TITLE,
  REMOTE_SHIPPING_TITLE,
} from "../container/constants";

import { PAYMENT_LINK, COMMANDE_PAYMENT_LINK } from "../../routerLinks";
import BillingShortView from "./BillingShortView";

const MethodsLabel = React.lazy(() => import("./MethodsLabel"));
const ShippingContent = React.lazy(() => import("./Content"));

const Shipping = ({
  schortCart,
  getReadCartUrl,
  minCost = 0,
  getFetcher,
  onSubmitShipping,
  isCommande = false,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({});
  const url = getReadCartUrl();
  const file = isCommande ? "commande" : "cart";

  const { data: result } = useSWR(url, getFetcher(), {
    refreshInterval: 0,
    revalidateOnFocus: false,
    suspense: true,
  });

  React.useEffect(() => {
    if (result && !result.error) {
      setShipping(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const setShipping = (values) => {
    const { [`${file}`]: cart, localAddresses = [] } = values;
    const { shipping: newShip = {} } = cart;
    const localShipping = getLocalShippingValue(localAddresses[0]);
    const remoteShipping = getRemoteShippingAddress(cart);
    const method = newShip.method || LOCAL_SHIPPING;

    setState((state) => ({
      ...state,
      localShipping,
      remoteShipping,
      method,
      local: method === LOCAL_SHIPPING,
      remote: method === REMOTE_SHIPPING,
      edit: false,
    }));
  };

  const getLocalShippingValue = (localAddress) => {
    const local = {
      method: LOCAL_SHIPPING,
      method_title: LOCAL_SHIPPING_TITLE,
      address: localAddress,
      total: 0,
    };

    return local;
  };
  const getDefaultRemoteShipping = () => {
    return {
      method: REMOTE_SHIPPING,
      method_title: REMOTE_SHIPPING_TITLE,
      address: initAddress,
      total: 0,
      note: "",
      edit: true,
    };
  };

  const getRemoteShippingAddress = (cart) => {
    const { shipping: newShip = {} } = cart;

    let value = newShip.method !== LOCAL_SHIPPING ? newShip : undefined;

    if (!value) {
      value = getDefaultRemoteShipping();
    }

    if (value.address)
      value = {
        ...value,
        total: (value.address.city || {}).cost || 0,
      };

    if (!value.address) {
      value = {
        method: REMOTE_SHIPPING,
        method_title: REMOTE_SHIPPING_TITLE,
        address: initAddress,
        total: 0,
        note: "",
        edit: true,
      };
    }
    return value;
  };

  const getCurrentShipping = (values) => {
    const { remote } = values;
    return remote === true ? values.remoteShipping : values.localShipping;
  };

  const onSubmit = async (values, form) => {
    const shipping = getCurrentShipping(values);
    onSubmitShipping({ ...shipping, note: values.note }, () => {
      history.push(isCommande ? COMMANDE_PAYMENT_LINK : PAYMENT_LINK);
    });
  };

  const handleNew = (form) => {
    const newValue = getDefaultRemoteShipping();
    form.change("remoteShipping", newValue);
  };

  const handleReset = (form) => {
    const { [`${file}`]: cart } = result;
    const remoteShipping = getRemoteShippingAddress(cart);
    form.change("remoteShipping", remoteShipping);
  };

  const title = isCommande
    ? "Je choisis l'adresse de livraison de ma commande"
    : "Je choisis l'address de livraison de mon achat";

  const showShipping = (form) => (
    <Paper style={{ padding: "8px", width: "100%" }}>
      <Box alignItems="center" display="flex" width="100%">
        <Box mt={1} mr={1}>
          <LocalShippingIcon />
        </Box>
        <Box flexGrow={1}>
          <TitleTypography className={classes.inline}>{title}</TitleTypography>
        </Box>
      </Box>
      <MethodsLabel form={form} minCost={minCost} />

      <ErrorBoundarySuspense fallback={<ListSkeleton fallback={5} />}>
        <ShippingContent
          handleReset={handleReset}
          handleNew={handleNew}
          form={form}
        />
      </ErrorBoundarySuspense>
    </Paper>
  );

  const contents = ({ form, ...props }) => (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item container xs={12} sm={8}>
          {showShipping(form)}
        </Grid>

        <Grid xs={12} sm={4} item>
          <ErrorBoundarySuspense fallback={<ListSkeleton fallback={5} />}>
            <BillingShortView
              isCommande={isCommande}
              form={form}
              schortCart={schortCart}
              endStep={false}
            />
          </ErrorBoundarySuspense>
        </Grid>
      </Grid>
      {/* <Debug /> */}
    </>
  );

  return (
    <>
      <FormValidator
        onSubmit={onSubmit}
        initialValues={state}
        subscription={{ pristine: true, submitting: true }}
        contents={contents}
        validate={validate}
      />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  contents: {
    width: "100%",
    overflowY: "auto",
    position: "relative",
    // maxHeight: 200,
  },
  margin: {
    marginTop: theme.spacing(2.5),
  },
  button: {
    margin: theme.spacing(1),
    textTransform: "unset",
    color: theme.palette.grey["A400"],
    lineHeight: "1",
  },
  cartItemRow: {
    paddingBottom: "10px",
    paddingTop: "10px",
  },
  headerTitle: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },

  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  paper: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  inline: {
    display: "inline",
  },
}));

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      schortCart: prev !== null ? prev.schortCart : {},
      minCost: prev !== null ? prev.isCommande : {},
      isCommande: prev !== null ? prev.isCommande : {},
    }) ===
    JSON.stringify({
      schortCart: next.schortCart,
      minCost: next.minCost,
      isCommande: next.minCost,
    })
  );
};

export default React.memo(Shipping, isEqual);
