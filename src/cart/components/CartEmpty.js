import React from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import EmptyImage from "../../assets/empty.svg";
import { SCHOOL_LIST_LINK } from "../../routerLinks";
import { TitleTypography } from "../../components/Typography";
import { ButtonSimple } from "../../components/Buttons";

import { makeStyles } from "@material-ui/core/styles";

const EmptyCart = ({ isCommande = false }) => {
  const tabTitle = isCommande ? "liste de commande" : "panier";
  const history = useHistory();
  const classes = useStyles();
  return (
    <>
      <TitleTypography gutterBottom>
        {`Votre  ${tabTitle} est vide!`}
      </TitleTypography>
      <Grid
        style={{ padding: "16px" }}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <img className={classes.image} src={EmptyImage} alt="kk" />

        <ButtonSimple onClick={() => history.push(SCHOOL_LIST_LINK)}>
          Trouvez une liste de fournitures{" "}
        </ButtonSimple>
      </Grid>
    </>
  );
};

export default EmptyCart;

const useStyles = makeStyles((theme) => ({
  image: {
    width: "350px",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "250px",
    },
  },
  suspense: {},
}));
