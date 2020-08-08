export default (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Important";
  }
  if (!values.price) {
    errors.price = "Important";
  }

  return errors;
};

// numClient
// nomClient
// adresRuCli
// adresVilCli
// tel
// mailCli
// type
