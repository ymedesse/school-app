import React from "react";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import SubmitButton from "./SubmitButton";
import { makeStyles } from "@material-ui/core/styles";
import Momo from "../../assets/momo.png";
import { ValueText } from "../../components/LabelValueTypography";

import {
  SimpleTextField,
  PriceSimpleTextField,
} from "../../components/TextFieldMUI";

const MomoBody = ({ maxAmount, showButton = false }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid
        style={{ textAlign: "center", alignSelf: "center" }}
        spacing={2}
        container
      >
        <Grid item xs={12}>
          <ValueText>
            Payez par votre numéro de téléphone avec un compte MOBILE MONEY ou
            MOOV MONEY
          </ValueText>
        </Grid>

        <Grid item xs={12}>
          <img className={classes.image} src={Momo} alt="Paiement par MoMo" />
        </Grid>

        <Grid item sm={6} xs={12}>
          <SimpleTextField
            name="payment.phone"
            helperText="Votre numéro de téléphone mobile"
            placeholder="Saisissez votre numéro de téléphone mobile"
            label="Numéro mobile"
            required={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroidIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
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
export default MomoBody;

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "auto",
    backgroundSize: "contain",
    height: "98px",
    [theme.breakpoints.down("sm")]: {
      height: "85px",
    },
    padding: "8px",
  },
}));
