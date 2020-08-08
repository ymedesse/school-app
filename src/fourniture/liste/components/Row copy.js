import React from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MuiButton from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { TitleTypography } from "../../../components/Typography";
import LazyLoad from "react-lazyload";
// import IconButtonMedia from "../../../components/IconButtonMedia";

const Product = ({
  cartProduts,
  value: product,
  addItemToCart,
  addItemToCommande,
  selectedProduct = [],
}) => {
  const getProductCartQt = (productId) => {
    const item = selectedProduct.find((v) => v.product._id === productId);
    return item ? item.quantity : "";
  };

  const [quantity, setQuantity] = React.useState(
    getProductCartQt(product._id) || ""
  );

  React.useEffect(() => {
    const m = getProductCartQt(product._id);
    setQuantity(m || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct]);

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { stock = 0 /*slug */ } = product;

  const handleQtChange = (event) => {
    // event.persist();
    const value = event.target.value;
    setQuantity((quantity) => parseInt(value) || "");
  };

  const getPrice = () => {
    return stock > 0 ? product.sale_price : product.order_price;
  };

  return (
    <Card elevation={3} className={classes.root}>
      <Grid spacing={2} container justify="space-between">
        <Grid item xs={3}>
          <LazyLoad height={200}>
            <img
              className={classes.image}
              src="https://picsum.photos/200"
              alt={product.name}
            />
          </LazyLoad>
        </Grid>
        <Grid container item xs={9}>
          <Grid item xs={12} sm={8}>
            <TitleTypography style={{ fontWeight: "500" }}>
              {product.name}
            </TitleTypography>
          </Grid>
          <Grid
            container
            xs={12}
            sm={4}
            justify={isMobile ? "flex-start" : "center"}
            alignItems="center"
            item
          >
            {isMobile && (
              <Typography variant="body2" color="textPrimary">
                ISBN : {product.isbn}
              </Typography>
            )}
            <MoreDetails />
          </Grid>
          <Grid item sm={4} xs={6}>
            <TitleTypography color="primary" variant="h5">
              {getPrice()} Fcfa
            </TitleTypography>
          </Grid>

          <Grid
            item
            justify="center"
            container
            alignItems="center"
            xs={6}
            sm={4}
          >
            {isMobile && " X "}
            <TextField
              type="number"
              placeholder="Qt"
              required={true}
              value={quantity}
              onChange={handleQtChange}
              className={classes.stock}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid
            justify="center"
            container
            alignItems="center"
            item
            sm={4}
            xs={12}
          >
            {stock > 0 ? (
              <ButtonWithIcon
                variant="contained"
                color="primary"
                size={isMobile ? "small" : "medium"}
                startIcon={<ShoppingCartIcon />}
                fullWidth
                onClick={() => addItemToCart(product._id, quantity)}
              >
                Ajouter au panier
              </ButtonWithIcon>
            ) : (
              <ButtonWithIcon
                variant="outlined"
                color="primary"
                size={isMobile ? "small" : "medium"}
                fullWidth
                startIcon={<LocalMallIcon />}
                onClick={() => addItemToCommande(product._id, quantity)}
              >
                Commander
              </ButtonWithIcon>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            style={{ textAlign: isMobile ? "center" : "left" }}
          >
            {!isMobile && (
              <>
                <Typography variant="body2" color="textPrimary">
                  ISBN : {product.isbn}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
              </>
            )}

            <OcassionButton count={product.usedStock} />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      value: prev !== null ? prev.value : {},
      cartProducts: prev !== null ? prev.cartProducts : [],
    }) ===
    JSON.stringify({
      value: next.value,
      cartProducts: next.cartProducts,
    })
  );
};

// export default React.memo(Product, isEqual);
export default React.memo(Product, isEqual);

const OcassionButton = ({ count }) => (
  <Link
    component="button"
    variant="body2"
    onClick={() => {
      console.info("I'm a button.");
    }}
  >
    {count} en occasion{pluriel(count)}
  </Link>
);

const MoreDetails = ({ count }) => {
  const classes = useStyles();

  return (
    <Link
      component="button"
      variant="body2"
      color="textPrimary"
      className={classes.moreDetails}
    >
      {/* "textPrimary","textSecondary */}
      plus de détails{" "}
      <ExpandMoreIcon className={classes.moreDetailsIcon} color="inherit" />
    </Link>
  );
};

const pluriel = (count) => {
  return count > 1 ? "s" : "";
};

const ButtonWithIcon = withStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    textTransform: "unset",
    //  color: theme.palette.grey["A400"],
    lineHeight: "1",
  },
}))(({ ...props }) => (
  <MuiButton size="small" variant="outlined" color="inherit" {...props} />
));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    maxHeight: "200px",
  },
  image: {
    // maxHeight: "100%",
    width: "100%",
  },
  details: {
    // display: "flex",
    // flexDirection: "column"
  },
  content: {
    // flex: "1 0 auto"
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  moreDetailsIcon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  moreDetails: {
    display: "flex",
  },
  stock: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    width: "50px",
    marginBottom: theme.spacing(2),
  },
}));
