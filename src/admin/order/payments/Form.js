import React from "react";
import Grid from "@material-ui/core/Grid";
import { FormSpy } from "react-final-form";
import MailIcon from "@material-ui/icons/Mail";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";

import InputAdornment from "@material-ui/core/InputAdornment";
import Checkboxes from "../../../components/CheckBoxLineMui";
import SuspensePaper from "../../../components/SuspensePaper";
import { SimpleTextField } from "../../../components/TextFieldMUI";

const PaymentForm = ({ classes = {}, form, ...props }) => {
  const showPayerForm = () => (
    <>
      <SimpleTextField
        placeholder="Nom du payeur"
        className={classes.textField}
        name="payerData.lastName"
        label="Nom"
      />

      <SimpleTextField
        placeholder="Prénom"
        className={classes.textField}
        name="payerData.firstName"
        label="¨Prénom"
      />

      <SimpleTextField
        placeholder="Téléphone"
        label={"Téléphone"}
        required={true}
        fullWidth
        name="payerData.phone"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneAndroidIcon />
            </InputAdornment>
          ),
        }}
      />

      <SimpleTextField
        type="email"
        placeholder="Email"
        label={"Email"}
        name="payerData.email"
        required={true}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );

  return (
    <>
      <Grid container item xs={12}>
        <Checkboxes
          name="selfPayer"
          label="Payer par l'auteur de la commande"
        />

        {
          <FormSpy subscription={{ values: true }}>
            {({ values }) => !values.selfPayer && showPayerForm()}
          </FormSpy>
        }

        <SuspensePaper>
          <SimpleTextField
            placeholder="Montant payer"
            className={classes.textField}
            name="amount"
            label="Montant payer"
          />
        </SuspensePaper>
      </Grid>
    </>
  );
};

export default React.memo(PaymentForm);
