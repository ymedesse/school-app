import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as LinkRouter } from "react-router-dom";
import { PRODUCT_LINK } from "../../routerLinks";

const ProductThumbnail = ({ product, imageFile, ...restProps }) => {
  const classes = useStyles();
  return (
    <LinkRouter className={classes.link} to={PRODUCT_LINK + "/" + product.slug}>
      <img
        className={classes.image}
        // src={`${API}/photo/${product.assets.featuredImage}`}
        src={imageFile}
        alt={product.name}
      />
      {/* <div className={classes.image} /> */}
    </LinkRouter>
  );
};

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    alignSelf: "center",

    // margin: "auto",
    width: "auto",
    backgroundSize: "contain",
    maxHeight: "72px",
    /* max-height: 72px; */
    // maxWidth: "100%",
    padding: "8px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "85px",
      alignSelf: "center",
    },
  },
  link: {
    display: "flex",
    width: "fit-content",
    margin: "auto",

    alignSelf: "center",
  },
}));

export default ProductThumbnail;
