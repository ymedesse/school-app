import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CustomDialog from "../../../../components/Dialog";
import { SimpleTextField } from "../../../../components/TextFields";
import MuiDialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { TitleTypography } from "../../../../components/Typography";

const Form = ({ submit, actionButton, value }) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(value.name || "");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    submit({ ...value, name });
    setOpen(false);
  };

  const formulaire = (
    <>
      <TitleTypography className={classes.title}>
        Saisissez un libeller pour l'action
      </TitleTypography>
      <SimpleTextField
        value={name}
        handleChange={(e) => setName(e.target.value)}
        name="action"
        label="Libeller"
        placeholder="libeller"
        helperText="libeller de l'action"
        variant="outlined"
      />
    </>
  );

  const action = (
    <Box display="flex" p={0} style={{ width: "100%" }}>
      <Box ml={2} flexGrow={1}></Box>
      <Box p={0}>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
      </Box>
      <Box p={0}>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Valider
        </Button>
      </Box>
    </Box>
  );

  const content = (
    <CustomDialog
      title={value.id}
      content={formulaire}
      actions={action}
      closeDialog={handleClose}
    />
  );

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

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(1, 0, 2, 0),
  },
}));

export default Form;
