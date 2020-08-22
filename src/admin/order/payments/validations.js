export default (amount) => (values) => {
  const errors = {};

  if (!values.amount) {
    errors.price = "Important";
  }

  if (parseStringToInt(values.amount) !== parseStringToInt(amount)) {
    errors.amount = "Le client doit payer " + amount + " FCfa";
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
