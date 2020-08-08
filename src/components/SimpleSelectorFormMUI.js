import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/styles";

import { Select } from "mui-rff";

const SimpleSelctorMui = ({
  classes,
  inputLabel,
  name,
  labelWidth,
  values,
  label,
  labelId,
  variant = "outlined",
  helper,
  fullWidth = true,
}) => {
  const nativeClasses = useStyles();
  const ref = React.useRef();
  return (
    <FormControl
      fullWidth={fullWidth}
      // className={classes.textField}
      margin="dense"
      ref={ref}
      className={nativeClasses.formControl}
    >
      {label && (
        <InputLabel  htmlFor={labelId}>
          {label}
        </InputLabel>
      )}

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
      >
        {values &&
          values.map((val, index) => (
            <MenuItem key={index} value={val}>
              {val}
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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default SimpleSelctorMui;
