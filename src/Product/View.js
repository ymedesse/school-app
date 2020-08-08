import React, { useState } from "react";
import useSWR from "swr";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Hidden from "@material-ui/core/Hidden";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Rating from "@material-ui/lab/Rating";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Link as LinkRouter } from "react-router-dom";
import SpinProductQt from "./components/SpinProductQt";
import { PRODUCT_READ_URL } from "./containers/urls";

import { API } from "../config";

const Product = ({ slug, addToCart }) => {
  const [values, setValues] = useState({ qt: 1 });

  const url = PRODUCT_READ_URL + slug;

  const { data } = useSWR(url);

  const { error, ...bag } = data;
  const classes = useStyles({
    image: bag && `${API}/photo/${bag.assets.featuredImage}`
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const addProductToCart = () => {
    addToCart(bag._id, values.qt, () => {
      // setAdded(product.name + " a été bien ajouter à votre panier  ");
    });
  };

  const addToCardRow = (
    <div className={classes.flex}>
      <SpinProductQt
        variant="outlined"
        value={values.qt}
        handleChange={handleChange("qt")}
        className={classes.spinQt}
        margin="dense"
        InputProps={{
          startAdornment: <InputAdornment position="start">Qt: </InputAdornment>
        }}
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<ShoppingCartIcon />}
        onClick={addProductToCart}
      >
        Ajouter au paniers
      </Button>
    </div>
  );

  const brands =
    bag.brands && bag.brands.length > 0
      ? bag.brands.map(item => item.name).jsoin(", ")
      : undefined;

  return (
    <Grid spacing={4} container>
      <Grid item sm={1}>
        Image slider{" "}
      </Grid>
      <Grid item xs={12} sm={5}>
        <Paper className={classes.image}> Main image</Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        {/* Show Brand  */}
        {brands && <Typography variant="body2"> {brands} </Typography>}

        {/* product name */}
        <Typography className={classes.title} variant="h6" gutterBottom>
          {bag.name}
        </Typography>

        {/* rating */}
        <div className={classes.rating}>
          <Rating value={5} size="small" />
          <Box ml={2} mt={0.5}>
            <Link
              underline="always"
              variant="body2"
              color="textSecondary"
              component={LinkRouter}
              to="#"
            >
              3 avis
            </Link>
          </Box>
        </div>
        <div className={classes.margin} />
        <div className={classes.margin} />

        <Typography variant="body1">
          {bag.descriptions && bag.descriptions[0].short}
        </Typography>

        <div className={classes.margin} />

        <Link
          underline="always"
          variant="body2"
          color="textSecondary"
          component={LinkRouter}
          to="#"
        >
          Voir toute la description
        </Link>

        <div className={classes.margin} />

        <div className={classes.flex}>
          <Typography
            color="textSecondary"
            className={clsx(classes.essential, classes.discount)}
          >
            -45 %
          </Typography>

          <Typography
            color="textSecondary"
            variant="h6"
            className={classes.essential}
          >
            <strike>{bag.prices.price} XOR </strike>
          </Typography>

          <Typography variant="h5" className={classes.price}>
            {bag.prices.sale.price} XOR
          </Typography>
          {/* {JSON.stringify(product)} */}
        </div>

        <div className={classes.margin} />

        <Hidden smDown>
          <div className={classes.margin} />
          <div className={classes.margin} />

          {addToCardRow}
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default Product;

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: "flex",
      backgroundColor: theme.palette.background.paper,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(8)
      }
    },
    image: {
      backgroundImage: props => `url(${props.image})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      maxHeight: "400px",
      margin: "auto",
      width: "auto",
      height: "400px",
      backgroundSize: "contain"
    },
    rating: {
      display: "flex",
      alignItems: "center"
    },
    title: {
      fontSize: "25px",
      lineHeight: "1.2"
    },

    margin: {
      marginTop: theme.spacing(2.5)
    },
    flex: {
      display: "inline-flex"
    },
    discount: {
      // font-size: 18px;
      fontWeight: "500",
      padding: "2px 5px 2px 5px",
      backgroundColor: "#d51317",
      color: "#fff",
      marginRight: theme.spacing(1),
      width: "fit-content"
    },

    essential: {
      fontSize: "1.125rem",
      fontWeight: "300"
    },
    price: {
      fontWeight: "500",
      marginLeft: theme.spacing(3)
    },
    spinQt: {
      marginRight: theme.spacing(1),
      width: "100px",
      minWisth: "50px",
      "& .MuiInputAdornment-positionStart": {
        marginRight: "3px"
      },
      "& .MuiOutlinedInput-adornedStart": {
        paddingLeft: "8px"
      },
      "& .MuiOutlinedInput-input": {
        paddingRight: "8px",
        textAlign: "center"
      }
    },
    appBar: {
      top: "auto",
      bottom: 0,
      alignItems: "center"
    },
    toolBar: {
      margin: "10px auto"
    }
  };
});
