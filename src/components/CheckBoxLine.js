import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default ({ handleChange, value, label, checked, ...restProps }) => {
  return (
    <FormControlLabel
      // style={{ /*margin: "auto", */ paddingTop: " 15px" }}
      control={
        <CustomCheckBox
          onChange={handleChange}
          value={value}
          color="primary"
          checked={checked}
        />
      }
      label={label}
      {...restProps}
    />
  );
};

const CustomCheckBox = withStyles(({ palette, spacing }) => ({
  root: {
    "&$disabled": {
      color: palette.primary.dark,
    },
  },
  disabled: {},
}))((props) => <Checkbox color="default" {...props} />);

export { CustomCheckBox };
