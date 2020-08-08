import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Hidden from "@material-ui/core/Hidden";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import SpinProductQt from "./components/SpinProductQt";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const Product = ({ bagId, addToCart }) => {
  const [values, setValues] = useState({ qt: 1 });
  const classes = useStyles();
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const addProductToCart = () => {
    addToCart(bagId, values.qt, () => {
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
        Ajouter au panier
      </Button>
    </div>
  );

  return (
    <Hidden smUp>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>{addToCardRow}</Toolbar>
      </AppBar>
    </Hidden>
  );
};

export default Product;

const useStyles = makeStyles(theme => {
  return {
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
