import React, { useContext, useState, useEffect } from "react";
import useSWR from "swr";

import Grid from "@material-ui/core/Grid";
import context from "../rootContext/context";
import * as links from "../routerLinks";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Notifications } from "../components/ShowApiNotification";
import Paper from "@material-ui/core/Paper";
import CartEmpty from "../cart/components/CartEmpty";
import Facturation from "./components/Facturation";
import Stepper from "../cart/components/Stepper";
import Shipping from "./Layout/Shipping";
import Checkout from "./Checkout";
import { READ_CART_URL } from "./container/constants";
import Cart from "../cart";

// ==> render step
export const getSteps = ({
  cartValidation,
  setRefreshCartFunc,
  setAddressValidateFunc,
  isAuthenticatedUser,
  shipping,
setShipping
}) => {
  return [
    {
      content: (props) => (
        <Cart setRefreshCartFunc={setRefreshCartFunc} {...props} />
      ),
      label: ({ cart }) =>
        `${cart.count} article${cart.count > 1 && "s"} dans votre panier`,
      link: links.CART_LINK,
      submitLabel: "Valider mon panier",
      validation: cartValidation,
    },
    {
      content: (
        <Shipping
          setAddressValidateFunc={setAddressValidateFunc}
          auth={isAuthenticatedUser}
          shipping={shipping}
          setShipping={setShipping}
          addresses={addresses}
        />
      ),
      label: getCurrentShippingString(),
      validation: adddressValidation,
      link: links.SHIPPING_LINK,
      submitLabel: "Continuer",
    },
    {
      content: (
        <Checkout
          isAuthenticatedUser={isAuthenticatedUser}
          shipping={shipping}
          createAddress={createAddress}
          updateAddress={updateAddress}
          cart={cart}
          exportSubmitFunc={setSubmitPayment}
        />
      ),
      label: " Payement ",
      link: links.PAYMENT_LINK,
      submitLabel: "Payer",
      validation: paymentSubmit,
    },
  ];
};

const storeAdress = {
  phone: ["+229 96 67 98 91"],
  name: "Librairie LBU",
  address: "TARBES CV BRAHAUBAN 65000 TARBES, Benin",
  postal: "",
  comment: "",
};
