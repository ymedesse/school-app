import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";

export default ({
  classes = {},
  label,
  inputLabel,
  value,
  handleChange,
  labelWidth,
  values,
  labelField = "name",
  idField = "_id",
  variant = "outlined",
  helper,
}) => {
  const nativeClasses = useStyles();

  return (
    <FormControl
      variant={variant}
      fullWidth
      // className={classes.textField}
      margin="dense"
      className={nativeClasses.formControl}
    >
      {label && <InputLabel htmlFor={label}>{label}</InputLabel>}
      <Select
        margin="dense"
        value={value}
        onChange={handleChange}
        labelWidth={labelWidth}
      >
        {values &&
          values.map((val, index) => (
            <MenuItem key={val[`${idField}`]} value={val}>
              {val[`${labelField}`]}
            </MenuItem>
          ))}
      </Select>
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));
