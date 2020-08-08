import React from "react";
import { FormSpy } from "react-final-form";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import { Grid, Button, InputAdornment } from "@material-ui/core";
import { LargeTypography } from "../components/assets";
import { SimpleTextField, PasswordField } from "../components/TextFieldMUI";

const CompteForm = ({ form, initState, isOnlyExternal }) => {
  const classes = useStyles();

  const changementPassWordTitle = isOnlyExternal
    ? "Définir un Mot de passe"
    : "Changement de mot de passe";

  const titleNewPassword = isOnlyExternal
    ? "Mot de passe"
    : "Nouveau mot de passe";

  const titleConfirmPassword = isOnlyExternal
    ? "Mot de passe"
    : "Nouveau mot de passe";

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Grid item xs={12} sm={6}>
        <SimpleTextField
          label={initState.firstName || "Prenom"}
          name="firstName"
          required={true}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SimpleTextField
          placeholder="Nom"
          label={initState.lastName || "Nom"}
          name="lastName"
          required={true}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <SimpleTextField
          placeholder="Nom affiché"
          label={initState.nomAfficher || "Nom affiché"}
          name="nomAfficher"
          required={true}
          fullWidth
          helperText="Indique comment votre nom apparaîtra dans la section relative au compte et dans les avis"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} zeroMinWidth sm={6}>
        <SimpleTextField
          type="email"
          placeholder="Email"
          label={initState.email || "Email"}
          name="email"
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
      </Grid>

      <Grid item xs={12} sm={6}>
        <SimpleTextField
          placeholder="Téléphone"
          label={initState.phone || "Téléphone"}
          required={true}
          fullWidth
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

      <Grid className={classes.title} item xs={12}>
        <LargeTypography>{changementPassWordTitle}</LargeTypography>
        (laisser le blanc pour ne rien changer)
      </Grid>
      {!isOnlyExternal && (
        <Grid item xs={12}>
          <PasswordField name="password" placeholder="Mot de passe" />
        </Grid>
      )}
      <Grid item xs={12} sm={6}>
        <PasswordField name="newPassword" placeholder={titleNewPassword} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PasswordField name="confirmation" placeholder={titleConfirmPassword} />
      </Grid>

      <Grid
        container
        item
        direction="row"
        justify="flex-end"
        alignItems="center"
        xs={12}
      >
        <FormSpy subscription={{ values: true }}>
          {({ values, submitting, pristine }) => (
            <>
              <Button
                type="button"
                variant="contained"
                onClick={form.reset}
                disabled={submitting || pristine}
                className={classes.button}
              >
                Initialise
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
                className={classes.button}
              >
                Submit
              </Button>
            </>
          )}
        </FormSpy>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  title: {
    margin: theme.spacing(0, 3, 0, 1),
  },
}));

export default CompteForm;
