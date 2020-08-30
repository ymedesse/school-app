import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import CustomDialog from "../../../../components/Dialog";
import MuiDialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListSkeleton from "../../../../components/ListSkeleton";
const LoacalStatusList = React.lazy(() => import("./List"));

const LocalStatus = ({
  submit,
  actionButton,
  externalOpen = false,
  setTExternalOpen,
  title = "Modification du status",
  values,
  item,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(externalOpen);
  const [current, setCurrent] = React.useState(item.status || "");

  React.useEffect(() => {
    setOpen(externalOpen);
  }, [externalOpen]);

  React.useEffect(() => {
    setCurrent((current) => item.status || "");
  }, [item]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTExternalOpen && setTExternalOpen();
  };

  const onSubmit = () => {
    submit(current, () => {
      setTExternalOpen(current);
      setOpen(false);
    });
  };

  const content = (
    <CustomDialog
      title={title}
      content={
        <React.Suspense fallback={<ListSkeleton count={3} />}>
          <LoacalStatusList
            current={current}
            status={values}
            setCurrent={setCurrent}
          />
        </React.Suspense>
      }
      closeDialog={handleClose}
      actions={
        <>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={onSubmit} color="primary">
            Enrégistrer
          </Button>
        </>
      }
    />
  );

  return (
    <div>
      {actionButton && actionButton(handleClickOpen)}

      <Dialog
        fullWidth
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

export default LocalStatus;
