import React, { useContext, useState, useEffect } from "react";
import useSWR from "swr";

import Grid from "@material-ui/core/Grid";
import context from "../rootContext/context";
import * as links from "../routerLinks";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Notifications } from "../components/ShowApiNotification";
import SwrRender from "../components/SwrRender";
import Paper from "@material-ui/core/Paper";
import CartEmpty from "../cart/components/CartEmpty";
import Facturation from "./components/Facturation";
import Stepper from "../cart/components/Stepper";
import Shipping from "./Layout/Shipping";
import Checkout from "./Checkout";

import Panier from "../cart/Layout/Panier";

import { READ_CART_URL } from "./container/constants";
const Process = ({ location }) => {
  const classes = useStyles();
  const story = useHistory();
  const rootContext = useContext(context);

  const {
    cart: schortCart,
    removeFromCart,
    setCartQuantities,
  } = rootContext.cart;

  const { isAuthenticatedUser } = rootContext.auth;
  const {
    addresses,
    createAddress,
    updateAddress,
    getFetcher,
  } = rootContext.address;

  const { user } = isAuthenticatedUser;

  const url = READ_CART_URL + user._id;
  const { data: fullCart } = useSWR(url, getFetcher(), {
    refreshInterval: 0,
    revalidateOnFocus: true,
    suspense: true,
  });

  // Global steppers config

  let addressValidateFunc = () => {};
  let refreshCart = () => {};
  let submitPayment = () => {};

  const setSubmitPayment = (func) => {
    submitPayment = func;
  };

  const setRefreshCartFunc = (func) => {
    refreshCart = () => {};
  };

  const paymentSubmit = async (event) => {
    submitPayment();
  };

  const cartValidation = async (event) => {
    return new Promise(async (resolve, callback) => {
      await refreshCart();
      resolve(true);
    });
  };

  //  ##### shipping

  const findAddress = (id) => {
    return addresses.find((item) => item._id === id);
  };

  const [shipping, setShipping] = useState(() => {
    return {
      address: findAddress(user.address),
      initialAddress: findAddress(user.address),
      method: "home",
      new: false,
      price: 500,
      dirty: false, // permet de savoir si les valeur de l'address courant à été modifier
      storeAdress,
    };
  });

  useEffect(() => {
    // const currentAddress = findAddress(user.address);
    // setShipping({
    //   ...shipping,
    //   address: currentAddress,
    //   initialAddress: currentAddress,
    //   // new: currentAddress ? true : false,
    //   method: currentAddress && "home",
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.address, addresses]);

  const setAddressValidateFunc = (func) => {
    addressValidateFunc = func;
  };

  const adddressValidation = (event) => {
    if (shipping.new) {
      return addressValidateFunc(event);
    } else {
      return new Promise((resolve, callback) => {
        if (
          shipping.method === "shop" ||
          (shipping.method === "home" && shipping.address !== undefined)
        ) {
          resolve(true);
        } else {
          setLayout({
            ...layout,
            error: "Vous devez choisir définir une addresse de livraison",
          });
          resolve(false);
        }
      });
    }
  };
  // for step label
  const getCurrentShippingString = () => {
    let name;
    let price;
    let addressName;

    if (shipping.method === "shop") {
      name = shipping.storeAdress.name;
      price = 0;
      addressName = shipping.storeAdress.address;
    }
    if (shipping.method === "home" && shipping.address) {
      name = shipping.address.name;
      price = shipping.price;
      addressName = shipping.address.address;
    }

    return shipping.method === "home" && !shipping.address ? (
      "Définir le lieu de livraison"
    ) : (
      <>
        Livrer à <strong>{name} </strong> <br /> {addressName} pour{" "}
        <strong> CFA {price} </strong>
      </>
    );
  };

  // ==> render step
  const getSteps = () => {
    const cart = fullCart || schortCart;
    return cart
      ? [
          {
            content: (
              <Panier
                cart={cart || schortCart}
                removeFromCart={removeFromCart}
                setCartQuantities={setCartQuantities}
                exportRefreshCartFunc={setRefreshCartFunc}
              />
            ),
            label: `${cart.count || 0} article${
              (cart.count || 0) > 1 && "s"
            } dans votre panier`,
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
        ]
      : [];
  };

  // setperConfig
  const searchStepfromLink = () => {
    const steps = getSteps();
    const step = steps.findIndex((item) => item.link === location.pathname);

    if (step > -1) {
      return step;
    } else {
      story.push(links.NOT_FOUND_LINK);
    }
  };

  const [layout, setLayout] = useState({
    activeStep: searchStepfromLink(),
    error: false,
  });

  useEffect(() => {
    setLayout({ ...layout, error: false, activeStep: searchStepfromLink() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const { activeStep } = layout;

  const stepHandleSubmit = (event) => {
    const steps = getSteps();
    event.preventDefault();
    if (activeStep < steps.length - 1) {
      const nextStep = () => {
        story.push(steps[activeStep + 1].link);
      };

      steps[activeStep].validation === undefined && nextStep();
      steps[activeStep].validation !== undefined &&
        steps[activeStep].validation(event).then((ok) => ok && nextStep());
    } else {
      //payment
      paymentSubmit(event);
    }
  };

  const render = () => {
    const steps = getSteps();

    if (!fullCart || fullCart.count < 1) {
      return <CartEmpty />;
    }

    if (fullCart.count > 0) {
      return (
        <Grid container spacing={2} className={classes.cartList}>
          <Grid item xs={12} sm={9}>
            <Paper className={classes.paper}>
              <Stepper
                steps={steps.map((item) => item.label)}
                activeStep={activeStep}
                setActiveStep={(step) => {
                  story.push(steps[step].link);
                  setLayout({ ...layout, activeStep: step });
                }}
                stepContent={steps[activeStep].content}
                // validateStep={addressValidFields}
                validateForm={steps[activeStep].validation}
                showStepperButton={false}
                hideNext={true}
              />
            </Paper>
          </Grid>
          <Grid xs={12} sm={3} item>
            <Facturation
              cart={fullCart}
              shippingPrice={shipping.price}
              submitLabel={steps[activeStep].submitLabel}
              handleSubmit={stepHandleSubmit}
              endStep={steps.length - 1 === activeStep}
            />
          </Grid>
        </Grid>
      );
    }

    return "Oups, réactualiser la page";
  };

  return (
    <div>
      <Notifications
        notificationType="error"
        message={layout.error}
        nextClose={() => {
          setLayout({ ...layout, error: false });
        }}
      />
      <SwrRender data={fullCart}>{() => render()}</SwrRender>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const storeAdress = {
  phone: ["+229 96 67 98 91"],
  name: "Librairie LBU",
  address: "TARBES CV BRAHAUBAN 65000 TARBES, Benin",
  postal: "",
  comment: "",
};

export default Process;
