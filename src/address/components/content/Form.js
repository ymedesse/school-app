import React from "react";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FormSpy } from "react-final-form";

import { SimpleTextField } from "../../../components/TextFieldMUI";
import ListSkeleton from "../../../components/ListSkeleton";

const SelectorFieldMui = React.lazy(() =>
  import("../../../admin/city/components/Selector/SelectorFieldMui")
);

const Form = ({ field, classes = {}, isNew = false, ...props }) => {
  const getName = (name) => {
    return field ? field + "." + name : name;
  };
  return (
    <Grid container item spacing={1}>
      <Grid item xs={12} sm={6}>
        <SimpleTextField
          name={getName("firstName")}
          placeholder="Nom du réceptionnaire"
          required={true}
          className={classes.textField}
          label="Nom complet du récèptionnaire"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <SimpleTextField
          name={getName("lastName")}
          placeholder="Prénom du réceptionnaire"
          required={true}
          className={classes.textField}
          label="Prénom du récèptionnaire"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <SimpleTextField
          name={getName("phone")}
          placeholder="No téléphone"
          required={true}
          className={classes.textField}
          label={"No téléphone"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+229</InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item sm={6} xs={12}>
        <React.Suspense fallback={<ListSkeleton count={1} />}>
          <FormSpy subscription={{ values: true }}>
            {({ values, submitting, pristine }) => (
              <SelectorFieldMui
                isNew={isNew}
                required={true}
                name={getName("city")}
                variant="outlined"
                selectedValues={values.city}
              />
            )}
          </FormSpy>
        </React.Suspense>
      </Grid>

      <Grid item xs={12}>
        <SimpleTextField
          name={getName("description")}
          placeholder="Adresse"
          className={classes.textField}
          label="Adresse"
        />
      </Grid>

      <Grid item xs={12} zeroMinWidth>
        <SimpleTextField
          name={getName("postal")}
          placeholder="Boite postale"
          className={classes.textField}
          label="Boite postale"
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(Form);
