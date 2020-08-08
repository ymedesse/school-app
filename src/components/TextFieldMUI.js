import React from "react";
import { TextField } from "mui-rff";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

const SimpleTextField = ({
  className,
  name,
  label,
  placeholder,
  variant = "outlined",
  fullWidth = true,
  ...props
}) => (
  <TextField
    placeholder={placeholder}
    className={className}
    type="text"
    variant={variant}
    fullWidth={fullWidth}
    margin="dense"
    // size="small"
    name={name}
    label={label}
    {...props}
  />
);

const PriceTextField = ({
  className,
  name,
  label,
  placeholder,
  variant = "outlined",
  fullWidth = true,
  ...props
}) => (
  <TextField
    size="small"
    type="number"
    variant={variant}
    placeholder={placeholder}
    margin="dense"
    fullWidth={fullWidth}
    className={className}
    name={name}
    label={label}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <LocalOfferIcon />
        </InputAdornment>
      ),
      endAdornment: <InputAdornment position="end">FCFA</InputAdornment>,
      max: 4,
    }}
    {...props}
  />
);

const PriceSimpleTextField = ({
  className,
  name,
  label,
  placeholder,
  variant = "outlined",
  fullWidth = true,
  ...props
}) => (
  <TextField
    size="small"
    type="number"
    variant={variant}
    placeholder={placeholder}
    margin="dense"
    fullWidth={fullWidth}
    className={className}
    name={name}
    label={label}
    InputProps={{
      endAdornment: <InputAdornment position="end">FCFA</InputAdornment>,
    }}
    {...props}
  />
);

const NumberTextField = ({
  className,
  name,
  label,
  type = "number",
  placeholder,
  adornment,
  adornmentPosition = "start",
  adornmentStyle = {},
  variant = "outlined",
  fullWidth = true,

  ...props
}) => {
  const adorn = adornment
    ? {
        InputProps: {
          startAdornment: (
            <InputAdornment style={adornmentStyle} position={adornmentPosition}>
              {adornment}
            </InputAdornment>
          ),
        },
      }
    : {};

  return (
    <TextField
      size="small"
      type={type}
      variant={variant}
      placeholder={placeholder}
      margin="dense"
      fullWidth={fullWidth}
      className={className}
      name={name}
      label={label}
      {...adorn}
      {...props}
    />
  );
};

const PasswordField = ({
  name = "password",
  value,
  placeholder = "Mot de passe",
  ...restProps
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      placeholder={placeholder}
      label={value && placeholder}
      margin="dense"
      variant="outlined"
      fullWidth
      name={name}
      type={showPassword ? "text" : "password"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
};

export {
  SimpleTextField,
  PriceTextField,
  NumberTextField,
  PasswordField,
  PriceSimpleTextField,
};
