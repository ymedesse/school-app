import { LOCAL_PAYMENT_WAY } from "../../../Paiement/container/constants";
import { getMin } from "../../../Paiement/Billing/utils";

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
  const { payment, order } = values;
  const { totalAmount, type, amountPaid } = order;

  let { amount, method } = payment;

  amount = parseStringToInt(amount);
  const restMinToPay = parseStringToInt(amountPaid) + amount;

  const isMomo = method === "momo";
  const isLocalPaiement = method === LOCAL_PAYMENT_WAY;

  if (isMomo || isLocalPaiement) {
    const min = getMin(totalAmount, type);
    if (amount <= 0) {
      errors.amount = "Important";
    }

    if (isMomo && (!payment.phone || payment.phone === "")) {
      errors.phone = "Important";
    }

    if (restMinToPay < min) {
      errors.amount = "Vous devez payer au minimum " + min + " fcfa";
    }
  }

  return errors;
};

const parseStringToInt = (value) => parseInt(value) || 0;
