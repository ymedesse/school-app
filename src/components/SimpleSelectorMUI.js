import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { Select } from "mui-rff";

const SimpleSelectorMui = ({
  name,
  labelWidth,
  values,
  label,
  labelId,
  variant = "outlined",
  fullWidth = true,
  helper,
  ...props
}) => {
  return (
    <Select
      margin="none"
      formControlProps={{ margin: "dense", fullWidth, variant }}
      name={name}
      labelWidth={labelWidth}
      variant={variant}
      inputProps={{
        name: labelId,
        id: labelId,
      }}
      label={label}
      helper={helper}
    >
      {values &&
        values.map((val, index) => (
          <MenuItem key={index} value={val}>
            {val}
          </MenuItem>
        ))}
    </Select>
  );
};

// const isEqual = (prev, next) => {
//   return JSON.stringify(prev.values) === JSON.stringify(next.values);
// };
// export default React.memo(SimpleSelectorMui, isEqual);
export default SimpleSelectorMui;
