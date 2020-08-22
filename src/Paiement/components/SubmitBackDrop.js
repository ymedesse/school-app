import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

import { ButtonWithIcon } from "../../components/Buttons";

const SubmitBackDrop = ({ submiting, setSubmiting, isMomo }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={submiting}>
      <CircularProgress color="inherit" />
      {isMomo && (
        <>
          <div
            style={{
              fontSize: "1.2rem",
              textAlign: "center",
              margin: "16px auto",
            }}
          >
            Si vous ne recevez pas une demande de validation automatiquement,
            veuillez vérifier les validations en attente,
          </div>
          <ButtonWithIcon
            onClick={() => setSubmiting(false)}
            variant="contained"
            color="primary"
          >
            ANNULER LA REQUETE
          </ButtonWithIcon>
        </>
      )}
    </Backdrop>
  );
};

export default SubmitBackDrop;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    display: "inline-grid",
    alignContent: "center",
    justifyItems: "center",
    backgroundColor: "#000000a8",
  },
}));
