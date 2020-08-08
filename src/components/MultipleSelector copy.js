/* eslint-disable no-use-before-define */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { SimpleTextField as TextField } from "./TextFields";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon color="primary" fontSize="small" />;

export default ({
  classes,
  value,
  handleChange,
  labelWidth,
  labelText,
  placeholder,
  values
}) => {
  const nativeClasses = useStyles();

  const optionRender = (option, { selected }) => (
    <>
      <Grid direction="column" spacing={0} container>
        <FormControlLabel
          className={nativeClasses.label}
          control={
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              checked={selected}
            />
          }
          label={<Typography>{option.name}</Typography>}
        />
        <Chip
          component={Typography}
          className={nativeClasses.path}
          size="small"
          label={option.path}
        />
      </Grid>
    </>
  );
  const handlenativeChange = (event, value) => {
    handleChange({ target: { value } });
  };

  return (
    <>
      <Autocomplete
        size="small"
        multiple
        value={value}
        disableCloseOnSelect
        options={values}
        noOptionsText="aucun resultat"
        getOptionLabel={option => option.name}
        style={{ width: "100%" }}
        renderOption={optionRender}
        onChange={(event, values) => handlenativeChange(event, values)}
        renderInput={params => <TextField {...params} label={labelText} placeholder={placeholder} />}
      />
    </>
  );
};

const useStyles = makeStyles(theme => ({
  label: {
    //  marginTop:"8px",
    //  marginLeft:"4px",
    height: "32px"
  },
  path: {
    maxWidth: "fit-content",
    marginLeft: "24px",
    fontSize: "12px",
    background: `${theme.palette.background.default}`,
    color: `${theme.palette.text.default}`,
    height: "20px"
  }
}));
