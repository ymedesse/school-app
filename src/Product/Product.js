import React, { useContext, Suspense } from "react";
import useSWR from "swr";
import { makeStyles } from "@material-ui/core/styles";
import RootContext from "../rootContext/context";

import View from "./View";
const Product = props => {
  const slug = props.match.params.productId;
  const rootContext = useContext(RootContext);
  const { addToCart } = rootContext.cart;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Suspense fallback={<div> loading ...</div>}>
        <View slug={slug} addToCart={addToCart} />
      </Suspense>
      
      {/* <Suspense fallback={<div> loading ...</div>}>
            <Related addToCart={addToCart} slug={slug} />
          </Suspense>
          <Suspense fallback={<div> loading ...</div>}>
            <OtherWish addToCart={addToCart} slug={slug} />
          </Suspense>
          <Suspense fallback={<div> loading ...</div>}>
            <AddCartBottom bagId={bagId} addToCart={addToCart} />
          </Suspense> */}
    </div>
  );
};

export default Product;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(8)
    }
  }
}));
