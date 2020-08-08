import React, { useState } from "react";
import FormValidator from "../../components/FormValidator";
import { makeStyles } from "@material-ui/core/styles";

import { TextField } from "mui-rff";
import { Grid, Button, InputAdornment } from "@material-ui/core";

import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MailIcon from "@material-ui/icons/Mail";
import { Notifications } from "../../components/ShowApiNotification";
import {
  SimpleTextField,
  NumberTextField,
} from "../../components/TextFieldMUI";

/**
 *
 * @param {Object} address - Addresse en cours, vide si non sipécifié
 * @param {Function} submitAddress - Action à exécuter si le formulaire est validé, optionnel si on veut exporter la gestion de la validation du formulaire
 * @param {Function} sendLocalSubmit - function qui prendra en paramètre une fonction représentant le handlesubmit local du formulaire. sert à externalisé la validation du formulaire
 * @param {Component} customActionButon - Pour personnalisé les button à s'afficher comme action
 * @param {Boolean} showActionButton - Cache le buttons actions si false, pardéfault à  True
 *
 */
const AdressForm = ({
  address = {},
  submitAddress,
  sendLocalSubmit,
  showActionButton = true,
  customActionButon,
}) => {
  const init = {
    error: false,
    success: false,
    loading: false,
  };

  const [submitResult, setSubmitResult] = useState(init);

  const classes = useStyles();

  const onSubmit = async (values) => {
    submitAddress &&
      submitAddress(values, ({ error, success }) => {
        error && setSubmitResult({ success: false, error });
        success &&
          setSubmitResult({
            success: " Votre adresse a mise à jour avec succès ",
            error: false,
          });
      });
  };

  const customActionGrid = { sm: showActionButton ? 6 : 12 };
  const contents = ({
    form,
    submitting,
    pristine,
    handleSubmit,
    values,
    valid,
    submitSucceeded,
    dirty, // permet de savoir si l'objet a été modifier
    ...restProps
  }) => {
    sendLocalSubmit &&
      sendLocalSubmit({ handleSubmit, values, valid, submitSucceeded, dirty });
    return (
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="flex-start"
      ></Grid>
    );
  };

  const { error, success } = submitResult;
  return (
    <div>
      <Notifications
        notificationType="success"
        message={success}
        nextClose={() => setSubmitResult(init)}
      />
      <Notifications
        notificationType="error"
        message={error}
        nextClose={() => setSubmitResult(init)}
      />

      <FormValidator
        onSubmit={onSubmit}
        initialValues={getInitialValue(address)}
        validate={validate}
        contents={contents}
      />
    </div>
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

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Important";
  }
  if (!values.description) {
    errors.description = "Important";
  }
  if (!values.phone) {
    errors.phone = "Important";
  }
  return errors;
};

const getInitialValue = (address) => ({
  firstName: address.firstName || "",
  lastName: address.lastName || "",
  phone: address.phone || "",
  postal: address.postal || "",
  city: address.city,
  description: address.description || "",
});

export default AdressForm;
