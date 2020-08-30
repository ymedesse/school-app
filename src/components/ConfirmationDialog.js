import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import CustomDialog from "./Dialog";
import { ValueText } from "./LabelValueTypography";
import MuiDialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";

const Confirmation = ({
  title,
  submit,
  externalOpen = false,
  setTExternalOpen,
  contentText = "Êtes vous sur de vouloir annuler votre commande",
  cancelLabel = "Annuler",
  confirmationLabel = "Je confirme",
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(externalOpen);

  React.useEffect(() => {
    setOpen(externalOpen);
  }, [externalOpen]);

  const handleClose = () => {
    setOpen(false);
    setTExternalOpen && setTExternalOpen(false);
  };

  const content = (
    <CustomDialog
      title={title}
      content={<ValueText>{contentText}</ValueText>}
      actions={
        <>
          <Button onClick={handleClose} color="primary">
            {cancelLabel}
          </Button>
          <Button
            onClick={() => {
              submit();
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            {confirmationLabel}
          </Button>
        </>
      }
      closeDialog={handleClose}
    />
  );

  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={open}
        fullScreen={fullScreen}
      >
        {content}
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

export default Confirmation;
