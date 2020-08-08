import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { TitleTypography, SubTitleTypography } from "../../components/assets";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

export default function AddressItem({ address }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TitleTypography>{address.name}</TitleTypography>
      <SubTitleTypography>{address.description}</SubTitleTypography>
      <SubTitleTypography>{address.phone}</SubTitleTypography>
      <SubTitleTypography>{address.postal}</SubTitleTypography>
    </div>
  );
}
