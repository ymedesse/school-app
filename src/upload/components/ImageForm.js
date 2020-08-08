import React, { useState, useEffect } from "react";
import FormValidator from "../../components/FormValidator";
import { SubTitleTypography, ButtonWithIcon } from "../../components/assets";
import Grid from "@material-ui/core/Grid";
import { Notifications } from "../../components/ShowApiNotification";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

import Box from "@material-ui/core/Box";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { TextField } from "mui-rff";

const ImageForm = ({ filesToUpdate, submit, handleDecline }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const init = {
    error: false,
    success: false,
    loading: false
  };
  const [submitResult, setSubmitResult] = useState(init);

  const setInitialValues = files => {
    if (
      !files ||
      files.length > 1 ||
      files.length === 0 ||
      (files.length === 1 && !files[0].name)
    ) {
      return {
        name: "",
        description: ""
      };
    } else {
      return {
        name: files[0].name,
        description: files[0].description,
        size: files[0].size,
        type: files[0].type
      };
    }
  };

  const [initValues, setInitValues] = useState(setInitialValues(filesToUpdate));
  useEffect(() => {
    setInitValues(setInitialValues(filesToUpdate));
  }, [filesToUpdate]);

  const onSubmit = async values => {
    const m = [...filesToUpdate];
    for (let i = 0; i < m.length; i++) {
      m[i] = { ...m[i], ...values };
    }

    submit(m, ({ error, success }) => {
      error && setSubmitResult({ success: false, error });
      !error &&
        setSubmitResult({
          success: `${values.length} Modification avec succès `,
          error: false
        });
    });
  };

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
    return (
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <TextField
          label="Nom du fichier"
          name="name"
          margin="dense"
          required={true}
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Description"
          name="description"
          margin="dense"
          required={true}
          fullWidth
          variant="outlined"
        />
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          {initValues.size && (
            <SubTitleTypography>
              <u>Taille </u> : {initValues.size}
            </SubTitleTypography>
          )}

          {initValues.type && (
            <SubTitleTypography>
              <u>Type </u> : {initValues.type}
            </SubTitleTypography>
          )}
        </Grid>

        <Link onClick={form.reset} variant="subtitle1" component="button">
          <strong>Initialiser</strong>
        </Link>

        <Box hidden={mobile} display="flex" p={1} style={{ width: "100%" }}>
          <Box p={0} flexGrow={1}></Box>
          <Box>
            <ButtonWithIcon
              disabled={submitting || pristine || !filesToUpdate}
              onClick={handleDecline}
              className={classes.button}
              variant="text"
            >
              Annuler
            </ButtonWithIcon>
          </Box>
          <Box>
            <ButtonWithIcon
              variant="contained"
              color="primary"
              type="submit"
              disabled={submitting || !filesToUpdate}
              className={classes.button}
            >
              Enregistrer
            </ButtonWithIcon>
          </Box>
        </Box>
      </Grid>
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
        initialValues={initValues}
        validate={validate}
        contents={contents}
      />
    </div>
  );
};

const isEquals = (previews, next) => {
  return (
    JSON.stringify(previews.filesToUpdate) ===
    JSON.stringify(next.filesToUpdate)
  );
};

export default React.memo(ImageForm, isEquals);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    margin: "0px"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Important";
  }
  return errors;
};
