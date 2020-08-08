import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import CustomDialog from "../../../../components/Dialog";
import MuiDialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ProductSelector from "./MultiSelectorList";

const Selector = ({
  actionButton,
  title = "Liste des produits",
  handleSelected,
  multiSelector,
  selected,
  initialOpen,
  setInitialOpen,
}) => {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [open, setOpen] = useState(initialOpen);

  React.useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInitialOpen(false);
  };

  const dialogContent = (
    <ProductSelector
      multiSelector={multiSelector}
      handleSelected={handleSelected}
      selected={selected}
    />
  );

  const action = (
    <Box display="flex" p={0} style={{ width: "100%" }}>
      <Box ml={2} flexGrow={1}></Box>
      <Box p={0}>
        <Button onClick={handleClose} color="primary">
          Fermer
        </Button>
      </Box>
    </Box>
  );

  const content = (
    <CustomDialog
      title={title}
      content={dialogContent}
      actions={action}
      closeDialog={handleClose}
    />
  );

  return (
    <div>
      {actionButton && actionButton(handleClickOpen)}

      <Dialog
        maxWidth="sm"
        fullScreen
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
  return <Slide direction="left" ref={ref} {...props} />;
});

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      selected: prev.selected,
      initialOpen: prev.initialOpen,
    }) ===
    JSON.stringify({
      selected: next.selected,
      initialOpen: next.initialOpen,
    })
  );
};

export default React.memo(Selector, isEqual);
