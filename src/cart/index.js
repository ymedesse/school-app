import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Facturation from "../Paiement/Billing/Facturation";
import context from "../rootContext/context";
import ListSkeleton from "../components/ListSkeleton";
import {
  SHIPPING_LINK,
  COMMANDE_SHIPPING_LINK,
  SCHOOL_LIST_LINK,
} from "../routerLinks";
import SubHeader from "../components/PageSubHeader";

import Tab from "../components/Tab";
import { COMMANDE, CART } from "./containers/constants";
import { COMMANDE_LINK, CART_LINK } from "../routerLinks";
const Panier = React.lazy(() => import("./Layout/Panier"));
const Cart = ({ location }) => {
  const classes = useStyles();
  const history = useHistory();
  const rootContext = React.useContext(context);
  const { cart: schortCart, commande: shortCmd, ...props } = rootContext.cart;

  const getContents = () => {
    return [
      {
        title: "Votre panier",
        content: showCart(CART),
        handleClick: () => history.push(CART_LINK),
      },
      {
        title: "Votre liste à commander",
        content: showCart(COMMANDE),
        handleClick: () => history.push(COMMANDE_LINK),
      },
    ];
  };

  const pathName = location.pathname;
  const isCommande = pathName === COMMANDE_LINK;
  const submitLabel = isCommande ? "Payer ma commande" : "Passer à la caisse";

  const showCart = (file = CART) => (
    <React.Suspense
      fallback={<ListSkeleton count={2} height={100} margin="50px" />}
    >
      <Panier file={file} {...props} schortCart={schortCart} />;
    </React.Suspense>
  );

  return (
    <>
      <SubHeader routes={[SCHOOL_LIST_LINK, pathName]} />
      <Grid container spacing={2} className={classes.cartList}>
        <Grid item xs={12} sm={9}>
          <Tab initial={isCommande ? 1 : 0} components={getContents()}></Tab>
        </Grid>

        <Grid xs={12} sm={3} item>
          <React.Suspense fallback={<ListSkeleton count={2} height={50} />}>
            <Facturation
              cart={isCommande ? shortCmd : schortCart}
              submitLabel={submitLabel}
              isCommande={isCommande}
              handleSubmit={() => {
                history.push(
                  isCommande ? COMMANDE_SHIPPING_LINK : SHIPPING_LINK
                );
              }}
              initialExpanded={true}
            />
          </React.Suspense>
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));
