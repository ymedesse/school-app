import React from "react";
import MuiTypography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const TitleTypography = withStyles({
  root: {
    fontWeight: "400",
  },
})((props) => <MuiTypography variant="h6" {...props} />);

const TableHeaderTypography = withStyles({
  root: {
    fontWeight: "500",
  },
})((props) => <MuiTypography variant="subtitle2" {...props} />);

const LargeTypography = withStyles({
  root: {
    fontWeight: "300"
  },
})((props) => <MuiTypography variant="h5" {...props} />);

const BigTypography = withStyles({
  root: {
    fontWeight: "lighter",
  },
})((props) => <MuiTypography variant="h4" {...props} />);

const SubLargeTypography = withStyles({
  root: {
    fontWeight: "400",
  },
})((props) => <MuiTypography variant="h6" {...props} />);

const SubTitleTypography = withStyles({
  root: {
    fontWeight: "300",
  },
})((props) => <MuiTypography variant="body1" {...props} />);

export {
  TitleTypography,
  SubTitleTypography,
  LargeTypography,
  SubLargeTypography,
  TableHeaderTypography,
  BigTypography,
};
