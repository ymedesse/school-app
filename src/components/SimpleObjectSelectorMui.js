import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/styles";
import { Select } from "mui-rff";

export default ({
  classes = {},
  labelField = "name",
  idField = "_id",
  name,
  labelWidth,
  values,
  label,
  labelId,
  variant = "outlined",
  helper,
  fullWidth = true,
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
          <MenuItem key={val[`${idField}`]} value={val}>
            {val[`${labelField}`]}
          </MenuItem>
        ))}
    </Select>
  );
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));
