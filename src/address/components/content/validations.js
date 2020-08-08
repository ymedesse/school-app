export default (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Important";
  }
  if (!values.code) {
    errors.code = "Important";
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
