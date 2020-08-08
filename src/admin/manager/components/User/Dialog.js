import React, { useState, Suspense, lazy } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const Content = lazy(() => import("./Content"));

/**
 *
 * @param {func} submitSelected function to get selected files
 * @param {func} actionButton function which get onClickHandler and return buttonComponent dto open dialog
 */
const DialogInfo = ({ submitSelected, actionButton, user }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (val) => {
    val && submitSelected(val);
    setOpen(false);
  };

  return (
    <div>
      {actionButton(handleClickOpen)}

      <Dialog
        maxWidth="sm"
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={open}
        fullScreen={fullScreen}
      >
        <Suspense fallback={<div>loading ...</div>}>
          <Content
            openInDialog={true}
            closeDialog={handleClose}
            dialog={true}
            onSubmit={handleSubmit}
            user={user}
          />
        </Suspense>
      </Dialog>
    </div>
  );
};

const Dialog = withStyles((theme) => ({
  paperWidthXs: {
    maxWidth: "345px",
  },
}))(MuiDialog);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// FieldsDialog.propTypes = {
//   trigger: PropTypes.func.isRequired,
//   handleSelected: PropTypes.func.isRequired
// };

export default DialogInfo;
