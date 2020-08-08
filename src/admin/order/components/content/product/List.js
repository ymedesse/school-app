import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import LazyLoad from "react-lazyload";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ProductRow from "./Row";
import {
  LabelText,
  ValueText,
} from "../../../../../components/LabelValueTypography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
}));

/**
 *
 * @param {object} param0 {value:{products, total, shippingTotal}, idFiedl}
 */
const ProductsOdered = ({ shippingTotal, total, products, idField = "id" }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getProductTotal = () => {
    let productTotal = 0;
    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      productTotal += parseInt(element.total) || 0;
    }
    return parseInt(productTotal);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const show = (item, index) => {
    return (
      <LazyLoad width="100%" key={item[idField]} once={true} offset={100}>
        <ProductRow
          key={item[idField]}
          handleToggle={handleToggle(item[idField])}
          checked={checked}
          value={item}
          idField={idField}
          isMobile={isMobile}
        />
      </LazyLoad>
    );
  };

  const showAmount = (label, amount) => {
    return (
      <Box width="100%" display="flex">
        <Box flexGrow={1}>
          <LabelText> {label} </LabelText>
        </Box>
        <Box>
          <ValueText> {amount}</ValueText>
        </Box>
      </Box>
    );
  };

  const checkedCount = checked.length;
  const totalOrder = (parseInt(shippingTotal) || 0) + getProductTotal();
  return (
    <>
      <List className={classes.root}>
        {products.map((item, index) => show(item, index))}
      </List>
      <Grid container style={{ padding: "0px 8px" }}>
        <Grid item xs={12} sm={6}>
          {!isMobile ? (
            <Typography variant="body2" color="inherit">
              {`${checkedCount} produit${pluriel(
                checkedCount
              )} séléctionné${pluriel(checkedCount)}`}
            </Typography>
          ) : (
            <Divider />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {showAmount("Sous Total", <strong>{getProductTotal()}</strong>)}
          {showAmount("Expédition", <strong>{shippingTotal}</strong>)}
          {showAmount("Total commande", <strong>{totalOrder}</strong>)}
          <Divider />
          {
            <strong>
              {showAmount("Payer par le client", <strong>{total}</strong>)}
            </strong>
          }
        </Grid>
      </Grid>
    </>
  );
};

const pluriel = (count) => {
  return count > 1 ? "s" : "";
};

export default React.memo(ProductsOdered);
