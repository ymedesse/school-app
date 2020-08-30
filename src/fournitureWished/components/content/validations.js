import { FULL_FORM } from "./constants";
export default (action) => (values) => {
  const errors = {};

  if (action === FULL_FORM) {
    if (!values.phone) {
      errors.phone = "Important";
    }
  }
  errors.liste = checkListe(values);
  return errors;
};

const checkListe = (values) => {
  const errors = {};
  const { school, address, classe, phone } = values.liste;

  if (!school) {
    errors.school = "Important";
  }

  if (!address) {
    errors.address = "Important";
  }

  if (!phone) {
    errors.phone = "Important";
  }

  if (!classe) {
    errors.classe = "Important";
  }

  return errors;
};
