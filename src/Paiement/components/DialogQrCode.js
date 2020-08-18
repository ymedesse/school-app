import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import CustomDialog from "../../components/Dialog";
import MuiDialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import QrCodeCard from "./QrCodeCard";

const DialogQrCode = ({
  externalOpen = false,
  setTExternalOpen,
  qrCode = {},
  order,
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
      title={"Paiment en espèce par QrCode"}
      content={<QrCodeCard order={order} qrCode={qrCode} />}
      actions={
        <>
          <Button onClick={handleClose} color="primary">
            Fermer
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
        aria-labelledby="QrCode-payment"
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

export default DialogQrCode;
