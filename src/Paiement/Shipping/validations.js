export default (values) => {
  let errors = {};
  const { local, remote } = values;

  if (!local && !remote) {
    errors.method = "Important";
  } else {
    errors = { ...errors, ...checkRemoteFields(values) };
  }

  return errors;
};

const checkRemoteFields = (values) => {
  const errors = {};

  if (values.remote) {
    const { firstName, lastName, phone, city } =
      (values.remoteShipping || {}).address || {};
    let addErrors = {};
    addErrors = setEmptyError(firstName, "firstName", addErrors);
    addErrors = setEmptyError(lastName, "lastName", addErrors);
    addErrors = setEmptyError(phone, "phone", addErrors);
    addErrors = setEmptyError((city || {}).name, "city", addErrors);

    errors.remoteShipping = { address: addErrors };
  }

  return errors;
};

const setEmptyError = (field, fieldName, errors) => {
  if (checkField(field)) {
    errors[`${fieldName}`] = "Important .";
  }
  return errors;
};
const checkField = (val) => {
  return !val || val === "" ? true : false;
};
