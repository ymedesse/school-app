import React from "react";
import { SimpleTextField } from "../../../../components/TextFieldMUI";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClassIcon from "@material-ui/icons/Class";

const Form = ({ ...props }) => {
  return (
    <>
      <Grid item xs={12}>
        <SimpleTextField
          label="Libeller de la ville"
          name="name"
          required={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ClassIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <SimpleTextField
          placeholder="Code de la ville. Example: Cot, Pn"
          label="Code"
          name="code"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SimpleTextField
          placeholder="Frais de livraison standart"
          label="Frais de livraison standart"
          required={true}
          name="cost"
        />
      </Grid>
    </>
  );
};

export default React.memo(Form);
