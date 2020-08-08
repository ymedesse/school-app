import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const StatusFilters = ({ handleChange: change, init = "achat" }) => {
  const [alignment, setAlignment] = React.useState(init);
  const classes = useStyles();

  const handleChange = (event, type) => {
    if (type) {
      setAlignment(type);
      change(type==="tous"?undefined:type);
    }
  };

  return (
    <ToggleButtonGroup
      size="small"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton className={classes.button} value="achat">
        Achat
      </ToggleButton>
      <ToggleButton className={classes.button} value="commande">
        Commande
      </ToggleButton>
      <ToggleButton className={classes.button} value="tous">Tous</ToggleButton>
    </ToggleButtonGroup>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "unset",
    color: theme.palette.grey["A400"],
    lineHeight: "1",
    minWidth: "80px",
  },
}));

export default StatusFilters;
