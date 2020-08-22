import { getMin } from "./utils";
import { LOCAL_PAYMENT_WAY } from "../container/constants";

export default (file) => (values) => {
  const errors = {};

  if (!values.payment) {
    errors.payment = "Important";
  } else {
    errors.payment = checkPayment(values, file);
  }
  return errors;
};

const checkPayment = (values, file) => {
  const errors = {};
  const { payment = {}, cart = {} } = values;
  let { amount, method } = payment;
  const isMomo = method === "momo";
  const isLocalPaiement = method === LOCAL_PAYMENT_WAY;

  amount = parseStringToInt(amount);

  if (isMomo || isLocalPaiement) {
    const min = getMin(cart.totalAmount, file);
    if (amount <= 0) {
      errors.amount = "Important";
    }

    if (isMomo && (!payment.phone || payment.phone === "")) {
      errors.phone = "Important";
    }

    if (amount < min) {
      errors.amount = "Vous devez payer au minimum " + min + " fcfa";
    }
  }
  return errors;
};

const parseStringToInt = (value) => parseInt(value) || 0;

// numClient
// nomClient
// adresRuCli
// adresVilCli
// tel
// mailCli
// type

// export default (values) => {
//   const errors = {};
//   if (!!values.local && !values.remote) {
//     errors.local = "Important";
//     errors.remote = "Important";
//   }
//   if (values.remote) {
//     const { firstName, city, lastName, description, phone, postal, isNew } = (
//       values.remoteShipping || {}
//     ).address;
//     let _phone = "",
//       _firstName = "",
//       _city = {};

//     if (!phone) {
//       _phone = "Important";
//     }

//     if (!firstName) {
//       _firstName = "Important";
//     }
//     // if (!city) {
//     //   _city = "Important";
//     // }

//     const remoteShipping = {
//       address: {
//         firstName: _firstName,
//         phone: _phone,
//         // city: _city,
//       },
//     };

//     errors.remoteShipping = remoteShipping;

//     // const { address } = values.remoteShipping;
//     // console.log({ address });
//   }

//   return errors;
// };

// // numClient
// // nomClient
// // adresRuCli
// // adresVilCli
// // tel
// // mailCli
// // type
