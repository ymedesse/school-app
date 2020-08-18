import { LOCAL_PAYMENT_WAY } from "../../../Paiement/container/constants";

export default (values) => {
  const errors = {};

  if (!values.payment) {
    errors.payment = "Important";
  } else {
    errors.payment = checkPayment(values);
  }
  return errors;
};

const checkPayment = (values) => {
  const errors = {};
  const { payment } = values;

  let { amount, method } = payment;

  amount = parseStringToInt(amount);
  const isMomo = method === "momo";
  const isLocalPaiement = method === LOCAL_PAYMENT_WAY;

  if (isMomo || isLocalPaiement) {
    if (amount <= 0) {
      errors.amount = "Important";
    }

    if (isMomo && (!payment.phone || payment.phone === "")) {
      errors.phone = "Important";
    }
  }

  return errors;
};

const parseStringToInt = (value) => parseInt(value) || 0;
