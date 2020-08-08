export default (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Important";
  }
  if (!values.cost) {
    errors.cost = "Important";
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
