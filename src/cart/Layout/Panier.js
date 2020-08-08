import React, { useState, useEffect } from "react";
import useSWR, { trigger } from "swr";
// import ErrorMessage from "../../components/ErrorMessage";
import CheckBoxSkeleton from "../../components/CheckBoxSkeleton";
import ErrorBoundary from "../../components/ErrorBoundary";
import { CART } from "../containers/constants";
import ListSkeleton from "../../components/ListSkeleton";
const CartList = React.lazy(() => import("../components/CartList"));

const Panier = ({
  file = CART,
  removeFromCart,
  setCartQuantities,
  exportRefreshCartFunc,
  getFetcher,
  getReadCartUrl,
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

  // const error = !resultat ? true : resultat && resultat.error;
  const [state, setState] = useState({
    values: {},
    fieldError: false,
  });

  const { values, fieldError } = state;

  useEffect(() => {
    if (resultat && !resultat.error) {
      setState((state) => ({
        ...state,
        values: resultat[`${file}`] || {},
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultat]);

  const updateCart = () => {
    const cart = resultat[`${file}`];

    if (!fieldError && JSON.stringify(values) !== JSON.stringify(cart))
      setCartQuantities(values, () => {}, file);
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
    <ErrorBoundary>
      <React.Suspense fallback={<ListSkeleton count={2} height={100} margin="50px"/>}>
        <CartList
          cart={values}
          removeFromCart={handleRemoveFromCart}
          updateCart={updateCart}
          setItemCount={setItemCount}
          refresh={refresh}
          fieldError={fieldError}
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify(
      prev !== null
        ? { cart: prev.cart, file: prev.file }
        : { cart: {}, file: undefined }
    ) === JSON.stringify({ cart: next.cart, file: next.file })
  );
};

export default React.memo(Panier, isEqual);
