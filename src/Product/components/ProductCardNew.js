import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { CardMedia } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { PRODUCT_LINK } from "../../routerLinks";
import { API } from "../../config";
import SpinProductQt from "./SpinProductQt";

import {
  TextSkeleton,
  RectangleSkeleton,
  ButtonSkeleton
} from "../../components/Skeletons";
const imageMaxWidth = "180px";
const imageMaxHeigth = "180px";
const cardMawWidth = "180px";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: cardMawWidth
  },
  img: {
    maxWidth: "100%",
    height: "100%"
    // margin: "auto"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "50px",
    marginBottom: theme.spacing(2)
  },
  action: {
    justifyContent: "center"
  },
  button: {
    //fontSize: "0.8vw"
  },
  rightIcon: {
    // fontSize: "1.4vw",
    marginLeft: "2px"
  },
  price: {
    //  textAlign: "center",
    // color: "primary"
  }
}));

const ProductCardNew = ({ product, addToCart, setSuccess }) => {
  const classes = useStyles();
  const [qte, setQte] = useState(1);
  const history = useHistory();

  const imageUrl = `${API}/photo/${product.assets.featuredImage}`;

  const handleChange = name => event => {
    setQte(event.target.value);
  };

  const addProductToCart = () => {
    addToCart(product._id, { quantity: qte }, () => {
      setSuccess({
        success: product.name + " a été bien ajouter à votre panier"
      });
    });
  };

  const sale_price = product.prices.sale.price;
  

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea
          onClick={() => history.push(PRODUCT_LINK + "/" + product.slug)}
        >
          <CardMedia
            component="img"
            image={imageUrl}
            title={product.name}
            className={classes.img}
          />
          <CardContent className={classes.content}>
            <Typography variant="subtitle1">{product.name}</Typography>
            <div>
              <Typography color="primary" className={classes.price}>
                {sale_price}
              </Typography>
            </div>
          </CardContent>

          {/* <div className={classes.img}></div> */}
        </CardActionArea>
        <CardActions disableSpacing className={classes.action}>
          {/* <div className={classes.grow} /> */}

          <SpinProductQt
            value={qte}
            handleChange={handleChange("qt")}
            className={classes.textField}
            margin="dense"
          />

          <Button
            variant="contained"
            color="primary"
            size="small"
            dense="true"
            className={classes.button}
            onClick={addProductToCart}
          >
            Ajouter
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export const Fallback = () => {
  return (
    <div
      style={{
        display: "block",
        textAlign: "center",
        width: "100%",
        maxWidth: cardMawWidth
      }}
    >
      <RectangleSkeleton width={imageMaxWidth} height={imageMaxHeigth} />
      <TextSkeleton width={`70%`} />
      <ButtonSkeleton />
    </div>
  );
};

const equal = (prevProps, nexProps) => {
  return JSON.stringify(prevProps.product) === JSON.stringify(nexProps.product);
};
export default React.memo(ProductCardNew, equal);
