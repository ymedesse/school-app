import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiPaper from "@material-ui/core/Paper";

const PaperMui = withStyles(theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))(({ elevation = 1, ...props }) => (
  <MuiPaper variant="outlined" square elevation={elevation} {...props} />
));

export default PaperMui;
