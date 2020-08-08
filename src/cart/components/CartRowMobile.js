import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ProductThumbnail from "../../Product/components/ProductThumbnail";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import DiscountPercentLabel from "./DiscountPercentLabel";
import Title from "./ProductFullTitle";
import SalePrice from "./SalePrice";
import useProductAssets from "../../components/hook/useProductAssets";

import CssBaseline from "@material-ui/core/CssBaseline";
const CartItemRowMobile = ({ item, setItemCount, removeItem, isCommande }) => {
  const ownItem = { ...item.product };
  const { quantity } = item;
  const { first } = useProductAssets(ownItem.assets);
  const classes = useStyles({
    image: first,
  });

  const error = quantity < 1;
  const renderRow = (product) => {
    if (product !== undefined) {
      return (
        <>
          <CssBaseline />
          <Grid spacing={0} container style={{ minHeight: "90px" }}>
            <Box display="flex" p={0} style={{ width: "100%" }}>
              <Box minWidth="max-content" alignSelf="center">
                <ProductThumbnail product={product} imageFile={first} />
              </Box>
              <Box flexGrow={1}>
                <Title quantity={quantity} item={product} />
              </Box>
              <Box alignSelf="center">
                <IconButton
                  className={classes.delete}
                  aria-label="delete"
                  size="small"
                  onClick={() => removeItem(product._id)}
                >
                  <HighlightOffIcon color="secondary" />
                </IconButton>
              </Box>
            </Box>

            <Box
              display="flex"
              p={0}
              alignItems="baseline"
              style={{ width: "100%" }}
            >
              <Box flexGrow={1}>
                <TextField
                  value={quantity}
                  type="number"
                  helperText={error && "Valeur invalide"}
                  error={error}
                  onChange={(event) => setItemCount(event)}
                  //margin="dense"
                  className={classes.spinQt}
                  placeholder="qte"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box>
                <DiscountPercentLabel discount={product.discount} />
              </Box>

              <Box>
                <SalePrice
                  quantity={quantity}
                  product={product}
                  priceField={isCommande ? "order_price" : "sale_price"}
                />
              </Box>
            </Box>
          </Grid>
        </>
      );
    }

    return "";
  };

  return <>{renderRow(ownItem)}</>;
  // return <> neo </>;
};

const useStyles = makeStyles((theme) => ({
  spinQt: {
    height: "36px",
    display: "contents",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100px",
      width: "75px",
    },

    "& .MuiInputAdornment-positionStart": {
      marginRight: "3px",
    },
    "& .MuiOutlinedInput-adornedStart": {
      paddingLeft: "8px",
    },
    "& .MuiOutlinedInput-input": {
      padding: "2px",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        width: "75px",
        padding: "0px",
      },
    },
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
      height: theme.spacing(4),
      [theme.breakpoints.down("sm")]: {
        height: theme.spacing(3),
      },
    },
  },
  strike: {
    margin: "auto",
    marginRight: "5px",
    fontWeight: "300",
  },
  delete: {
    margin: "auto",
  },
}));

export default CartItemRowMobile;
