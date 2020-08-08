import React from "react";
import { SimpleTextField } from "../../../../components/TextFieldMUI";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailIcon from "@material-ui/icons/Mail";
import SchoolIcon from "@material-ui/icons/School";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import BusinessIcon from "@material-ui/icons/Business";
import ImageIcon from "@material-ui/icons/Image";

const Form = ({ ...props }) => {
  return (
    <>
      <Grid item xs={12}>
        <SimpleTextField
          label="Nom de l'école"
          name="name"
          required={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SchoolIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <SimpleTextField
          placeholder="Téléphone"
          label="Téléphone"
          required={true}
          name="phone"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneAndroidIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} zeroMinWidth sm={6}>
        <SimpleTextField
          type="email"
          label={"Email"}
          name="mail"
          required={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <SimpleTextField
          label="Logo"
          placeholder="Logo de l'école"
          name="image"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ImageIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <SimpleTextField
          label="Adresse de lécole"
          placeholder="Adresse de l'école: ville , quartier  "
          name="address"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </>
  );
};

export default React.memo(Form);
