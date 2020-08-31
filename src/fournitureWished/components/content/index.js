import React from "react";
import FormValidator from "../../../components/FormValidator";
import compareProps from "../../../utils/compareProps";
import validate from "./validations";
import Form from "./Form";
// import { Debug } from "mui-rff";
import { FULL_FORM, LISTE_FORM } from "./constants";
import { INITIALISATION_List_ACTION } from "../../containers/constants";

const WishedContent = ({
  data,
  handleSubmitListe,
  performFullErrorAlert,
  performFullSuccessAlert,
  handleCloseDialog,
  refresh,
  action,
}) => {
  const formType =
    action === INITIALISATION_List_ACTION ? FULL_FORM : LISTE_FORM;

  const getValue = (values) => {
    const { liste } = values;
    return formType === FULL_FORM ? values : { liste };
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
      <Form formType={formType} values={values} />
      {/* <Debug /> */}
    </>
  );

  return (
    <FormValidator
      onSubmit={onSubmit}
      initialValues={getDefaultData(data)}
      subscription={{ pristine: true, submitting: true, values: true }}
      contents={contents}
      validate={validate(formType)}
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
