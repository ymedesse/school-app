import React from "react";
import FormValidator from "../../../components/FormValidator";
import compareProps from "../../../utils/compareProps";
import validate from "./validations";
import Form from "./Form";
// import { Debug } from "mui-rff";
import { FULL_FORM, LISTE_FORM } from "./constants";

const WishedContent = ({
  data,
  handleSubmitListe,
  performFullErrorAlert,
  performFullSuccessAlert,
  handleCloseDialog,
  refresh,
}) => {
  const action = !data ? FULL_FORM : LISTE_FORM;

  const getValue = (values) => {
    const { liste } = values;
    return action === FULL_FORM ? values : { liste };
  };

  const onSubmit = async (values, form, complete) => {
    const val = getValue(values);

    handleSubmitListe(val, (data) => {
      if (data) {
        const { error } = data;
        if (error) {
          performFullErrorAlert &&
            performFullErrorAlert(data.error, {
              title: "Ajoute de liste",
            });
        }

        if (!error) {
          refresh();
          handleCloseDialog && handleCloseDialog();
        }
      }
    });
  };

  const contents = ({ form, values, ...props }) => (
    <>
      <Form action={!data ? FULL_FORM : LISTE_FORM} values={values} />
      {/* <Debug /> */}
    </>
  );

  return (
    <FormValidator
      onSubmit={onSubmit}
      initialValues={getDefaultData(data)}
      subscription={{ pristine: true, submitting: true, values: true }}
      contents={contents}
      validate={validate(action)}
    />
  );
};

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["data"]);
};

export default React.memo(WishedContent, isEqual);

const getDefaultData = (data = {}) => {
  const { phone, liste = {} } = data;
  return {
    phone: phone || "",
    liste: {
      school: "",
      address: "",
      mail: "",
      files: [],
      classe: {
        code: "",
      },
      ...liste,
    },
  };
};
