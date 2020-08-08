import React from "react";
import Typography from "@material-ui/core/Typography";
const LabelText = ({ children, ...props }) => {
  return (
    <Typography
      style={{
        display: "inline",
        fontWeight: "400" /* , lineHeight: "1.5", letterSpacing: "0.5px"*/,
      }}
      variant="body1" //body2
      {...props}
    >
      {children}
    </Typography>
  );
};

const ValueText = ({ children, ...props }) => {
  return (
    <Typography
      style={{ display: "inline", fontWeight: "500" }}
      variant="body1"
      {...props}
    >
      {children}
    </Typography>
  );
};

const ValueTextLight = ({ children, ...props }) => {
  return (
    <Typography style={{ display: "inline" }} variant="body1" {...props}>
      {children}
    </Typography>
  );
};

const MiniValueText = ({ children, ...props }) => {
  return (
    <Typography style={{ display: "inline" }} variant="subtitle2" {...props}>
      {children}
    </Typography>
  );
};
const MiniLabelText = ({ children, ...props }) => {
  return (
    <Typography style={{ display: "inline" }} variant="body2" {...props}>
      {children}
    </Typography>
  );
};

export { LabelText, ValueText, ValueTextLight, MiniValueText, MiniLabelText };
