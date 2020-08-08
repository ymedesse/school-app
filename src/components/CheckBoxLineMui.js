import React from "react";
import { Checkboxes } from "mui-rff";
import { withStyles } from "@material-ui/core/styles";

const CustomCheckBox = withStyles(({ palette, spacing }) => ({
  root: {
    "&$disabled": {
      color: palette.primary.dark,
    },
  },
  disabled: {},
}))((props) => <Checkboxes color="default" {...props} />);

export default ({
  name,
  label,
  variant = "outlined",
  formControlProps = {},
  ...restProps
}) => {
  return (
    <CustomCheckBox
      color="primary"
      variant={variant}
      name={name}
      formControlProps={{
        margin: "none",
        style: { fontWeight: "600", ...formControlProps },
      }}
      data={{
        label: label,
        value: true,
      }}
      {...restProps}
    />
  );
};
