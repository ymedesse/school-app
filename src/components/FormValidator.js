import React from "react";
import { Form } from "react-final-form";

import arrayMutators from "final-form-arrays";

export default ({
  onSubmit,
  initialValues,
  validate,
  contents = (props) => {},
  ...restProps
}) => {
  return (
    <Form
      mutators={{
        ...arrayMutators,
      }}
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, values, ...restProps }) => (
        <form onSubmit={handleSubmit} noValidate>
          {contents({ handleSubmit, values, ...restProps })}
        </form>
      )}
      {...restProps}
    />
  );
};

export const defaultSuscriptioin = {
  submitting: true,
  pristine: true,
  valid: true,
  dirty: true,
  modified: true,
};
