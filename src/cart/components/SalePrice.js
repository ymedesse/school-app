import React from "react";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  ValueText,
  MiniLabelText,
} from "../../components/LabelValueTypography";
/**
 *
 * @param {int} discount
 */
const SalePrice = ({ quantity, product, priceField = "sale_price" }) => {
  const localClasses = useStyles();
  const qt = parseInt(quantity) || 0;
  const price = parseInt(product.price) || 0;
  const sale_price = parseInt(product[`${priceField}`]) || 0;

  return (
    <div className={localClasses.price}>
      {product.discount > 0 && (
        <MiniLabelText className={localClasses.strike}>
          <strike>{qt * price}</strike>
        </MiniLabelText>
      )}
      {/* sale price */}
      <ValueText color="primary">{qt * sale_price} fcfa</ValueText>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  strike: {
    margin: "auto",
    marginRight: "5px",
    // fontWeight: "300",
  },
  price: {
    textAlign: "center",
  },
}));

export default SalePrice;
