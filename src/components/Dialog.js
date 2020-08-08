import React from "react";

import { IconButton, CssBaseline, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";

/**
 *
 * @param {func} closeDialog function à exécuter pour fermer la boite de dialoge
 * @param {Node} actions les buttons actions de la boite de dialogue
 * @param {Node} content Contenu du dialog
 * @param {String} actionDirection Allignement action
 * @param {String} titleAlign Allignement titre
 */
const DialogFrame = ({
  actions,
  content,
  title,
  closeDialog,
  actionDirection = "center",
  titleAlign = "center"
}) => {
  return (
    <>
      <CssBaseline />
      <DialogTitle
        textAlign={titleAlign}
        id="customized-dialog-title"
        onClose={closeDialog}
        justifyContent={actionDirection}
      >
        {title}
      </DialogTitle>

      <DialogContent dividers={closeDialog !== undefined}>
        {content}
      </DialogContent>
      {actions !== undefined && (
        <DialogActions justifycontent={actionDirection}>
          {actions}
        </DialogActions>
      )}
    </>
  );
};

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, textAlign } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography
        variant="h6"
        style={{ textAlign: textAlign ? textAlign : "left" }}
      >
        {children}
      </Typography>
      {onClose !== undefined ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: props =>
      props.justifyContent ? props.justifyContent : "flex-end"
  }
}))(MuiDialogActions);

export default DialogFrame;
