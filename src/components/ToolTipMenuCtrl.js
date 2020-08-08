import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const ToolTipMenu = ({
  content = () => {},
  actionner = () => {},
  skeletonCount = 4,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <LightTooltip
        interactive
        arrow
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        title={content({ handleClose })}
      >
        {actionner(handleClick)}
      </LightTooltip>
    </div>
  );
};

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: "0px",
  },
}))(Tooltip);

export default ToolTipMenu;
