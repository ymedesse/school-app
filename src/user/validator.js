export default (values) => {
  const errors = {};
  if (!values.lastName) {
    errors.lastName = "Important";
  }
  if (!values.firstName) {
    errors.firstName = "Important";
  }
  if (!values.email) {
    errors.email = "Important";
  }
  if (values.password) {
    let t = true;

    if (!values.newPassword) {
      errors.newPassword = "Important";
      t = false;
    }
    if (!values.confirmation) {
      errors.confirmation = "Important";
      t = false;
    }

    if (t && values.confirmation !== values.newPassword) {
      errors.confirmation =
        "le mot de passe doit être identique au nouveau mot de passe";
    }
  }
  return errors;
};
