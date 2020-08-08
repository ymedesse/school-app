import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import context from "../../rootContext/context";
import {
  COMMANDE_SHIPPING_LINK,
  SHIPPING_LINK,
  CART_LINK,
  COMMANDE_LINK,
  SCHOOL_LIST_LINK,
} from "../../routerLinks";
import SubHeader from "../../components/PageSubHeader";
import ErrorBoundary from "../../components/ErrorBoundary";

const ShippingContent = React.lazy(() => import("./Body"));

const Shipping = ({ location }) => {
  const pathName = location.pathname;
  const isCommande = pathName === COMMANDE_SHIPPING_LINK;

  const rootContext = React.useContext(context);

  const { cart: schortCart, commande: shortCmd, ...props } = rootContext.cart;

  const { shippingRange, submitShipping } = rootContext.checkout;
  const { performErrorAlert } = rootContext.alert;

  const minCost = shippingRange ? shippingRange.min : 500;

  const onSubmitShipping = (val, next) => {
    const file = isCommande ? "commande" : "cart";
    submitShipping(
      val,
      (resultat) => {
        if (resultat) {
          const { error } = resultat;
          error && performErrorAlert(error);
          if (!error) {
            next();
          }
        }
      },
      file
    );
  };

  const showShipping = () => (
    <ErrorBoundary>
      <React.Suspense fallback={<CircularProgress />}>
        <ShippingContent
          {...props}
          minCost={minCost}
          schortCart={isCommande ? shortCmd : schortCart}
          isCommande={isCommande}
          onSubmitShipping={onSubmitShipping}
        />
      </React.Suspense>
    </ErrorBoundary>
  );

  return (
    <>
      <SubHeader routes={getRoutes(pathName)} title="Livraison" />
      {showShipping()}
    </>
  );
};

const getRoutes = (pathName) => {
  return pathName === SHIPPING_LINK
    ? [SCHOOL_LIST_LINK, CART_LINK, SHIPPING_LINK]
    : [SCHOOL_LIST_LINK, COMMANDE_LINK, COMMANDE_SHIPPING_LINK];
};
export default Shipping;
