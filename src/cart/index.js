import React from "react";
import { useHistory } from "react-router-dom";
import context from "../rootContext/context";
import LineProgressBuffer from "../components/LineProgressBuffer";
import { SCHOOL_LIST_LINK } from "../routerLinks";
import SubHeader from "../components/PageSubHeader";

import Tab from "../components/Tab";
import { COMMANDE, CART } from "./containers/constants";
import { COMMANDE_LINK, CART_LINK } from "../routerLinks";
const Panier = React.lazy(() => import("./Layout/Panier"));
const Cart = ({ location }) => {
  const history = useHistory();
  const rootContext = React.useContext(context);
  const { cart: schortCart, commande: shortCmd, ...props } = rootContext.cart;
  const { setSuccess } = rootContext.alert;

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

  const faturetionProps = {
    cart: isCommande ? shortCmd : schortCart,
    submitLabel: submitLabel,
    isCommande: isCommande,
    initialExpanded: true,
  };

  const showCart = (file = CART) => (
    <React.Suspense fallback={<LineProgressBuffer />}>
      <Panier
        file={file}
        {...props}
        schortCart={schortCart}
        faturetionProps={faturetionProps}
        history={history}
        setSuccess={setSuccess}
      />
      ;
    </React.Suspense>
  );

  return (
    <>
      <SubHeader routes={[SCHOOL_LIST_LINK, pathName]} />
      <Tab initial={isCommande ? 1 : 0} components={getContents()}></Tab>
    </>
  );
};

export default Cart;
