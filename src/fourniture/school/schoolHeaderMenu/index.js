import React from "react";
import Button from "@material-ui/core/Button";
import ToolTipMenu from "../../../components/ToolTipMenuCtrl";
import SchoolList from "./List";
import { makeStyles } from "@material-ui/core/styles";

const UserMenu = ({ user, signout, adminRole }) => {
  const Mclasses = useStyles();

  return (
    <ToolTipMenu
      actionner={(handleClick) => (
        <Button
          disableRipple={true}
          disableFocusRipple={true}
          disableElevation={true}
          size="large"

          color="inherit"
          onClick={handleClick}
          className={Mclasses.button}
        >
          Listes des Ecoles
        </Button>
      )}
      content={({ handleClose }) => <SchoolList handleClose={handleClose} />}
      skeletonCount
    />
  );
};

export default UserMenu;

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "unset",
  },
}));
