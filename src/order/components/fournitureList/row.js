import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import purple from "@material-ui/core/colors/purple";
import Title from "../../../cart/components/ProductFullTitle";
import { LabelText, ValueText } from "../../../components/LabelValueTypography";

const OrderRow = ({ isCommande, item: product }) => {
  const classes = useStyles();
  const { quantity = 0, sale_price = 0, order_price = 0 } = product;
  const price = isCommande ? order_price : sale_price;
  const total = price * quantity;

  const renderRow = () => {
    return (
      <>
        <CssBaseline />
        <Box
          alignItems="center"
          display="flex"
          p={0}
          width="100%"
          minHeight={64}
        >
          <Box flexGrow={1}>
            <Title quantity={quantity} item={product} />
          </Box>
          <Box textAlign="right" alignSelf="center">
            <LabelText
              style={{ display: "block" }}
              variant="body2"
              color="inherit"
            >
              {quantity} x {price}
            </LabelText>
            <ValueText variant="subtitle2" className={classes.purple}>
              {total} Fcfa
            </ValueText>
          </Box>
        </Box>
      </>
    );
  };

  return product ? renderRow() : "";
  // return <> neo </>;
};

const useStyles = makeStyles((theme) => ({
  purple: {
    color: purple[500],
  },
}));

export default OrderRow;
