import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ProductThumbnail from "../../Product/components/ProductThumbnail";
import { TableHeaderTypography } from "../../components/assets";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import DiscountPercentLabel from "./DiscountPercentLabel";
import Title from "./ProductFullTitle";
import SalePrice from "./SalePrice";
import useProductAssets from "../../components/hook/useProductAssets";

const CartItemRow = ({ item, setItemCount, removeItem, isCommande }) => {
  const ownItem = { ...item.product };
  const { quantity } = item;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { first } = useProductAssets(ownItem.assets);
  const classes = useStyles({
    image: `${first}`,
  });

  const error = quantity < 1;
  const renderRow = (product) => {
    if (product !== undefined) {
      return (
        <>
          <Grid
            direction={mobile ? "column" : "row"}
            justify="center"
            alignItems="center"
            spacing={0}
            container
            style={{ position: "relative", minHeight: "90px" }}
          >
            <Grid
              item
              xs={12}
              sm={2}
              style={{
                display: "flex",
              }}
            >
              <IconButton
                className={classes.delete}
                aria-label="delete"
                size="small"
                onClick={() => removeItem(product._id)}
              >
                <HighlightOffIcon color="secondary" />
              </IconButton>
              <ProductThumbnail product={product} imageFile={first} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              style={{ textAlign: mobile ? "center" : "inherit" }}
            >
              <Title quantity={quantity} item={product} />
            </Grid>

            <Grid item xs={12} sm={1}>
              <TextField
                value={quantity}
                type="number"
                helperText={error && "Valeur invalide"}
                error={error}
                // defaultValue="0"
                onChange={(event) => setItemCount(event)}
                //margin="dense"
                className={classes.spinQt}
                placeholder="qte"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={1}>
              <DiscountPercentLabel discount={product.discount} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <SalePrice
                quantity={quantity}
                product={product}
                priceField={isCommande ? "order_price" : "sale_price"}
              />
            </Grid>
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
  root: {
    width: "100%",
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
  },
  flex: {
    display: "flex",
  },
  margin: {
    marginTop: theme.spacing(2.5),
  },

  discount: {
    // font-size: 18px;
    //fontWeight: "500",
    padding: "2px 5px 2px 5px",
    backgroundColor: "#d51317",
    color: "#fff",

    margin: "auto",

    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(1),
    },
    width: "fit-content",
  },
  essential: {
    // fontSize: "1.125rem",
    // fontWeight: "300"
  },
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
      },
    },
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
      height: "32px",
    },
  },
  strike: {
    margin: "auto",
    marginRight: "5px",
    fontWeight: "300",
  },
  price: {
    textAlign: "center",
  },
  delete: {
    //position: "absolute",
    // left: "0",
    // top: "25px",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      top: "10px",
      left: "auto",
      right: "24px",
    },
  },
}));

const CartHeader = ({ title }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid spacing={2} justify="center" alignItems="center" container>
        <Grid item sm={mobile ? 12 : 7}>
          {title}
        </Grid>
        <Hidden smDown>
          <Grid item sm={1} style={{ textAlign: "center" }}>
            <TableHeaderTypography variant="subtitle2">
              Qt
            </TableHeaderTypography>
          </Grid>
          <Grid item sm={1} style={{ textAlign: "center" }}>
            <TableHeaderTypography variant="subtitle2">
              Réduction
            </TableHeaderTypography>
          </Grid>
          <Grid item sm={3} style={{ textAlign: "center" }}>
            <TableHeaderTypography variant="subtitle2">
              Prix
            </TableHeaderTypography>
          </Grid>
        </Hidden>
      </Grid>
      <Divider light={true} />
    </>
  );
};

export { CartItemRow, CartHeader };
