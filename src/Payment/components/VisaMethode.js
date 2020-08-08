import React, { useState, useEffect } from "react";
import {
  getBraintreeClientToken,
  processPayment,
  createOrderApi
} from "./container/api";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { showLoading, Notifications } from "../components/ShowApiNotification";
import Location from "../address/components/Location";
import { useHistory } from "react-router-dom";
import CircularProgress from "../components/CircularProgress";
const Checkout = ({
  isAuthenticatedUser,
  cart,
  shipping,
  createAddress,
  updateAddress,
  exportSubmitFunc
}) => {
  const classes = useStyles();
  
  const init = {
    success: false,
    client: null,
    error: "",
    instance: undefined,
    address: "",
    waitTooken: true,
    loading: true,
  };

  const [data, setData] = useState({ ...init });

  const getToken = (id, token) => {
    getBraintreeClientToken(id, token).then(response => {
      if (response.error) {
        setData({ ...data, error: response.error });
      } else {
        setData({
          ...data,
          clientToken: response.clientToken,
          success: false,
          loading: false,
          waitTooken: false
        });
      }
    });
  };

  const { user, token } = isAuthenticatedUser && isAuthenticatedUser;

  useEffect(() => {
    getToken(user._id, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticatedUser.user._id, isAuthenticatedUser.token]);

  const ShowDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== undefined && (
          <div>
            <DropIn
              options={{
                authorization: data.clientToken
              }}
              onInstance={instance => setData({ ...data, instance })}
            />

            {data.instance !== undefined && (
              <Button
                variant="contained"
                size="large"
                className={classes.buttonValidation}
                color="secondary"
                onClick={buy}
                fullWidth
              >
                Payer
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  const performShippingAddress = next => {
    if (shipping.method === "home") {
      const { address, initialAddress } = shipping;
      const action =
        shipping.new &&
        address._id &&
        JSON.stringify(address) !== JSON.stringify(initialAddress)
          ? "update"
          : shipping.new && !address._id
          ? "new"
          : undefined;

      const performNext = ({ error, success, address }) => {
        if (error) {
          setData({ ...data, error: error, loading: false });
        } else {
          next({ ...shipping, address });
        }
      };

      switch (action) {
        case "update":
          updateAddress(isAuthenticatedUser, shipping.address, apiProps =>
            performNext(apiProps)
          );
          break;
        case "new":
          createAddress(isAuthenticatedUser, shipping.address, apiProps =>
            performNext(apiProps)
          );
          break;
        default:
          next(shipping);
          break;
      }
    }
  };

  const performBuy = validShipping => {
    const { ht, price, salePrice } = cart.totalDetail;

    console.log("llll");
    // const createOrderData = {
    //   products: cart.products,
    //   payment: {
    //     method: "credit_card",
    //     transaction: {}
    //   },
    //   amount: parseInt(cart.total) + validShipping.price,
    //   cart: cart._id,
    //   shipping: { ...validShipping },
    //   amountDetail: { ht, price, salePrice }
    // };

    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(response => {
        nonce = response.nonce;
        // once you have nonce (card type, card number), send nonce as
        //  paymentMethodNonce and also total to be charged

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: parseInt(cart.total) + validShipping.price
        };

        //fetch
        processPayment(user._id, token, paymentData)
          .then(response => {
            // feedback of payment

            const { ht, price, salePrice } = cart.totalDetail;

            const createOrderData = {
              bags: cart.bags,
              payment: {
                method: response.transaction.paymentInstrumentType,
                transaction: response.transaction
              },
              amount: response.transaction.amount,
              cart: cart._id,
              shipping: { ...validShipping },
              amountDetail: { ht, price, salePrice }
            };

            createNewOrder(createOrderData, async () => {
              setData({
                ...data,
                error: false,
                success: "Paiement avec succès"
              });
              // story.push("/");
            });
          })
          .catch(error => {
            console.log(error);
            setData({ ...data, loading: false, error: error });
          });
        //  console.log("send nonce and total to process:", nonce, cart.total);
      })
      .catch(error => {
        console.log("dropin error:", error);
        setData({ ...data, error: error.message, loading: false });
      });
  };
  const buy = () => {
    if (data.instance) {
      setData({ ...data, error: false, loading: true });
      performShippingAddress(validShipping => performBuy(validShipping));
    }
  };

  !data.success && exportSubmitFunc(buy);

  const createNewOrder = (createOrderData, next) => {
    createOrderApi(user._id, token, createOrderData).then(response => {
      if (response.error) {
        setData({ ...data, error: response.error });
      } else {
        next();
      }
    });
  };

  console.log({ data });
  return <>{ShowDropIn()}</>;
};

const useStyles = makeStyles(theme => ({
  buttonValidation: {
    borderRadius: "0px",
    textTransform: "unset",
    lineHeight: "1"
  }
}));

export default Checkout;
