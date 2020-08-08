import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { SCHOOL_LIST_LINK } from "../../routerLinks";
import { TitleTypography } from "../../components/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import EmptyImage from "../../assets/empty.svg";

const EmptyCart = ({ isCommande= false}) => {
  const tabTitle = isCommande ? "liste de commande" : "panier";
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
        <img
          style={{
            height: "250px",
            margin: "auto",
          }}
          src={EmptyImage}
          alt="kk"
        />

        <Link
          component={RouterLink}
          style={{ marginTop: "16px" }}
          variant="h5"
          to={SCHOOL_LIST_LINK}
          color="secondary"
        >
          Trouvez votre liste de fournitures
        </Link>
      </Grid>
    </>
  );
};

export default EmptyCart;
