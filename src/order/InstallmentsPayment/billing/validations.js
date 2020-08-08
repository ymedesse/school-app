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
  const amount = parseStringToInt(payment.amount);

  if (amount <= 0) {
    errors.amount = "Important";
  }

  if (!payment.phone || payment.phone === "") {
    errors.phone = "Important";
  }

  return errors;
};

// const checkPayment = (values) => {
//   const errors = {};
//   const { payment, order = {} } = values;
//   const amount = parseStringToInt(payment.amount);
//   const min = getMin(order);

//   if (amount <= 0) {
//     errors.amount = "Important";
//   }

//   if (!payment.phone || payment.phone === "") {
//     errors.phone = "Important";
//   }

//   if (amount < min) {
//     errors.amount = "Vous devez payer au minimum " + min + " fcfa";
//   }
//   return errors;
// };

const parseStringToInt = (value) => parseInt(value) || 0;
