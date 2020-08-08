import React from "react";
import TextField from "@material-ui/core/TextField";

const SpinProductQt = ({ value, handleChange, ...restProps }) => {
  return (
    <TextField
      id="qt"
      value={value}
      onChange={handleChange}
      type="number"
      {...restProps}
      placeholder="Qt"
      InputLabelProps={{
        shrink: true
      }}
    />
  );
};

export default SpinProductQt;
