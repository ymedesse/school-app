import React, { useState } from "react";
import Slide from "@material-ui/core/Slide";
import MuiDialog from "@material-ui/core/Dialog";
import { useTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CustomDialog from "../../../components/Dialog";
import ListSkeleton from "../../../components/ListSkeleton";

const Content = React.lazy(() => import("./index"));
const ContentDialog = ({
  actionButton,
  externalOpen = false,
  setTExternalOpen,
  data,
  title = !data.liste ? "Ajouter une liste" : "Modification",
  handleSubmitListe,
  performFullErrorAlert,
  performFullSuccessAlert,
  refresh,
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

  const content = (
    <CustomDialog
      title={title}
      content={
        <React.Suspense fallback={<ListSkeleton count={5} />}>
          <Content
            refresh={refresh}
            data={data}
            handleSubmitListe={handleSubmitListe}
            performFullErrorAlert={performFullErrorAlert}
            performFullSuccessAlert={performFullSuccessAlert}
            handleCloseDialog={() => {
              handleClose && handleClose();
              refresh && refresh();
            }}
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

export default ContentDialog;
