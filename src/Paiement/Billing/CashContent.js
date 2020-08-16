import React from "react";
import Grid from "@material-ui/core/Grid";
import SubmitButton from "./SubmitButton";
// import { makeStyles } from "@material-ui/core/styles";
import { ValueText } from "../../components/LabelValueTypography";

import { PriceSimpleTextField } from "../../components/TextFieldMUI";

const CashBody = ({ maxAmount, showButton = false }) => {
  return (
    <div>
      <Grid
        style={{ textAlign: "center", alignSelf: "center" }}
        spacing={2}
        container
      >
        <Grid item xs={12}>
          <ValueText>Saisissez le montant à payer</ValueText>
        </Grid>

        <Grid item xs={12}>
          <PriceSimpleTextField
            name="payment.amount"
            label="Montant à payer"
            placeholder="Le montant que vous voulez payer"
            helperText="Le montant que vous voulez payer"
            required={true}
            max={maxAmount}
          />
        </Grid>

        {showButton && <SubmitButton fullWidth submitLabel="Payer" endStep />}
      </Grid>
    </div>
  );
};
export default CashBody;

// const useStyles = makeStyles((theme) => ({
//   image: {
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "center",
//     width: "auto",
//     backgroundSize: "contain",
//     height: "98px",
//     [theme.breakpoints.down("sm")]: {
//       height: "85px",
//     },
//     padding: "8px",
//   },
// }));
