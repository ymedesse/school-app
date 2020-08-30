import React from "react";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import ContactPhoneIcon from "@material-ui/icons/PhoneAndroid";
import FormValidator from "../../../components/FormValidator";
import compareProps from "../../../utils/compareProps";
import { SimpleTextField } from "../../../components/TextFieldMUI";
import { OkIconButton, CancelIconButton } from "../../../components/Buttons";
import validate from "../content/validations";

const WishedInfo = ({
  data,
  handleSubmitInfo,
  performFullErrorAlert,
  performFullSuccessAlert,
  handleCancel,
  next,
}) => {
  const onSubmit = async (values, form, complete) => {
    handleSubmitInfo(values, (resultat) => {
      next && next();
    });
  };

  const contents = ({ form, values, ...props }) => (
    <Box width="100%" display="flex">
      <Box flexGrow={1}>
        <SimpleTextField
          placeholder="Vos contacts  numéro 1 , numéro 2 , ..."
          label="Votre contact"
          helperText="Numéros de téléphones par les quelles nous pouvons vous joindre"
          required={true}
          fullWidth
          name="phone"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ContactPhoneIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box margin="auto">
        <CancelIconButton
          onClick={handleCancel && handleCancel}
          size="medium"
        />

        <OkIconButton size="medium" color="primary" type="submit" />
      </Box>
    </Box>
  );

  return (
    <FormValidator
      onSubmit={onSubmit}
      initialValues={getDefaultData(data)}
      subscription={{ pristine: true, submitting: true }}
      contents={contents}
      validate={validate}
    />
  );
};

const isEqual = (prev, next) => {
  return compareProps(prev, next, ["data"]);
};

export default React.memo(WishedInfo, isEqual);

const getDefaultData = (data = {}) => {
  const { phone } = data;
  return {
    phone: phone || "",
  };
};
