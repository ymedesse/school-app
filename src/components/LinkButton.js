import React from "react";
import MuiLink from "@material-ui/core/Link";

const LinkButton = ({ onClick, label, ...props }) => (
  <MuiLink
    onClick={onClick}
    variant="body2"
    component="button"
    {...props}
  />
);
export { LinkButton };
