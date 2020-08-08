import React from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import MuiButton from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import useProductAssets from "../../../components/hook/useProductAssets";
import {
  ValueText,
  MiniLabelText,
} from "../../../components/LabelValueTypography";
import LazyLoad from "react-lazyload";
// import ProductThumbnail from "../../../Product/components/ProductThumbnail";
// import IconButtonMedia from "../../../components/IconButtonMedia";

const Product = ({
  cartProduts,
  value: product,
  addItemToCart,
  addItemToCommande,
  selectedProduct = [],
}) => {
  const { assets } = { ...product };
  const { first } = useProductAssets(assets);
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
    const value = parseInt(event.target.value) || 0;

    setQuantity((quantity) => (value < 0 ? 0 : value));
  };

  const getPrice = () => {
    return stock > 0 ? product.sale_price : product.order_price;
  };

  const getButtons = () =>
    stock > 0 ? (
      <ButtonWithIcon
        variant="contained"
        color="primary"
        size={isMobile ? "small" : "medium"}
        startIcon={<ShoppingCartIcon />}
        onClick={() => addItemToCart(product._id, quantity)}
      >
        Ajouter
      </ButtonWithIcon>
    ) : (
      <ButtonWithIcon
        variant="outlined"
        color="primary"
        size={isMobile ? "small" : "medium"}
        startIcon={<LocalMallIcon />}
        onClick={() => addItemToCommande(product._id, quantity)}
      >
        Commander
      </ButtonWithIcon>
    );

  const valueVariante = { variant: isMobile ? "subtitle2" : "body1" };
  // const labelVariante = { variant: isMobile ? "body1" : "body2" };
  return (
    <Paper elevation={3} variant="outlined" square className={classes.root}>
      <Box display="flex" width="100%">
        <Box
          minWidth={isMobile ? "80px" : "150px"}
          textAlign="center"
          maxWidth={isMobile ? "80px" : "150px"}
          alignSelf="center"
          pl={0.2}
          pr={0.2}
          pt={1}
          pb={1}
        >
          <LazyLoad>
            <img className={classes.image} src={first} alt={product.name} />
          </LazyLoad>
        </Box>
        <Box flexGrow={1}>
          <Grid
            spacing={1}
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{ padding: "8px", height: isMobile ? "auto" : "130px" }}
          >
            <div className={classes.flex}>
              <div style={{ display: "flex" }}>
                <ValueText {...valueVariante} className={classes.name}>
                  {product.name}
                </ValueText>
                <MoreDetails />
              </div>
              <div>
                <MiniLabelText>isbn : {product.isbn} </MiniLabelText>
                <MiniLabelText>{product.description}</MiniLabelText>
                <ValueText
                  {...valueVariante}
                  className={classes.price}
                  color="primary"
                >
                  {getPrice()} Fcfa
                </ValueText>
              </div>
            </div>
            <div className={classes.btnContainer}>
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

              {getButtons()}
            </div>
          </Grid>
        </Box>
      </Box>
    </Paper>
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

// const OcassionButton = ({ count }) => (
//   <Link
//     component="button"
//     variant="body2"
//     onClick={() => {
//       console.info("I'm a button.");
//     }}
//   >
//     {count} en occasion{pluriel(count)}
//   </Link>
// );

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
      voir plus{" "}
      <ExpandMoreIcon className={classes.moreDetailsIcon} color="inherit" />
    </Link>
  );
};



const ButtonWithIcon = withStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    textTransform: "unset",
    width: "120px",
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
  flex: {
    flexGrow: 1,
  },
  image: {
    // maxHeight: "100%",
    maxWidth: "-webkit-fill-available",
    width: "auto",
    maxHeight: "120px",
  },
  btnContainer: {
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  mask: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      flexGrow: 1,
    },
  },
  name: {
    [theme.breakpoints.down("sm")]: {
      marginRight: "8px",
      display: "block",
      flexGrow: 1,
    },
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
    display: "inline-flex",
  },
  price: {
    display: "block!important",
  },
  stock: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    maxWidth: "40px",
    display: "inline-flex",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "inline-block",
    },
  },
}));
