export default (values) => {
  const errors = {};

  if (!values.phone) {
    errors.phone = "Important";
  }
  return errors;
};
