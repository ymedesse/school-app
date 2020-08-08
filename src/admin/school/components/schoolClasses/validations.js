export default (values) => {
  const errors = {};
  if (!values.school) {
    errors.school = "Important";
  }
  if (values.products && values.products.length === 0) {
    errors.product = "Important";
  }

  if (!values.classe) {
    errors.classe = "Important";
  }

  return errors;
};
