import React from "react";
import { SimpleTextField } from "../../../../components/TextFieldMUI";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import SchoolIcon from "@material-ui/icons/School";
import ClassIcon from "@material-ui/icons/Class";
import { Radios } from "mui-rff";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const Form = ({ ...props }) => {
  return (
    <>
      <Grid item xs={12}>
        <SimpleTextField
          label="Libeller de la classe"
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
          placeholder="Code de la classe. Example: Cm1 Cm2"
          label="Code"
          required={true}
          name="code"
        />
      </Grid>
    </>
  );
};

export default React.memo(Form);

const data = [
  { label: "Item 1", value: "item1" },
  { label: "Item 2", value: "item2" },
];
