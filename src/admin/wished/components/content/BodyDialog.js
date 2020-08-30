import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import CustomDialog from "../../../../components/Dialog";
import MuiDialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListSkeleton from "../../../../components/ListSkeleton";

const Content = React.lazy(() => import("./index"));

const Body = ({
  submit,
  actionButton,
  values,
  nextStep,
  id,
  externalOpen = false,
  setTExternalOpen,
  title = "Modification",
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(externalOpen);

  React.useEffect(() => {
    setOpen(externalOpen);
  }, [externalOpen]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTExternalOpen && setTExternalOpen(false);
  };

  const handleNextStep = (...arg) => {
    setOpen(false);
    setTExternalOpen && setTExternalOpen(false);
    nextStep(...arg);
  };

  const content = (
    <CustomDialog
      title={title}
      content={
        <React.Suspense fallback={<ListSkeleton count={1} />}>
          <Content
            submit={submit}
            values={values}
            nextStep={handleNextStep}
            id={id}
          />
        </React.Suspense>
      }
      closeDialog={handleClose}
    />
  );

  return (
    <div>
      {actionButton && actionButton(handleClickOpen)}

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

export default Body;
