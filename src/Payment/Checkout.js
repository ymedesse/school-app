import React, { useState, useEffect } from "react";
import {
  getBraintreeClientToken,
  processPayment,
  createOrderApi,
} from "./container/api";
// import "braintree-web";
// import DropIn from "braintree-web-drop-in-react";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
// import { showLoading, Notifications } from "../components/ShowApiNotification";
// import Location from "../address/components/Location";
// import { useHistory } from "react-router-dom";
// import CircularProgress from "../components/CircularProgress";
// const Checkout = ({
//   isAuthenticatedUser,
//   cart,
//   shipping,
//   createAddress,
//   updateAddress,
//   exportSubmitFunc
// }) => {
//   const classes = useStyles();
//   const story = useHistory();
//   const init = {
//     success: false,
//     client: null,
//     error: "",
//     instance: undefined,
//     address: "",
//     waitTooken: true,
//     loading: true
//   };

//   const [data, setData] = useState({ ...init });

//   const getToken = (id, token) => {
//     getBraintreeClientToken(id, token).then(response => {
//       if (response.error) {
//         setData({ ...data, error: response.error });
//       } else {
//         setData({
//           ...data,
//           clientToken: response.clientToken,
//           success: false,
//           loading: false,
//           waitTooken: false
//         });
//       }
//     });
//   };

//   const { user, token } = isAuthenticatedUser && isAuthenticatedUser;

//   useEffect(() => {
//     getToken(user._id, token);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isAuthenticatedUser.user._id, isAuthenticatedUser.token]);

//   const ShowDropIn = () => {
//     return (
//       <div onBlur={() => setData({ ...data, error: "" })}>
//         {data.clientToken !== undefined && (
//           <div>
//             <DropIn
//               options={{
//                 authorization: data.clientToken
//               }}
//               onInstance={instance => setData({ ...data, instance })}
//             />

//             {data.instance !== undefined && (
//               <Button
//                 variant="contained"
//                 size="large"
//                 className={classes.buttonValidation}
//                 color="secondary"
//                 onClick={buy}
//                 fullWidth
//               >
//                 Payer
//               </Button>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const performShippingAddress = next => {
//     if (shipping.method === "home") {
//       const { address, initialAddress } = shipping;
//       const action =
//         shipping.new &&
//         address._id &&
//         JSON.stringify(address) !== JSON.stringify(initialAddress)
//           ? "update"
//           : shipping.new && !address._id
//           ? "new"
//           : undefined;

//       const performNext = ({ error, success, address }) => {
//         if (error) {
//           setData({ ...data, error: error, loading: false });
//         } else {
//           next({ ...shipping, address });
//         }
//       };

//       switch (action) {
//         case "update":
//           updateAddress(isAuthenticatedUser, shipping.address, apiProps =>
//             performNext(apiProps)
//           );
//           break;
//         case "new":
//           createAddress(isAuthenticatedUser, shipping.address, apiProps =>
//             performNext(apiProps)
//           );
//           break;
//         default:
//           next(shipping);
//           break; 
//       }
//     }
//   };
//   const submitOrder = ({ paymentData, validShipping }) => {
//     paymentData = !paymentData
//       ? {
//           transaction: {
//             paymentInstrumentType: "payment a la livraison",
//             amount: parseInt(cart.total) + validShipping.price
//           }
//         }
//       : paymentData;

//     const { ht, price, salePrice } = cart.totalDetail;

//     const createOrderData = {
//       bags: cart.bags,
//       payment: {
//         method: paymentData.transaction.paymentInstrumentType,
//         transaction: paymentData.transaction
//       },
//       amount: paymentData.transaction.amount,
//       cart: cart._id,
//       shipping: { ...validShipping },
//       amountDetail: { ht, price, salePrice }
//     };

//     createNewOrder(createOrderData, async () => {
//       setData({
//         ...data,
//         error: false,
//         success: "Paiement avec succès"
//       });
//       // story.push("/");
//     });
//   };

//   const performBuy = ({ validShipping }) => {
//     const { ht, price, salePrice } = cart.totalDetail;

//     console.log("llll");

//     let nonce;
//     let getNonce = data.instance
//       .requestPaymentMethod()
//       .then(response => {
//         nonce = response.nonce;
//         // once you have nonce (card type, card number), send nonce as
//         //  paymentMethodNonce and also total to be charged

//         const paymentData = {
//           paymentMethodNonce: nonce,
//           amount: parseInt(cart.total) + validShipping.price
//         };

//         //fetch
//         processPayment(user._id, token, paymentData)
//           .then(response => {
//             // feedback of payment

//             submitOrder(response, validShipping);
//           })
//           .catch(error => {
//             console.log(error);
//             setData({ ...data, loading: false, error: error });
//           });
//         //  console.log("send nonce and total to process:", nonce, cart.total);
//       })
//       .catch(error => {
//         console.log("dropin error:", error);
//         setData({ ...data, error: error.message, loading: false });
//       });
//   };

//   const buy = () => {
//     setData({ ...data, error: false, loading: true });
//     if (data.instance) {
//       performShippingAddress(validShipping => performBuy({ validShipping }));
//     } else {
//       performShippingAddress(validShipping => submitOrder({ validShipping }));
//     }
//   };

//   !data.success && exportSubmitFunc(buy);

//   const createNewOrder = (createOrderData, next) => {
//     createOrderApi(user._id, token, createOrderData).then(response => {
//       if (response.error) {
//         setData({ ...data, error: response.error });
//       } else {

//         next();
//       }
//     });
//   };

//   const showSuccess = data.success && (
//     <Notifications
//       notificationType="success"
//       message=" Merci! Votre payement a été valider avec succès ! "
//       nextClose={() => {}}
//     />
//   );

//   const showError = (
//     <Notifications
//       notificationType="error"
//       message={data.error}
//       nextClose={() => {}}
//     />
//   );
//   console.log({ data });
//   return (
//     <div style={{ minHeight: 500 }}>
//       {!data || (data && data.loading) ? (
//         <div> moihbjhbhjbhjb</div>
//       ) : (
//         <>
//           {showError}
//           {showSuccess}
//           {ShowDropIn()}
//         </>
//       )}
//     </div>
//   );
// };

// const useStyles = makeStyles(theme => ({
//   buttonValidation: {
//     borderRadius: "0px",
//     textTransform: "unset",
//     lineHeight: "1"
//   }
// }));

const Checkout = () => {
  return <div>Payment</div>;
};
export default Checkout;
