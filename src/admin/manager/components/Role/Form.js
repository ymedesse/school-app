import React from "react";
import { SubLargeTypography } from "../../../../components/Typography";
import Permissions from "./Permissions/List";
import { makeStyles } from "@material-ui/core/styles";
import { SimpleTextField } from "../../../../components/TextFieldMUI";
import { FieldArray } from "react-final-form-arrays";

const Form = ({
  success,
  submiting,
  pristine,
  valid,
  submitting,
  form,
  handleSubmit,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <>
      <SimpleTextField
        placeholder="Libeller du role"
        name="name"
        label="Libeller du role"
      />

      <div className={classes.title}>
        <SubLargeTypography>Attribuez des accès</SubLargeTypography>
      </div>

      <FieldArray name="permissions">
        {({ fields }) => {
          return (
            <Permissions
              fields={fields}
              submiting={submiting}
              pristine={pristine}
              valid={valid}
              submitting={submitting}
              form={form}
              handleSubmit={handleSubmit}
            />
          );
        }}
      </FieldArray>
    </>
  );
};

export default Form;

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(1, 0, 2, 0),
  },
}));
