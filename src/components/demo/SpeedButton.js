import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedButton from "../SpeedButton";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
  root: {
    transform: "translateZ(0px)",
    flexGrow: 1
  },
}));

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
  { icon: <FavoriteIcon />, name: "Like" }
];

export default function SpeedDials() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SpeedButton actions={actions} />
    </div>
  );
}
