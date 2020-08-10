import React, { useState, useEffect } from "react";
import useSWR, { trigger } from "swr";
import ErrorBoundary from "../../components/ErrorBoundary";
import Grid from "@material-ui/core/Grid";
import { CART } from "../containers/constants";
import ListSkeleton from "../../components/ListSkeleton";
import Facturation from "../../Paiement/Billing/Facturation";
import compareProps from "../../utils/compareProps";
import LinearProgress from "@material-ui/core/LinearProgress";

import { SHIPPING_LINK, COMMANDE_SHIPPING_LINK } from "../../routerLinks";
const CartList = React.lazy(() => import("../components/CartList"));

const Panier = ({
  file = CART,
  removeFromCart,
  setCartQuantities,
  setCartQuantitiesOnly,
  exportRefreshCartFunc,
  getFetcher,
  getReadCartUrl,
  faturetionProps,
  setSuccess,
  history,
}) => {
  const url = getReadCartUrl();
  const { data: resultat } = useSWR(url, getFetcher(), {
    refreshInterval: 0,
    revalidateOnFocus: true,
    suspense: true,
  });

  const refresh = () => {
    trigger(url);
  };

  const error = !resultat ? true : resultat && resultat.error;
  const [state, setState] = useState({
    values: {},
    fieldError: false,
    submiting: false,
  });

  const { values, fieldError, submiting } = state;

  useEffect(() => {
    if (resultat && !resultat.error) {
      setState((state) => ({
        ...state,
        values: resultat[`${file}`] || {},
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultat]);

  const setSubmiting = (val) => {
    setState((state) => ({ ...state, submiting: val }));
  };

  const checkChange = () => {
    const cart = resultat[`${file}`];
    return !fieldError && JSON.stringify(values) !== JSON.stringify(cart);
  };

  const updateCart = async (next) => {
    const changed = checkChange();
    if (changed) {
      setSubmiting(true);
      await setCartQuantities(values, file, (val) => {
        setSuccess("Votre panier a été mise à jour avec succès");
        setState((state) => ({ ...state, values: val, submiting: false }));
      });
      // setSubmiting(false);
    }
  };

  const submitFacturation = async () => {
    const changed = checkChange();
    if (changed) {
      setSubmiting(true);
      await setCartQuantitiesOnly(values, file);
    }
    history.push(
      faturetionProps.isCommande ? COMMANDE_SHIPPING_LINK : SHIPPING_LINK
    );
  };

  const getCartListe = (listeId) => {
    const { [`${file}`]: cart } = resultat;
    const { contents = [] } = cart;
    const index = contents.findIndex((item) => item.list === listeId);
    return index;
  };

  const setItemCount = (id, listId) => (event) => {
    const { [`${file}`]: cart } = resultat;
    const value = parseInt(event.target.value) || 0;

    const index = getCartListe(listId, file);
    const content = cart.contents[index];

    const { products = [] } = content;
    const i = products.findIndex((p) => p.product._id === id);

    if (i !== -1) {
      const oldQt = products[i].quantity;
      const { product } = products[i];

      const newProductTotal = value * product.sale_price;
      const oldProductTotal = oldQt * product.sale_price;

      content.products[i].quantity = value;
      content.total = content.total - oldProductTotal + newProductTotal;

      const newCart = { ...cart };
      newCart[index] = content;
      newCart.total = newCart.total - oldProductTotal + newProductTotal;

      setState((state) => ({
        ...state,
        fieldError: value < 1,
        values: { ...newCart },
      }));
    }
  };

  exportRefreshCartFunc && exportRefreshCartFunc(updateCart);

  const handleRemoveFromCart = (id, listid, next = () => {}) => {
    removeFromCart(id, listid, next, file);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={9}>
        {submiting && <LinearProgress />}
        {!error ? (
          <ErrorBoundary>
            <React.Suspense
              fallback={<ListSkeleton count={5} height={50} margin="20px" />}
            >
              <CartList
                file={file}
                cart={values}
                removeFromCart={handleRemoveFromCart}
                updateCart={updateCart}
                setItemCount={setItemCount}
                refresh={refresh}
                fieldError={fieldError}
              />
            </React.Suspense>
          </ErrorBoundary>
        ) : (
          <LinearProgress />
        )}
      </Grid>

      <Grid xs={12} sm={3} item>
        <React.Suspense fallback={<ListSkeleton count={2} height={50} />}>
          <Facturation
            {...faturetionProps}
            handleSubmit={submitFacturation}
            initialExpanded={true}
          />
        </React.Suspense>
      </Grid>
    </Grid>
  );
};

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["cart", "file", "faturetionProps"]);
};

export default React.memo(Panier, isEqual);
