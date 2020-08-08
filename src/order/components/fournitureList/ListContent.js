import React from "react";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

import {
  LabelText,
  ValueText,
} from "/../../../components/LabelValueTypography";

const ProductsOdered = ({ shippingTotal, total, products, idField = "id" }) => {
  const getProductTotal = () => {
    let productTotal = 0;
    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      productTotal += parseInt(element.total) || 0;
    }
    return parseInt(productTotal);
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

  const totalOrder = (parseInt(shippingTotal) || 0) + getProductTotal();
  return (
    <>
      {showAmount("Sous Total", <strong>{getProductTotal()}</strong>)}
      {showAmount("Expédition", <strong>{shippingTotal}</strong>)}
      {showAmount("Total commande", <strong>{totalOrder}</strong>)}
      <Divider />
      {
        <strong>
          {showAmount("Payer par le client", <strong>{total}</strong>)}
        </strong>
      }
    </>
  );
};

export default React.memo(ProductsOdered);
