import React from "react";
import Button from "@material-ui/core/Button";
import ToolTipMenu from "../../components/ToolTipMenuCtrl";
import List from "./List";
import { makeStyles } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";

const LbuMenu = () => {
  const Mclasses = useStyles();

  const onClick = (link, handleClick) => {
    handleClick();
    var win = window.open(link, "_blank");
    win.focus();
  };

  return (
    <ToolTipMenu
      actionner={(handleClick) => (
        <Button
          disableRipple={true}
          disableFocusRipple={true}
          disableElevation={true}
          size="large"
          color="inherit"
          onClick={onClick}
          className={Mclasses.button}
        >
          Librairie LBU
        </Button>
      )}
      content={({ handleClose }) => <List handleClose={handleClose} />}
      skeletonCount
    />
  );
};

export default LbuMenu;

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "unset",
    color: yellow["A200"],
  },
}));
