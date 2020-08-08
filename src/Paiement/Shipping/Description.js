import React from "react";
import Grid from "@material-ui/core/Grid";
import { LabelText, ValueText } from "../../components/LabelValueTypography";

const ShippingText = ({ shipping }) => {
  const { method_title = "", total = 0, address = {} } = shipping;

  const {
    firstName,
    lastName,
    description,
    city = {},
    postal,
    phone,
  } = address;

  const postalText = postal ? "BP" + postal : "";
  const names = `${firstName || ""} ${lastName || ""}`;
  const addressText = `${names || ""} ${firstName && lastName ? "," : ""} ${
    city.name || ""
  } ${description || ""} ${postalText || ""}`;

  return (
    <>
      <Grid xs={12} item container>
        <Grid item xs={12}>
          <LabelText> Livraison {method_title} à </LabelText>
          <ValueText> {total} Fcfa </ValueText>
        </Grid>
        <Grid item xs={12}>
          <LabelText> Addresse : </LabelText>
          <ValueText> {addressText} </ValueText>
        </Grid>
        <Grid item xs={12}>
          <LabelText> contact mobile : </LabelText>
          <ValueText> {phone} </ValueText>
        </Grid>
      </Grid>
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      shipping: prev !== null ? prev.shipping : {},
    }) === JSON.stringify({ shipping: next.shipping })
  );
};

export default React.memo(ShippingText, isEqual);
// export default CartList;
