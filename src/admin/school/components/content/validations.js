export default (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Important";
  }
  if (!values.phone) {
    errors.phone = "Important";
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
