import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const FedBackDrop = ({ initOpen = false, mustBeValidate = true }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(initOpen);
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    setOpen(initOpen);
  }, [initOpen]);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleToggle}>
        Show backdrop
      </Button>
      <Backdrop
        className={classes.backdrop}
        open={open}
        onClick={!mustBeValidate && handleClose}
        handleClose
      >
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" width="100%">
            <Box>
              <ErrorOutlineIcon />
            </Box>
            <Box flexGrow={1}>
              Vérifiez votre téléphone. Vous devez recevoir une demande de
              vaalidation du montant de votre commande. Si vous ne recevez
              aucune notification push, veuillez la vérifier dans le menu de
              validation en attente de votre. Merci
            </Box>
          </Box>
        </Grid>
      </Backdrop>
    </div>
  );
};

export default FedBackDrop;
