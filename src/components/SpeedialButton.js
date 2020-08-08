import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

/**
 *
 * @param {array} actions all action [{name,icon}]
 * @param {boolean} hidden if hidden
 */
export default function SpeedialButton({
  actions,
  icon = <SpeedDialIcon />,
  hidden = false,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div >
      <SpeedDial
        ariaLabel="options"
        className={classes.speedDial}
        hidden={hidden}
        icon={icon}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              action.handleClick && action.handleClick();
              handleClose();
            }}
          />
        ))}
      </SpeedDial>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  sppeedWrapper: {
    position: "relative",
    // marginTop: theme.spacing(3),
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));
