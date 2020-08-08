import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import List from "./List";
import Footer from "./Footer";
import Header from "./Header";
import Opener from "../../../components/Opener";
import { CART_LINK } from "../../../routerLinks";

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

const ShortView = ({ cart, removeItem }) => {
  const classes = useStyles();
  const history = useHistory();

  const content = ({ handleClose }) => {
    const count = cart.count;

    return (
      <div style={{ width: "369px" }}>
        <Header count={count} />
        <List cart={cart} removeItem={removeItem} />
        <Footer count={count} handleClose={handleClose} amount={cart.total} />
      </div>
    );
  };

  return (
    <div>
      <Opener
        actioner={props => {
          return (
            <IconButton
              aria-label="Shopping cart"
              className={classes.iconButton}
              color="inherit"
              onClick={() => history.push(CART_LINK)}
              {...props}
            >
              <Badge badgeContent={cart.count} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          );
        }}
        content={content}
      />
    </div>
  );
};

export default ShortView;
